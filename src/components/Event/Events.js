import React, { useEffect, useState } from "react";
import "./Events.css";
import Logout from "../Logout/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const Navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = "http://localhost:5000/api/v1/admin/event";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setEvents(data?.getEvent);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (eventId) => {
    console.log(eventId);
    Navigate(`/eventRegistration/${eventId}`);
  };
  const handleSecondary = (id) => {

    Navigate(`/questions/${id}`);
  
    // notify("Something went wrong", "error");
  };
  const handleSubmitted = () => { 
    notify("You have already submitted the test", "error");
  }

  useEffect(() => {
    events.forEach(async (event) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/event_reg/login",
          {
            Object_id: localStorage.getItem("User_Id"),
            Event_Object_id: event._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const msg = response.data.msg;
        console.log(response.data.msg);

        if (msg === "User  registered") {
          setRegistered(true);
        }
        const result = await axios.get (
          `http://localhost:5000/api/v1/question/check/${event._id}/${localStorage.getItem("User_Id")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(result.data.isResultSubmitted);
        if(result.data.isResultSubmitted){
          setIsSubmitted(true);
        };


      } catch (error) {
        console.log(error);
      }
    });
  }, [events]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2rem",
        }}
      >
        {events?.map((event) => (
          <div key={event?.event_name} className="card">
            <div className="card-body">
              <img src={event?.event_url} className="card-img-top" alt="..." />
              <h5 className="card-title">{event?.event_name}</h5>
              <p className="card-text">
                Start Date: {new Date(event?.start_date).toLocaleDateString()}
              </p>
              <p className="card-text">
                End Date: {new Date(event?.end_date).toLocaleDateString()}
              </p>
              <p className="card-text">
                Event Description: {event?.event_description}
              </p>

              {registered ? (
                !isSubmitted?(<button className="btn btn-secondary" onClick={()=>handleSecondary(event._id)}>
                  Start Quiz
                </button>):(<button className="btn btn-secondary" onClick={handleSubmitted}>
                  Already Submitted
                </button>)
              ) 
              :
              (
                <button
                  className="btn btn-primary"
                  onClick={() => handleChange(event._id)}
                >
                  Enroll
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Events;
