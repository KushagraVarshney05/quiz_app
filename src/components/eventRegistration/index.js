import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import emailIcon from "../../img/email.svg";
import passwordIcon from "../../img/password.svg";
import styles from "../SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { eventId } = useParams();
  const Navigate = useNavigate();

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    const formData = {
      Object_id: localStorage.getItem("User_Id"),
      Event_Object_id: eventId,
      password: password,
    };
    axios
      .post("http://localhost:5000/api/v1/event_reg/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Assuming you're sending JSON data in the request body
        },
      })
      .then((res) => {
        notify("You have successfully registered for the event", "success");
        setTimeout(() => {
          window.location.replace("/home");
        }, 2000);
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        notify(error.response.data.msg, "error");
      });
  };
  const [password, setPassword] = useState("");

  const changeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formLogin}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <h2>Verify Password</h2>
        <div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={changeHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <div>
          <button type="submit">Verify</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Index;
