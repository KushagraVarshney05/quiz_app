import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const { eventId } = useParams();

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    const formData = {
      Object_id: localStorage.getItem("User_Id"),
      Event_Object_id: eventId,
      password: "123456",
    };
    axios
      .post("http://localhost:5000/api/v1/event_reg/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Assuming you're sending JSON data in the request body
        },
      })
      .then((res) => {
        // Handle the message in the React component
        console.log(res);
        // window.location.replace(`/api/welcome/${params?.user_id}`);
      })
      .catch((error) => {
        console.log(error);
        // Handle error state
      });
  };

  return (
    <div>
      <div>Yash Varshney</div>
      <button onClick={handleClick}>Register</button>
    </div>
  );
};

export default Index;
