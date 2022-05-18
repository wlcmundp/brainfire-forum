import { useState, useEffect } from "react";
// import { fetchToken, onMessageListener } from "./../actions/firebase";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import io from "socket.io-client";
import CONFIG from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
function App() {
  // TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    firstname: "",
    lastname: "",
    type: "",
    id: "",
    data: "",
  });
  const admin = useSelector((state) => state.login);

  //   const [isTokenFound, setTokenFound] = useState(false);
  let [socket, setSocket] = useState(null);
  // onMessageListener()
  //   .then((payload) => {
  //     console.log("payload", payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));
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
        if (data.action === "NEW_NOTIFICATION") {
          console.log("messages from server", data.data.data);
          // console.log("messages from server", data.data.data);
          setNotification(data.data.data);
          setShow(true);
        }
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

  const onShowNotificationClicked = () => {
    setNotification({
      title: "Notification",
      body: "This is a test notification",
    });
    setShow(true);
  };

  return (
    <div className="App">
      {/* <Toast
        onClose={() => setShow(false)}
        show={true}
        // delay={3000}
        // autohide

        animation
        style={{
          position: "absolute",
          top: 100,
          right: 20,
          minWidth: 200,
          zIndex: 23,
        }}
      >
        <Toast.Header>
          <span className="material-icons ms-1" style={{ marginRight: 5 }}>
            report
          </span>
          <strong className="mr-5" style={{ marginRight: 5 }}>
            Blog
          </strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>
          {notification.body}
          <div className="custom-scroll notification-height">
            <div className="cb-icon-avatar cb-icon-secondary me-3">TC</div>
            <div className="flex-fill">
              <p className="fs-14 mb-1">
                <b className="text-black">name</b> text here
              </p>
              <span className="fs-13 text-muted">5 mins ago</span>
            </div>
          </div>
        </Toast.Body>
      </Toast> */}
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 100,
          right: 20,
          minWidth: 200,
          zIndex: 23,
          cursor: "pointer",
        }}
        onClick={(e) => {
          let n = "";
          if (notification.type === "report") {
            n = `/admin/edit-report/${notification.data.id}`;
          }
          if (notification.type === "blog") {
            n = `/app/blog-detail/${notification.data.blog.slug}`;
          }
          if (notification.type === "inbox") {
            n = `/app/inbox-detail/${notification.data.inbox.uuid}`;
          }
          navigate(n);
          setShow(false);
        }}
      >
        <Toast.Header>
          <span className="material-icons ms-1 me-2 rounded ">report</span>

          <strong className="me-auto">{notification.type}</strong>
          <small>Just Now</small>
        </Toast.Header>
        <Toast.Body>
          <div className="d-flex">
            <div className="cb-icon-avatar cb-icon-secondary me-3">
              {`${notification.firstname[0]}${notification.lastname[0]}`}
            </div>
            <div className="flex-fill">
              <p className="fs-14 mb-1">
                <b className="text-black mr-2">
                  {`${notification.firstname} ${notification.lastname}`}
                </b>
                {notification.body}
              </p>
              <span className="fs-13 text-muted">
                {notification.data
                  ? timeAgo.format(new Date(notification.data.created_at))
                  : null}
              </span>
            </div>
          </div>
        </Toast.Body>
      </Toast>

      {/* <Button onClick={() => onShowNotificationClicked()}>Show Toast</Button> */}
    </div>
  );
}

export default App;
