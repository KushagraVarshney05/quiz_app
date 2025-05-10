import React, { useState } from "react";
import CreateEvent from "./CreateEvent";
import AddQuestion from "./AddQuestions";
import ViewResults from "./Result";
import ModifyorDeleteQuestion from "./ModifyorDeleteQuestion";
import "./home.css";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("createEvent");

  const renderSection = () => {
    switch (activeSection) {
      case "createEvent":
        return <CreateEvent />;
      case "addQuestion":
        return <AddQuestion />;
      case "viewResults":
        return <ViewResults />;
      case "modifyDeleteQuestion":
        return <ModifyorDeleteQuestion />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveSection("createEvent")}>Create Event</li>
          <li onClick={() => setActiveSection("addQuestion")}>Add Questions</li>
          <li onClick={() => setActiveSection("viewResults")}>View Results</li>
          <li onClick={() => setActiveSection("modifyDeleteQuestion")}>
            Modify/Delete
          </li>
        </ul>
      </div>
      <div className="main-content">{renderSection()}</div>
    </div>
  );
};

export default AdminPanel;
