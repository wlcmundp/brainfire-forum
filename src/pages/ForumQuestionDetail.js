import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useParams, useLocation } from "react-router-dom";
import date from "date-and-time";
import axios from "axios";
import CONFIG from "../config";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Modal from "react-bootstrap/Modal";
import Goback from "../components/Goback";

function ForumQuestionDetail() {
  const admin = useSelector((state) => state.login);
  const alert = useAlert();
  const location = useLocation();
  let params = useParams();
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [postedOn, setPostedOn] = useState("");
  const [status, setStatus] = useState("");
  const [forumTitle, setForumTitle] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [list, setList] = useState([]);
  const [details, setDetails] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputText, setInputText] = useState("");
  const [selectedMainReply, setSelectedMainReply] = useState("");

  const [selectedReply, setSelectedReply] = useState({});

  useEffect(() => {
    // let response = location.state;
    // setTitle(response.data.question);
    // setPostedBy(
    //   response.data.user.firstname + " " + response.data.user.lastname
    // );
    // setPostedOn(response.data.published_at);
    // setStatus(response.data.status);
    // setForumTitle(response.data.forum.title);
    // setQuestionId(response.data.id);
    fetchReplies();
    return () => {};
  }, []);

  const fetchReplies = () => {
    var config = {
      method: "get",
      url: `${CONFIG.API_URL}/forum-questions-lists/${params.id}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setList(response.data.forum_replies);

        setTitle(response.data.question);
        setPostedBy(
          response.data.user.firstname + " " + response.data.user.lastname
        );
        setPostedOn(response.data.published_at);
        setStatus(response.data.status);
        setForumTitle(response.data.forum.title);
        setQuestionId(response.data.id);
        setDetails(response.data.details);
        updateViews(response.data.id, response.data.views);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteReply = () => {
    var config = {
      method: "delete",
      url: `${CONFIG.API_URL}/forum-replies/${selectedReply.id}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        let k = [];
        list.map((ele, index) => {
          if (selectedReply.subReply) {
            if (ele.id === selectedReply.mainId) {
              ele.replies = ele.replies.filter(
                (p) => p.id !== selectedReply.id
              );
            }
            k.push(ele);
          } else {
            if (ele.id !== selectedReply.id) {
              k.push(ele);
            }
          }
        });
        setList(k);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addMainReply = () => {
    var data = JSON.stringify({
      text: selectedMainReply
        ? `@ ${selectedMainReply.user.firstname} ${selectedMainReply.user.lastname} ${inputText}`
        : inputText,
      user: admin.id,
      forum_reply: selectedMainReply ? selectedMainReply.id : null,
      forum_questions_list: !selectedMainReply ? questionId : null,
    });

    var config = {
      method: "post",
      url: `${CONFIG.API_URL}/forum-replies`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (selectedMainReply) {
          let k = list.map((ele, index) => {
            if (ele.id === selectedMainReply.id) {
              ele.replies.push(response.data);
            }
            return ele;
          });
          setList(k);
        } else {
          setList([...list, response.data]);
        }
        setInputText("");
        setSelectedMainReply("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateViews = (id, views) => {
    views = parseInt(views);
    var dataT = JSON.stringify({
      views: views + 1,
    });

    var config = {
      method: "put",
      url: `${CONFIG.API_URL}/forum-questions-lists/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: dataT,
    };

    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <main className="main-section">
        <div className="container-fluid">
          {/* Title and Breadcrumbs Start */}
          <div className="row mb-3">
            <div className="col-md-8">
              <Goback />
              <h1 className="h3 mb-2 mb-md-1">{title}</h1>
              <Breadcrumb className="cb-breadcrumb">
                <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/forum">Forum</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/forum-topic">
                  {forumTitle}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* <div className="col-md-4 d-md-flex align-items-center justify-content-end card-action-buttons">
              <button
                className="btn-fab btn-secondary btn-hover-effect me-3"
                title="Edit"
              >
                <span className="material-icons">edit</span>
              </button>
              <button
                className="btn-fab btn-danger btn-hover-effect"
                title="Delete"
              >
                <span className="material-icons">delete</span>
              </button>
            </div> */}
          </div>
          {/* Title and Breadcrumbs End */}

          {/* Quick info start */}
          <div className="d-flex forum-topic-info-list mb-3">
            <div className="forum-topic-info">
              <p className="text-muted fs-13 mb-0">Gepostet von</p>
              <h6 className="mb-0">{postedBy}</h6>
            </div>
            <div className="forum-topic-info">
              <p className="text-muted fs-13 mb-0">Gepostet am</p>
              <h6 className="mb-0">
                {date.format(new Date(postedOn), "MMM DD, YYYY")}
              </h6>
            </div>
            <div className="forum-topic-info">
              <p className="text-muted fs-13 mb-0">Status</p>
              <Badge
                bg={status === "active" ? "primary" : "gray"}
                className="cb-badge "
              >
                {status}
              </Badge>
            </div>
          </div>
          {/* Quick info end */}
          <div className="card cb-card mb-2 mb-md-2 overflow-hidden">
            <div className="card-body">{details}</div>
          </div>
          <div className="card cb-card mb-4 mb-md-5 overflow-hidden">
            <div className="card-header card-header-border card-title-separator">
              <h2 className="h5 card-title">Antworten</h2>
              <p className="card-subtitle">{list.length} Antworten unten</p>
            </div>
            <div className="card-body">
              <ul className="list-unstyled cb-list-group cb-bordered-list forum-reply-list mb-3 mb-md-4">
                {list.map((ele, index) => {
                  return (
                    <>
                      <li className="d-md-flex align-items-start cb-list-item">
                        <div className="cb-icon-avatar cb-icon-secondary me-md-3 mb-2 mb-md-0">
                          {`${ele.user.firstname[0]}${ele.user.lastname[0]}`}
                        </div>
                        <div className="me-md-3 mb-2 mb-md-0 forum-reply-title">
                          <h6 className="mb-1">
                            {`${ele.user.firstname} ${ele.user.lastname}`}
                          </h6>
                          <p className="fs-14 mb-3">{ele.text}</p>
                          <div className="reply-btn-group mb-3 mb-md-0">
                            <button
                              className="btn btn-flat-link btn-link btn-icon-text btn-link-secondary"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedMainReply(ele);
                                document
                                  .getElementById("replyBox")
                                  .scrollIntoView({
                                    behavior: "smooth",
                                    block: "end",
                                    inline: "nearest",
                                  });
                                document.getElementById("replyInput").focus();
                              }}
                            >
                              <span className="material-icons me-1">reply</span>
                              <span className="link-text">Antworten</span>
                            </button>

                            <button
                              className="btn btn-flat-link btn-link btn-icon-text btn-link-danger"
                              onClick={(e) => {
                                handleShow();
                                setSelectedReply(ele);
                              }}
                            >
                              <span className="material-icons me-1">
                                delete
                              </span>
                              <span className="link-text">Löschen</span>
                            </button>
                            <button className="btn btn-flat-link btn-link btn-icon-text btn-link-secondary">
                              <span className="material-icons me-1">flag</span>
                              <span className="link-text">Melden</span>
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <span className="text-muted fs-13 text-right">
                            Posted on:
                            <b className="ms-1">
                              {date.format(
                                new Date(ele.published_at),
                                "MMM DD, YYYY"
                              )}
                            </b>
                          </span>
                        </div>
                      </li>
                      {/* nested replies start*/}
                      {ele.replies.map((subReply, subReplyIndex) => {
                        return (
                          <li
                            className="d-md-flex align-items-start cb-list-item"
                            style={{ marginLeft: 30 }}
                          >
                            <div className="cb-icon-avatar cb-icon-secondary me-md-3 mb-2 mb-md-0">
                              {`${subReply.user.firstname[0]}${subReply.user.lastname[0]}`}
                            </div>
                            <div className="me-md-3 mb-2 mb-md-0 forum-reply-title">
                              <h6 className="mb-1">
                                {`${subReply.user.firstname} ${subReply.user.lastname}`}
                              </h6>
                              <p className="fs-14 mb-3">{subReply.text}</p>
                              <div className="reply-btn-group mb-3 mb-md-0">
                                <button
                                  className="btn btn-flat-link btn-link btn-icon-text btn-link-secondary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedMainReply({
                                      ...subReply,
                                      id: ele.id,
                                    });
                                    document
                                      .getElementById("replyBox")
                                      .scrollIntoView({
                                        behavior: "smooth",
                                        block: "end",
                                        inline: "nearest",
                                      });
                                    document
                                      .getElementById("replyInput")
                                      .focus();
                                  }}
                                >
                                  <span className="material-icons me-1">
                                    reply
                                  </span>
                                  <span className="link-text">Antworten</span>
                                </button>
                                <button
                                  className="btn btn-flat-link btn-link btn-icon-text btn-link-danger"
                                  onClick={(e) => {
                                    handleShow();
                                    setSelectedReply({
                                      ...subReply,
                                      subReply: true,
                                      mainId: ele.id,
                                    });
                                  }}
                                >
                                  <span className="material-icons me-1">
                                    delete
                                  </span>
                                  <span className="link-text">Löschen</span>
                                </button>
                                <button className="btn btn-flat-link btn-link btn-icon-text btn-link-secondary">
                                  <span className="material-icons me-1">
                                    flag
                                  </span>
                                  <span className="link-text">Melden</span>
                                </button>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end">
                              <span className="text-muted fs-13 text-right">
                                Posted on:
                                <b className="ms-1">
                                  {date.format(
                                    new Date(subReply.published_at),
                                    "MMM DD, YYYY"
                                  )}
                                </b>
                              </span>
                            </div>
                          </li>
                        );
                      })}
                      {/* nester replies end */}
                    </>
                  );
                })}
              </ul>

              <form className="post-comment" id="replyBox">
                <h5 className="mb-3">Ihre Antwort posten</h5>
                <div className="form-group cb-form-group mb-3 mb-md-4">
                  <label className="form-label">
                    Your reply
                    {selectedMainReply ? (
                      <span
                        style={{
                          padding: 5,
                          background: "#bbb",
                          borderRadius: 5,
                          margin: 5,
                        }}
                      >
                        @
                        {selectedMainReply.user.firstname +
                          " " +
                          selectedMainReply.user.lastname}
                      </span>
                    ) : null}
                  </label>
                  <textarea
                    id="replyInput"
                    type="text"
                    className="form-control form-textarea"
                    placeholder="Type something here..."
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="">
                  <button
                    disabled={!inputText}
                    type="submit"
                    className="btn btn-primary btn-raised btn-hover-effect me-2 me-md-3"
                    onClick={(e) => {
                      e.preventDefault();
                      //   if (selectedMainReply) {
                      //   } else {
                      addMainReply();
                      //   }
                    }}
                  >
                    Posten
                  </button>
                  <button
                    type="reset"
                    className="btn btn-gray btn-hover-effect"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMainReply("");
                      setInputText("");
                    }}
                  >
                    Zurücksetzen
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
            <h4>Forum Antwort löschen</h4>
            <p className="mb-0">
              Sind Sie sicher, dass Sie diese Antwort löschen möchten? Dieser
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
                deleteReply();
              }}
            >
              Antwort löschen
            </button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}

export default ForumQuestionDetail;
