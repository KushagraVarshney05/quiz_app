import React, { useEffect, useState } from "react";
import "./Events.css";
import Logout from "../Logout/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const Navigate = useNavigate();

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
        console.log(data?.getEvent);
        setEvents(data?.getEvent);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleChange = async (e) => {
    console.log(e);
    Navigate(`/eventRegistration/${e}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2rem",
      }}
    >
      {console.log(events)}
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

            <button
              className="btn btn-primary"
              onClick={() => handleChange(event._id)}
            >
              Enroll
            </button>
          </div>
        </div>
      ))}
      <Logout />
    </div>
  );
};

export default Events;
