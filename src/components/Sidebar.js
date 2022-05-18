import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  const closeSidebar = () => {
    console.log(window.sidebarOpened);

    document.querySelector(".cb-sidebar").classList.remove("cb-sidebar-open");
    document
      .querySelector(".cb-sidebar-overlay")
      .classList.remove("cb-sidebar-overlay-show");
    window.sidebarOpened = false;

    // setSidebarOpened(true);
  };
  return (
    <div>
      {/* Add "cb-sidebar-overlay-show" class to show overlay  */}
      <div className="cb-sidebar-overlay"></div>

      {/* Add "cb-sidebar-open" class to open sidebar  */}
      <div className="cb-sidebar">
        <div className="sidebar-wrapper custom-scroll">
          <ul className="list-unstyled sidebar-list mb-0">
            <li>
              <Link
                className={splitLocation[1] === "dashboard" ? "active" : ""}
                to="/admin"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">dashboard</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "surveys" ? "active" : ""}
                to="/admin/surveys"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">quiz</span>
                Surveys
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "reports" ? "active" : ""}
                to="/admin/reports"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">donut_large</span>
                Reports
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "blogs" ? "active" : ""}
                to="/admin/blogs"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">rss_feed</span>
                Blogs
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "forum" ? "active" : ""}
                to="/admin/forum"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">forum</span>
                Forum
              </Link>
            </li>
            {/*     <li>
              <Link
                className={splitLocation[1] === "marketplace" ? "active" : ""}
                to="/admin/marketplace"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">storefront</span>
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "orders" ? "active" : ""}
                to="/admin/orders"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">shopping_cart</span>
                Orders
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "appointments" ? "active" : ""}
                to="/admin/appointments"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">event</span>
                Appointments
              </Link>
            </li> */}
            <li>
              <Link
                className={splitLocation[1] === "users" ? "active" : ""}
                to="/admin/users"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">people</span>
                Users
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "chatrooms" ? "active" : ""}
                to="/admin/chatrooms"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">chat</span>
                Chatrooms
              </Link>
            </li>
            <li>
              <Link
                className={splitLocation[1] === "inbox" ? "active" : ""}
                to="/admin/inbox"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">mail</span>
                Inbox
              </Link>
            </li>
            {/* <li>
              <Link
                className={splitLocation[1] === "roles" ? "active" : ""}
                to="/admin/roles"
                onClick={closeSidebar}
              >
                <span className="material-icons me-2">
                  admin_panel_settings
                </span>
                Roles
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
