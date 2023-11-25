import React from "react";
import "./Logout.css";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
/* FILEPATH: /home/yashvarshney/Documents/GitHub/finalYearProject/quiz_app/src/components/Logout/Logout.css */

export default Logout;
