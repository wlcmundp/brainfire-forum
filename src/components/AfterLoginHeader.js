import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import Logout from "../actions/logout";
import { useNavigate } from "react-router-dom";
import { toogleUser } from "../store/actions/loginActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import CONFIG from "../config";
import io from "socket.io-client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
function AfterLoginHeader() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [list, setList] = useState([]);

  const notilist = useRef(list);

  const [newnotiCount, setNewnotiCount] = useState([]);
  const notiCountlist = useRef(newnotiCount);
  let [socket, setSocket] = useState(null);

  TimeAgo.addDefaultLocale(en);

  const timeAgo = new TimeAgo("en-US");

  const [logout, setLogout] = useState(false);
  const admin = useSelector((state) => state.login);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [listener, setlistener] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const sidebarHandle = () => {
    if (!window.sidebarOpened) {
      document.querySelector(".cb-sidebar").classList.add("cb-sidebar-open");
      document
        .querySelector(".cb-sidebar-overlay")
        .classList.add("cb-sidebar-overlay-show");

      if (!listener) {
        document
          .querySelector(".cb-sidebar-overlay-show")
          .addEventListener("click", () => {
            document
              .querySelector(".cb-sidebar")
              .classList.remove("cb-sidebar-open");
            document
              .querySelector(".cb-sidebar-overlay")
              .classList.remove("cb-sidebar-overlay-show");
          });
        setlistener(false);
      }

      window.sidebarOpened = false;
      // setSidebarOpened(false);
    } else {
      document.querySelector(".cb-sidebar").classList.remove("cb-sidebar-open");
      document
        .querySelector(".cb-sidebar-overlay")
        .classList.remove("cb-sidebar-overlay-show");
      window.sidebarOpened = true;

      // setSidebarOpened(true);
    }
  };
  useEffect(() => {
    notilist.current = list;
    return () => {};
  }, [list]);
  useEffect(() => {
    notiCountlist.current = newnotiCount;
    return () => {};
  }, [newnotiCount]);
  useEffect(() => {
    // fetchToken(setTokenFound);
    if (!socket) {
      let s = io(CONFIG.STRAPI_SOCKET, {
        query: {
          user: admin.id,
          auth: admin.jwt,
          // room: `room-${params.id}`,
        },
        path:
          process.env.NODE_ENV === "development"
            ? ""
            : "/strapisocket/socket.io",
      });
      setSocket(s);
    }
    if (socket) {
      socket.on("connection", (socket) => {
        socket.emit("subscribe-noti", `notification`);
      });
      socket.on("notification", (data) => {
        if (data.action === "NOTIFICATION_ADD") {
          let newNoti = [];
          let k = [];
          let isNewNoti = false;
          let element = data.data;
          let m = element.seen_users.filter((t) => t.id === admin.id);
          if (m.length > 0) {
            isNewNoti = true;
            k.push({
              ...element,
              read: false,
            });
            newNoti.push(element);
          } else {
            k.push({
              ...element,
              read: true,
            });
          }
          console.log([...newNoti, ...notiCountlist.current]);
          setNewnotiCount([...newNoti, ...notiCountlist.current]);
          if (isNewNoti) {
            setNewNotification(true);
          }
          setList([...k, ...notilist.current]);
        }
        console.log("messages from server", data);
      });
      // console.
      socket.emit("subscribe-noti", `notification`);
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);
  useEffect(() => {
    window.sidebarOpened = false;
    return () => {};
  }, []);
  useEffect(() => {
    const getAllNotifications = () => {
      var config = {
        method: "get",
        url: `${CONFIG.API_URL}/notifications?_sort=id:DESC`,
        headers: {
          Authorization: `Bearer ${admin.jwt}`,
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then(function (response) {
          let k = [];
          let isNewNoti = false;
          let newNoti = [];
          response.data.forEach((element, index) => {
            if (index < 10) {
              let m = element.seen_users.filter((t) => t.id === admin.id);
              if (m.length > 0) {
                isNewNoti = true;
                k.push({
                  ...element,
                  read: false,
                });
                newNoti.push(element);
              } else {
                k.push({
                  ...element,
                  read: true,
                });
              }
            }
          });
          setNewnotiCount(newNoti);
          if (isNewNoti) {
            setNewNotification(true);
          }
          setList(k);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getAllNotifications();
  }, []);

  const seen = () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `${CONFIG.API_URL}/notifications/seen`,
      headers: {
        Authorization: `Bearer ${admin.jwt}`,
      },
    };

    axios(config)
      .then(function (response) {
        setNewNotification(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {/* {logout ? <Logout /> : null} */}
      <nav className="navbar navbar-expand-lg navbar-light cb-navbar fixed-top cb-after-login-header">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button
              className="me-3 d-flex d-lg-none header-humburger btn btn-flat-link"
              onClick={sidebarHandle}
            >
              <span className="material-icons">menu</span>
            </button>
            <a href="/admin" className="navbar-brand">
              <img src={logo} className="nav-logo" alt="Logo" />
            </a>
          </div>
          <div className="d-flex">
            {/* Notification dropdown */}
            <Dropdown>
              <Dropdown.Toggle className="me-3 me-md-4 header-notification">
                <div
                  className="btn-fab btn-gray"
                  onClick={(e) => {
                    e.preventDefault();
                    seen();
                  }}
                >
                  <span className="material-icons">notifications</span>
                </div>
                {newNotification ? (
                  <span className="number-badge">{newnotiCount.length}</span>
                ) : null}
              </Dropdown.Toggle>
              <Dropdown.Menu className="notification-dropdown">
                <div className="custom-scroll notification-height">
                  {list.map((ele, index) => {
                    return (
                      <Dropdown.Item
                        onClick={(e) => {
                          e.preventDefault();
                          let n = "";
                          if (ele.type === "report") {
                            n = `/admin/edit-report/${ele.report.id}`;
                            // n = `/app/survey-result/${ele.report.id}`;
                          }
                          if (ele.type === "blog") {
                            n = `/admin/blog-detail/${ele.blog.slug}`;
                          }
                          if (ele.type === "inbox") {
                            n = `/admin/inbox-detail/${ele.inbox.uuid}`;
                          }
                          navigate(n, {
                            state: { data: ele.report ? ele.report : null },
                          });
                        }}
                        className={`d-flex ${ele.read ? null : "unread"}`}
                      >
                        <div className="cb-icon-avatar cb-icon-secondary me-3">
                          TC
                        </div>
                        <div className="flex-fill">
                          <p className="fs-14 mb-1">
                            <b className="text-black">{`${ele.user.firstname} ${ele.user.lastname}`}</b>{" "}
                            {ele.text}
                          </p>
                          <span className="fs-13 text-muted">
                            {timeAgo.format(new Date(ele.created_at))}
                          </span>
                        </div>
                      </Dropdown.Item>
                    );
                  })}
                </div>
                <Dropdown.Item
                  href="/admin/notifications"
                  className="view-all-notification"
                >
                  ALLES ANZEIGEN
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle className="header-user-info">
                <div className="d-flex align-items-center">
                  <div className="cb-icon-avatar cb-icon-secondary">{`${admin.firstname[0]}${admin.lastname[0]}`}</div>
                  <div className="ms-3 me-3 d-none d-md-block">
                    <p className="h6 mb-0">{`${admin.firstname} ${admin.lastname}`}</p>
                    <p className="fs-14 mb-0">Admin</p>
                  </div>
                  <span className="material-icons d-none d-md-block">
                    keyboard_arrow_down
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown">
                <Dropdown.Item
                  href="/admin/myprofile"
                  className="d-flex align-items-center"
                >
                  <span className="material-icons me-2">person</span>My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  href="/admin/account-settings"
                  className="d-flex align-items-center"
                >
                  <span className="material-icons me-2">settings</span>Account
                  Settings
                </Dropdown.Item>
                {/* <Dropdown.Item
                href="/admin/faqs"
                className="d-flex align-items-center"
              >
                <span className="material-icons me-2">help</span>FAQs
              </Dropdown.Item> */}
                <Dropdown.Item
                  // href="/admin"
                  className="d-flex align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("jwt-admin");
                    localStorage.removeItem("user-details-admin");
                    dispatch(
                      toogleUser(null, null, null, null, null, null, false)
                    );
                    navigate("/admin/login");
                    setLogout(true);
                  }}
                >
                  <span className="material-icons me-2">logout</span>Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AfterLoginHeader;
