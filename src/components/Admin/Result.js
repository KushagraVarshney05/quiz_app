import React, { useState, useEffect } from "react";

const ViewResults = () => {
  const [resultEventId, setResultEventId] = useState("");
  const [results, setResults] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch event list on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/admin/event/all");
        const data = await res.json();
        setEvents(data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const handleResultFetch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/result/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: resultEventId }),
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Failed to fetch results:", err);
      setResults({ error: "Failed to fetch results" });
    }
  };

  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>View Event Results</h2>

      {/* Event Dropdown */}
      <label style={styles.label}>Select Event:</label>
      <select
        style={styles.select}
        value={resultEventId}
        onChange={(e) => setResultEventId(e.target.value)}
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.event_name}
          </option>
        ))}
      </select>

      <button onClick={handleResultFetch} style={styles.button}>
        Get Results
      </button>

      {/* Results Display */}
      {results?.eventResult && (
        <div style={styles.resultBox}>
          <h3 style={{ marginBottom: "10px" }}>
            Event: {results.eventResult.EventId.event_name}
          </h3>
          <h4 style={{ marginBottom: "20px" }}>
            Total Score: {results.totalScore}
          </h4>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Score</th>
              </tr>
            </thead>
            <tbody>
              {results.eventResult.Users.map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>{user.UserId.name}</td>
                  <td style={styles.td}>{user.UserId.email}</td>
                  <td style={styles.td}>{user.Score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Error fallback */}
      {results?.error && (
        <div style={{ color: "red", marginTop: "20px" }}>{results.error}</div>
      )}
    </div>
  );
};

export default ViewResults;

// Styles
const styles = {
  form: {
    width: "800px",
    maxWidth: "900px",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "8px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f1f1f1",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};
