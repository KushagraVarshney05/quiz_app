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
    <form onSubmit={handleEventSubmit} className="form-section" style={styles.form}>
      <h2 style={styles.heading}>Create Event</h2>

      <label style={styles.label}>Event Name:</label>
      <input
        type="text"
        placeholder="Event Name"
        style={styles.input}
        onChange={(e) =>
          setEventData({ ...eventData, event_name: e.target.value })
        }
      />

      <label style={styles.label}>Description:</label>
      <input
        type="text"
        placeholder="Description"
        style={styles.input}
        onChange={(e) =>
          setEventData({ ...eventData, event_description: e.target.value })
        }
      />

      <label style={styles.label}>URL:</label>
      <input
        type="text"
        placeholder="URL"
        style={styles.input}
        onChange={(e) =>
          setEventData({ ...eventData, event_url: e.target.value })
        }
      />

      <label style={styles.label}>Start Date (MM/DD/YYYY):</label>
      <input
        type="text"
        placeholder="Start Date"
        style={styles.input}
        onChange={(e) =>
          setEventData({ ...eventData, start_date: e.target.value })
        }
      />

      <label style={styles.label}>End Date (MM/DD/YYYY):</label>
      <input
        type="text"
        placeholder="End Date"
        style={styles.input}
        onChange={(e) =>
          setEventData({ ...eventData, end_date: e.target.value })
        }
      />

      <label style={styles.label}>Max Registration:</label>
      <input
        type="number"
        placeholder="Max Registration"
        style={styles.input}
        onChange={(e) =>
          setEventData({ ...eventData, maxRegistration: e.target.value })
        }
      />

      <button type="submit" style={styles.submitButton}>
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;

// Inline styles
const styles = {
  form: {
    width:"800px",
    maxWidth: "900px",
    marginTop:"20px",
    marginBottom:"20px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
