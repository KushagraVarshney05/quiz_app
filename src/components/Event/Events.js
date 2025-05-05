import React, { useEffect, useState } from "react";
import "./Events.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const Navigate = useNavigate();

  const [registrationStatus, setRegistrationStatus] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState({});

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

  useEffect(() => {
    const checkRegistrationAndSubmission = async () => {
      try {
        for (const event of events) {
          const regResponse = await axios.post(
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

          const regMsg = regResponse.data.msg;
          setRegistrationStatus((prevStatus) => ({
            ...prevStatus,
            [event._id]: regMsg === "User  registered",
          }));

          const result = await axios.get(
            `http://localhost:5000/api/v1/question/check/${
              event._id
            }/${localStorage.getItem("User_Id")}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const isResultSubmitted = result.data.isResultSubmitted;
          setSubmissionStatus((prevStatus) => ({
            ...prevStatus,
            [event._id]: isResultSubmitted,
          }));
        }
      } catch (error) {}
    };

    if (events?.length > 0) {
      checkRegistrationAndSubmission();
    }
  }, [events]);

  const handleChange = async (eventId) => {
    Navigate(`/eventRegistration/${eventId}`);
  };

  const handleSecondary = (id) => {
    if (id === "6818eb08ea746972ff13bffa") {
      Navigate(`/compiler`);
    } else {
      Navigate(`/questions/${id}`);
    }
  };

  const handleSubmitted = () => {
    notify("You have already submitted the test", "error");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "3rem",
          padding: "2rem",
        }}
      >
        {events?.map((event) => (
          <div key={event?._id} className="card">
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

              {registrationStatus[event._id] ? (
                !submissionStatus[event._id] ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleSecondary(event._id)}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={handleSubmitted}
                  >
                    Already Submitted
                  </button>
                )
              ) : (
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
      <ToastContainer />
    </div>
  );
};

export default Events;
