import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CONFIG from "../config";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import IconsPicker from "../components/IconsPicker";
import Goback from "../components/Goback";
function Forum() {
  const admin = useSelector((state) => state.login);
  const alert = useAlert();

  const [show, setShow] = useState(false);
  const [addTopicShow, showAddTopicModal] = useState(false);

  const [editModalShow, setEditModalShow] = useState(false);

  const [selectedForum, setSelectedForum] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const CancelToken = axios.CancelToken;
  const [source, setSource] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: `${CONFIG.API_URL}/forums?_sort=created_at:DESC`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {};
  }, []);

  const search = (text) => {
    if (source) {
      source.cancel("Operation canceled by the user.");
    }
    const C_source = CancelToken.source();
    var config = {
      method: "get",
      url: `${CONFIG.API_URL}/forums?title_contains=${text}`,
      headers: {},
      cancelToken: C_source.token,
    };

    axios(config)
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const DeleteForum = (id) => {
    var config = {
      method: "delete",
      url: `${CONFIG.API_URL}/forums/${selectedForum.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        let m = [];
        let k = list.map((ele, index) => {
          if (ele.id !== selectedForum.id) {
            m.push(ele);
          }
        });
        setList(m);

        alert.success("Forum erfolgreich gelöscht.");
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <main className="main-section">
        <div className="container-fluid">
          {/* Title, Breadcrumbs and Add Button Start */}
          <div className="row mb-3 mb-md-4">
            <div className="col-md-8">
              <Goback />
              <h1 className="h3 mb-2 mb-md-1">Forum</h1>
              <Breadcrumb className="cb-breadcrumb">
                <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Forum</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="col-md-4 d-md-flex align-items-center justify-content-end">
              <button
                onClick={() => showAddTopicModal(true)}
                className="btn btn-primary btn-icon-text btn-raised btn-hover-effect"
              >
                <span className="material-icons me-2">add</span>
                <span className="link-text">Neues Thema hinzufügen</span>
              </button>
            </div>
          </div>
          {/* Title, Breadcrumbs and Add Button End */}

          {/* Form Search Start */}
          <div className="form-group cb-form-group mb-3 mb-md-4">
            <div className="form-input-prepend">
              <div className="input-prepend-icon">
                <span className="material-icons">search</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search by keyword..."
                onChange={(e) => {
                  e.preventDefault();
                  search(e.target.value);
                }}
              />
            </div>
          </div>
          {/* Form Search End */}
          <p className="text-muted fs-14 mb-2">
            {list.length} Forum-Themen gefunden
          </p>

          {/* Forum List Table Start */}
          <div className="card cb-card overflow-hidden">
            <Table className="cb-table mb-0">
              <thead>
                <tr>
                  <th>
                    <div className="d-flex align-items-center">
                      Title{" "}
                      <span className="material-icons ms-1">unfold_more</span>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center">
                      Status{" "}
                      <span className="material-icons ms-1">unfold_more</span>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center">Aktionen </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((ele, index) => {
                  return (
                    <tr>
                      <td data-title="Title" className="table-col-title">
                        <div className="d-flex align-items-start cb-list-item">
                          <div className="cb-icon-avatar cb-icon-secondary me-2 me-md-3">
                            <span className="material-icons">{ele.icon}</span>
                          </div>
                          <div>
                            <Link
                              to={`/admin/forum-topic/${ele.id}`}
                              state={{ data: ele }}
                            >
                              <h6 className="mb-1">{ele.title}</h6>
                            </Link>
                            <p className="card-subtitle">{ele.description}</p>
                          </div>
                        </div>
                      </td>
                      <td data-title="Status" className="table-col-xs-50">
                        <Badge
                          bg={ele.status === "active" ? "primary" : "gray"}
                          className="cb-badge badge-open-round"
                        >
                          {ele.status}
                        </Badge>
                      </td>
                      <td data-title="Actions" className="table-col-actions">
                        <button
                          className="btn-fab btn-secondary btn-hover-effect me-3"
                          title="Edit"
                          onClick={(e) => {
                            setEditModalShow(true);
                            setSelectedForum(ele);
                          }}
                        >
                          <span className="material-icons">edit</span>
                        </button>
                        <button
                          className="btn-fab btn-danger btn-hover-effect"
                          onClick={() => {
                            handleShow();
                            setSelectedForum(ele);
                          }}
                          title="Delete"
                        >
                          <span className="material-icons">delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          {/* Forum List Table End */}
        </div>

        {/* Add Forum Topic Popup Start */}
        <AddNewForumModel
          addTopicShow={addTopicShow}
          handleClose={handleClose}
          showAddTopicModal={showAddTopicModal}
          admin={admin}
          list={list}
          setList={setList}
        />
        {/* Add Forum Topic Popup End */}

        {/* Delete Forum Topic Popup Start */}
        <Modal
          show={show}
          onHide={handleClose}
          className="cb-modal thank-you-modal delete-modal"
          centered
        >
          <Modal.Header className="justify-content-center" closeButton>
            <div className="cb-icon-avatar cb-icon-danger cb-icon-72">
              <span className="material-icons">delete</span>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <h4>Forumsthema löschen</h4>
            <p className="mb-0">
              Sind Sie sicher, dass Sie dieses Thema löschen möchten? Dieser
              Vorgang lässt sich nicht rückgängig gemacht werden.
            </p>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <button
              className="btn btn-gray btn-raised btn-hover-effect me-3"
              onClick={handleClose}
            >
              Abbrechen
            </button>
            <button
              className="btn btn-danger btn-raised btn-hover-effect"
              onClick={() => {
                DeleteForum();
              }}
            >
              Thema löschen
            </button>
          </Modal.Footer>
        </Modal>
        {/* Delete Forum Topic Popup End */}

        {/* edit modal */}
        <EditForumModal
          admin={admin}
          list={list}
          setList={setList}
          editModalShow={editModalShow}
          setEditModalShow={setEditModalShow}
          data={selectedForum}
        />
        {/* edit modal end */}
      </main>
    </div>
  );
}

export default Forum;

const EditForumModal = ({
  editModalShow,
  setEditModalShow,
  admin,
  list,
  setList,
  data,
}) => {
  const alert = useAlert();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icons, setIcons] = useState("");

  useEffect(() => {
    setTitle(data.title);
    setDescription(data.description);
    setIcons(data.icon);
    console.log(data);
    return () => {};
  }, [data]);

  const UpdateForum = (status) => {
    var axios = require("axios");
    var datam = JSON.stringify({
      title: title,
      icon: icons,
      description: description,
      status: status,
    });

    var config = {
      method: "put",
      url: `${CONFIG.API_URL}/forums/${data.id}`,
      headers: {
        Authorization: `Bearer ${admin.jwt}`,
        "Content-Type": "application/json",
      },
      data: datam,
    };

    axios(config)
      .then(function (response) {
        let k = list.map((ele, index) => {
          if (ele.id === data.id) {
            ele = response.data;
          }
          return ele;
        });
        setList(k);
        setTitle("");
        setDescription("");
        setIcons("");
        alert.success("Forum Updated successfully.");
        setEditModalShow(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      show={editModalShow}
      onHide={() => setEditModalShow(false)}
      className="cb-modal"
      centered
    >
      <Modal.Header
        className="justify-content-center modal-header-border modal-title-separator"
        closeButton
      >
        <h4 className="mb-0">Neues Forumsthema hinzufügen</h4>
      </Modal.Header>
      <Modal.Body className="">
        <div className="form-group cb-form-group mb-3 mb-md-4">
          <label className="form-label">Titel</label>
          <input
            type="text"
            className="form-control"
            placeholder="Titel des Themas eingeben"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-group cb-form-group mb-3 mb-md-4">
          <label className="form-label">Symbol auswählen</label>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Enter topic title"
            value={icons}
            onChange={(e) => {
              setIcons(e.target.value);
            }}
          /> */}
          <div className="cb-icon-avatar cb-icon-secondary me-2 me-md-3">
            <span className="material-icons">{icons}</span>
          </div>
        </div>
        <IconsPicker
          onSelect={(e) => {
            setIcons(e.ligature);
            console.log(e);
          }}
        />

        <div className="form-group cb-form-group">
          <label className="form-label">Beschreibung</label>
          <textarea
            className="form-control form-textarea"
            placeholder="Themenbeschreibung verfassen..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer-border justify-content-between d-block d-md-flex">
        <div className="mb-3 mb-md-0 order-md-2 d-md-flex justify-content-end">
          <button
            className="btn btn-secondary btn-hover-effect me-2 me-md-3 btn-lg"
            onClick={() => {
              UpdateForum(data.status);
            }}
          >
            Update
          </button>

          {data.status === "draft" ? (
            <button
              onClick={() => {
                UpdateForum("active");
              }}
              className="btn btn-primary btn-raised btn-hover-effect btn-lg"
            >
              Veröffentlichen
            </button>
          ) : null}
        </div>
        <div className="order-md-1">
          <button
            onClick={() => {
              setEditModalShow(false);
            }}
            className="btn btn-gray btn-hover-effect btn-lg"
          >
            Cancel
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const AddNewForumModel = ({
  addTopicShow,
  handleClose,
  showAddTopicModal,
  admin,
  list,
  setList,
}) => {
  const alert = useAlert();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icons, setIcons] = useState("");
  const AddNewForum = (status) => {
    var axios = require("axios");
    var data = JSON.stringify({
      title: title,
      icon: icons,
      description: description,
      status: status,
    });

    var config = {
      method: "post",
      url: `${CONFIG.API_URL}/forums`,
      headers: {
        Authorization: `Bearer ${admin.jwt}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setList([response.data, ...list]);
        setTitle("");
        setDescription("");
        setIcons("");
        alert.success("Forum added successfully.");
        showAddTopicModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      show={addTopicShow}
      onHide={() => showAddTopicModal(false)}
      className="cb-modal"
      centered
    >
      <Modal.Header
        className="justify-content-center modal-header-border modal-title-separator"
        closeButton
      >
        <h4 className="mb-0">Neues Forumsthema hinzufügen</h4>
      </Modal.Header>
      <Modal.Body className="">
        <div className="form-group cb-form-group mb-3 mb-md-4">
          <label className="form-label">Titel</label>
          <input
            type="text"
            className="form-control"
            placeholder="Titel eingeben"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-group cb-form-group mb-3 mb-md-4">
          <label className="form-label">Symbol auswählen</label>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Titel eingeben"
            value={icons}
            onChange={(e) => {
              setIcons(e.target.value);
            }}
          /> */}
          <div className="cb-icon-avatar cb-icon-secondary me-2 me-md-3">
            <span className="material-icons">{icons}</span>
          </div>
        </div>
        <IconsPicker
          onSelect={(e) => {
            setIcons(e.ligature);
            console.log(e);
          }}
        />
        <div className="form-group cb-form-group">
          <label className="form-label">Beschreibung</label>
          <textarea
            className="form-control form-textarea"
            placeholder="Themenbeschreibung verfassen..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer-border justify-content-between d-block d-md-flex">
        <div className="mb-3 mb-md-0 order-md-2 d-md-flex justify-content-end">
          <button
            className="btn btn-secondary btn-hover-effect me-2 me-md-3 btn-lg"
            onClick={() => {
              AddNewForum("draft");
            }}
          >
            Entwurf speichern
          </button>
          <button
            onClick={() => {
              AddNewForum("active");
            }}
            className="btn btn-primary btn-raised btn-hover-effect btn-lg"
          >
            Veröffentlichen
          </button>
        </div>
        <div className="order-md-1">
          <button
            onClick={handleClose}
            className="btn btn-gray btn-hover-effect btn-lg"
          >
            Abbrechen
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
