import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import { useParams, useLocation } from "react-router-dom";
import date from "date-and-time";
import axios from "axios";
import CONFIG from "../config";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Goback from "../components/Goback";
function ForumTopic() {
  const admin = useSelector((state) => state.login);
  const alert = useAlert();

  let params = useParams();
  let location = useLocation();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [forumTitle, setForumTitle] = useState("");
  const [forumId, setForumId] = useState("");
  const [question, setQuestion] = useState("");
  const [details, setDetails] = useState("");
  const [list, setList] = useState([]);
  const CancelToken = axios.CancelToken;
  const [source, setSource] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [editModalShow, setEditModalShow] = useState(false);

  useEffect(() => {
    if (location.state) {
      setList(location.state.data.forum_questions_lists);
      setForumId(location.state.data.id);
      setForumTitle(location.state.data.title);
      setStatus(location.state.data.status);
      fetchQuestionsList();
    } else {
      fetchQuestionsList();
    }

    return () => {};
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchQuestionsList = () => {
    var data = JSON.stringify({
      text: "using post methodn",
      user: 1,
      forum_questions_list: 1,
    });

    var config = {
      method: "get",
      url: `${CONFIG.API_URL}/forums/${params.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setList(response.data.forum_questions_lists);
        setForumId(response.data.id);
        setForumTitle(response.data.title);
        setStatus(response.data.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createQuestion = (statusT) => {
    var data = JSON.stringify({
      question: question,
      details: details,
      forum: forumId,
      status: statusT,
      user: admin.id,
    });

    var config = {
      method: "post",
      url: `${CONFIG.API_URL}/forum-questions-lists`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setQuestion("");
        setDetails("");
        setList([...list, response.data]);

        alert.success("Question created successfully.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const DeletedQuestion = () => {
    var config = {
      method: "delete",
      url: `${CONFIG.API_URL}/forum-questions-lists/${selectedQuestion.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        handleClose();
        let k = [];
        list.map((ele, index) => {
          if (ele.id !== selectedQuestion.id) {
            k.push(ele);
          }
        });
        setList(k);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchQuestion = (text) => {
    if (source) {
      source.cancel("Operation canceled by the user.");
    }
    const C_source = CancelToken.source();
    setSource(C_source);
    var config = {
      method: "get",
      url: `${CONFIG.API_URL}/forum-questions-lists?question_contains=${text}`,
      headers: {
        "Content-Type": "application/json",
      },
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

  return (
    <div>
      <main className="main-section">
        <div className="container-fluid">
          {/* Title, Breadcrumbs and Add Button Start */}
          <div className="row mb-3 mb-md-4">
            <div className="col-md-8">
              <Goback />
              <div className="d-md-flex align-items-center mb-2 mb-md-1 ">
                <h1 className="h3 mb-0 d-flex">{forumTitle}</h1>
                <Badge
                  bg={status === "active" ? "primary" : "gray"}
                  className="cb-badge "
                >
                  {status}
                </Badge>
              </div>
              <Breadcrumb className="cb-breadcrumb">
                <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/forum">Forum</Breadcrumb.Item>
                <Breadcrumb.Item active>{forumTitle}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* <div className="col-md-4 d-md-flex align-items-center justify-content-end">
              <button className="btn btn-primary btn-icon-text btn-raised btn-hover-effect">
                <span className="material-icons me-2">add</span>
                <span className="link-text">Add New Thread</span>
              </button>
            </div> */}
          </div>
          {/* Title, Breadcrumbs and Add Button End */}

          {/* Add Question Form Start */}
          <div className="card cb-card mb-3 mb-md-4">
            <div className="card-header card-header-border card-title-separator">
              <h2 className="h5 card-title">Neuer Thread</h2>
              <p className="card-subtitle">
                Füllen Sie das folgende Formular aus, um einen neuen Thread zu
                erstellen
              </p>
            </div>
            <div className="card-body">
              <div className="form-group cb-form-group mb-3 mb-md-4">
                <label className="form-label">Frage</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your question"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </div>
              <div className="form-group cb-form-group mb-3 mb-md-4">
                <label className="form-label">Details</label>
                <textarea
                  type="text"
                  className="form-control form-textarea"
                  placeholder="Write something here..."
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="row align-items-center">
                <div className="col-md-6 mb-3 mb-md-0 order-md-2 d-md-flex justify-content-end">
                  <button
                    className="btn btn-secondary btn-hover-effect me-2 me-md-3"
                    onClick={(e) => {
                      e.preventDefault();
                      createQuestion("draft");
                    }}
                  >
                    Entwurf speichern
                  </button>
                  <button
                    className="btn btn-primary btn-raised btn-hover-effect"
                    onClick={(e) => {
                      e.preventDefault();
                      createQuestion("active");
                    }}
                  >
                    Beitrag posten
                  </button>
                </div>
                <div className="col-md-6 order-md-1">
                  <button className="btn btn-gray btn-hover-effect">
                    Abbrechen
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Add Question Form End */}

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
                  searchQuestion(e.target.value);
                }}
              />
            </div>
          </div>
          {/* Form Search End */}
          <p className="text-muted fs-14 mb-2">
            {list.length} Forum-Fragen gefunden
          </p>

          {/* Forum Questions List Table Start */}
          <div className="card cb-card overflow-hidden">
            <Table className="cb-table mb-0">
              <thead>
                <tr>
                  <th>
                    <div className="d-flex align-items-center">
                      Fragen{" "}
                      <span className="material-icons ms-1">unfold_more</span>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center">
                      Antworten{" "}
                      <span className="material-icons ms-1">unfold_more</span>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center">
                      Ansichten{" "}
                      <span className="material-icons ms-1">unfold_more</span>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center">
                      Gepostet am{" "}
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
                      <td data-title="Question" className="table-col-title">
                        <Link
                          to={`/admin/forum-question-detail/${ele.id}`}
                          state={{ data: ele }}
                        >
                          <h6 className="mb-2">{ele.question}</h6>
                        </Link>
                        <p className="card-subtitle">
                          Gepostet von{" "}
                          <b>{ele.user.firstname + " " + ele.user.lastname}</b>
                        </p>
                      </td>
                      <td data-title="Replies" className="table-col-xs-50">
                        <p className="mb-0">{ele.forum_replies.length}</p>
                      </td>
                      <td data-title="Views" className="table-col-xs-50">
                        <p className="mb-0">{ele.views}</p>
                      </td>
                      <td data-title="Posted on" className="table-col-xs-50">
                        <p className="mb-0">
                          {date.format(
                            new Date(ele.published_at),
                            "MMM DD YYYY"
                          )}
                        </p>
                      </td>
                      <td data-title="Status" className="table-col-xs-50">
                        <Badge
                          bg={ele.status === "active" ? "primary" : "gray"}
                          className="cb-badge "
                        >
                          {ele.status}
                        </Badge>
                      </td>
                      <td data-title="Actions" className="table-col-actions">
                        <button
                          className="btn-fab btn-secondary btn-hover-effect me-3"
                          title="Edit"
                          onClick={() => {
                            setEditModalShow(true);
                            setSelectedQuestion(ele);
                          }}
                        >
                          <span className="material-icons">edit</span>
                        </button>
                        <button
                          className="btn-fab btn-danger btn-hover-effect"
                          onClick={() => {
                            handleShow();
                            setSelectedQuestion(ele);
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
          {/* Forum Questions List Table End */}
        </div>

        {/* Delete Forum Question Popup Start */}
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
            <h4>Forum Frage löschen</h4>
            <p className="mb-0">
              Sind Sie sicher, dass Sie diese Frage löschen möchten? Dieser
              Vorgang kann nicht rückgängig gemacht werden.
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
                DeletedQuestion();
              }}
            >
              Frage löschen
            </button>
          </Modal.Footer>
        </Modal>
        {/* Delete Forum Question Popup End */}
        <EditForumModal
          admin={admin}
          list={list}
          setList={setList}
          editModalShow={editModalShow}
          setEditModalShow={setEditModalShow}
          data={selectedQuestion}
        />
      </main>
    </div>
  );
}

export default ForumTopic;

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
    setTitle(data.question);
    setDescription(data.details);

    console.log(data);
    return () => {};
  }, [data]);

  const updateQuestion = (statusT) => {
    var dataT = JSON.stringify({
      question: title,
      details: description,
      status: statusT,
    });

    var config = {
      method: "put",
      url: `${CONFIG.API_URL}/forum-questions-lists/${data.id}`,
      headers: {
        Authorization: `Bearer ${admin.jwt}`,
        "Content-Type": "application/json",
      },
      data: dataT,
    };

    axios(config)
      .then(function (response) {
        setTitle("");
        setDescription("");
        setEditModalShow(false);

        let k = [];
        list.map((ele, index) => {
          if (ele.id === data.id) {
            ele = response.data;
          }
          k.push(ele);
        });
        setList(k);
        alert.success("Question Updated successfully.");
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
          <label className="form-label">Frage</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter quetion."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="form-group cb-form-group">
          <label className="form-label">Details</label>
          <textarea
            className="form-control form-textarea"
            placeholder="Write something here..."
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
              updateQuestion(data.status);
            }}
          >
            Update
          </button>

          {data.status === "draft" ? (
            <button
              onClick={() => {
                updateQuestion("active");
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
            Abbrechen
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
