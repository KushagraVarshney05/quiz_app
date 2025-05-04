import React, { useState, useEffect } from "react";

const AddQuestion = () => {
  const [events, setEvents] = useState([]);
  const [questionData, setQuestionData] = useState({
    EventId: "",
    Questions: [
      {
        questionText: "",
        answerOptions: [
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
        ],
      },
    ],
  });

  // Fetch event list on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/admin/event/all");
        const data = await res.json();
        setEvents(data.events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchEvents();
  }, []);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });
    const data = await res.json();
    alert("Questions added: " + JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleQuestionSubmit}
      className="form-section"
      style={styles.form}
    >
      <h2 style={styles.heading}>Add Questions</h2>

      {/* Event Selection Dropdown */}
      <label style={styles.label}>Select Event:</label>
      <select
        style={styles.select}
        value={questionData.EventId}
        onChange={(e) =>
          setQuestionData({ ...questionData, EventId: e.target.value })
        }
        required
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.event_name}
          </option>
        ))}
      </select>

      {/* Question Input */}
      <label style={styles.label}>Question:</label>
      <input
        type="text"
        placeholder="Enter your question"
        style={styles.input}
        value={questionData.Questions[0].questionText}
        onChange={(e) => {
          const updatedQuestions = [...questionData.Questions];
          updatedQuestions[0].questionText = e.target.value;
          setQuestionData({ ...questionData, Questions: updatedQuestions });
        }}
        required
      />

      {/* Answer Options */}
      <label style={styles.label}>Answer Options:</label>
      {questionData.Questions[0].answerOptions.map((opt, idx) => (
        <div key={idx} style={styles.optionRow}>
          <input
            type="text"
            placeholder={`Answer ${idx + 1}`}
            style={styles.input}
            value={opt.answerText}
            onChange={(e) => {
              const options = [...questionData.Questions[0].answerOptions];
              options[idx].answerText = e.target.value;
              setQuestionData({
                ...questionData,
                Questions: [
                  { ...questionData.Questions[0], answerOptions: options },
                ],
              });
            }}
            required
          />
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={opt.isCorrect}
              onChange={(e) => {
                const options = [...questionData.Questions[0].answerOptions];
                options[idx].isCorrect = e.target.checked;
                setQuestionData({
                  ...questionData,
                  Questions: [
                    { ...questionData.Questions[0], answerOptions: options },
                  ],
                });
              }}
            />
            Correct
          </label>
        </div>
      ))}

      <button type="submit" style={styles.button}>
        Add Question
      </button>
    </form>
  );
};

export default AddQuestion;

// Simple inline styles
const styles = {
  form: {
    maxWidth: "600px",
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
  select: {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    borderRadius: "4px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
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
};
