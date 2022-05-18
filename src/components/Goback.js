import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function Goback() {
  let navigate = useNavigate();
  return (
    <span
      className="btn-link btn-link-dark btn-icon-text d-md-none d-inline-flex mb-2"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(-1);
      }}
    >
      <span className="material-icons me-2">keyboard_backspace</span>
      <span className="link-text">Zurück</span>
    </span>
  );
}

export default Goback;
