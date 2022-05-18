import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import CONFIG from "../config";
import { toogleUser } from "../store/actions/loginActions";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toogleUser(null, null, null, null, null, null, false));
    localStorage.removeItem("jwt");
    localStorage.removeItem("user-details");
    window.location.href = CONFIG.AZURE_B2C_URL;
    console.log("logout");
    return () => {};
  }, []);
  return null;
};
export default Logout;
// export const render = () => {
//     //   const dispatch = useDispatch();
//     //   dispatch(toogleUser(null, null, null, null, null, false));
//     // };
