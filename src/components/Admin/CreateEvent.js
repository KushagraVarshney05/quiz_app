import React, { useState } from "react";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    event_name: "",
    event_description: "",
    event_url: "",
    start_date: "",
    end_date: "",
    maxRegistration: "",
  });

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/admin/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    alert("Event created: " + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleEventSubmit} className="form-section">
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        onChange={(e) =>
          setEventData({ ...eventData, event_name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) =>
          setEventData({ ...eventData, event_description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="URL"
        onChange={(e) =>
          setEventData({ ...eventData, event_url: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Start Date (MM/DD/YYYY)"
        onChange={(e) =>
          setEventData({ ...eventData, start_date: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="End Date (MM/DD/YYYY)"
        onChange={(e) =>
          setEventData({ ...eventData, end_date: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Max Registration"
        onChange={(e) =>
          setEventData({ ...eventData, maxRegistration: e.target.value })
        }
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
