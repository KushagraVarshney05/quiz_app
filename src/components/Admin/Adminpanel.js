import React from "react";
import CreateEvent from "./CreateEvent";
import AddQuestion from "./AddQuestions";
import ViewResults from "./Result";
import ModifyorDeletQuestion from "./ModifyorDeleteQuestion"
import "./home.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <CreateEvent />
      <AddQuestion />
      <ViewResults />
      <ModifyorDeletQuestion/>
    </div>
  );
};

export default AdminPanel;
