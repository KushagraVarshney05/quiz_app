import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import "./index.css";
import App from "./App";
import Home from "./components/Home";
import Events from "./components/Event/Events";
import EmailVerification from "./components/emailVerification";
import EventRegistration from "./components/eventRegistration";
import Questions from "./components/questions";
import Compiler from "./components/compiler/index";

const Root = () => {
  // Check if the user is logged in based on the presence of a token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/event" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/event" /> : <Signup />}
          />
          <Route
            path="/event"
            element={isLoggedIn ? <Events /> : <Navigate to="/login" />}
          />
          <Route path="/email/:token" element={<EmailVerification />} />
          <Route
            path="/eventRegistration/:eventId"
            element={<EventRegistration />}
          />
          <Route path="/questions/:eventId" element={<Questions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
