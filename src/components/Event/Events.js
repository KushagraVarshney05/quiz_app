import React, { useEffect, useState } from "react";
import "./Events.css";
import Logout from "../Logout/Logout";

const Events = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <Logout />
      {events?.map((event) => (
        <div key={event?.event_name} className="card">
          <img
            src="https://images.unsplash.com/photo-1621758149070-5a9d6a4d8f7b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29sbGVjdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{event?.event_name}</h5>
            <p className="card-text">
              Start Date: {new Date(event?.start_date).toLocaleDateString()}
            </p>
            <p className="card-text">
              End Date: {new Date(event?.end_date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
