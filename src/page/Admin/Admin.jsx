import React from "react";
import { useNavigate } from "react-router-dom";
import { Purchased } from "../../components/Purchased/Purchased";
import "./Admin.css";
const Admin = () => {
  let navigate = useNavigate();

  return (
    <div className="admin">
      <div className="admin-btn-div">
        <button className="admin-btn" onClick={() => navigate("/")}>
          Ana Sayfa
        </button>
      </div>
      <Purchased />
    </div>
  );
};

export default Admin;
