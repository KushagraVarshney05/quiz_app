import React, { useState, useEffect } from "react";

const AddQuestion = () => {
  const [events, setEvents] = useState([]);
  const [questionData, setQuestionData] = useState({
    EventId: "",
    Questions: [
      {
        questionText: "",
        marks: "",
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

  // Handle submitting the form
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });
    const data = await res.json();
    
    // On success, reset the form
    if (res.ok) {
      alert("Questions added: " + JSON.stringify(data));
      setQuestionData({
        EventId: "",
        Questions: [
          {
            questionText: "",
            marks: "",
            answerOptions: [
              { answerText: "", isCorrect: false },
              { answerText: "", isCorrect: false },
              { answerText: "", isCorrect: false },
              { answerText: "", isCorrect: false },
            ],
          },
        ],
      });
    } else {
      alert("Failed to add question: " + JSON.stringify(data));
    }
  };

  // Add a new question to the list
  const handleAddQuestion = () => {
    setQuestionData({
      ...questionData,
      Questions: [
        ...questionData.Questions,
        {
          questionText: "",
          marks: "",
          answerOptions: [
            { answerText: "", isCorrect: false },
            { answerText: "", isCorrect: false },
            { answerText: "", isCorrect: false },
            { answerText: "", isCorrect: false },
          ],
        },
      ],
    });
  };

  // Handle updating a specific question's field
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questionData.Questions];
    updatedQuestions[index][field] = value;
    setQuestionData({ ...questionData, Questions: updatedQuestions });
  };

  // Handle updating answer options for a specific question
  const handleAnswerOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...questionData.Questions];
    updatedQuestions[questionIndex].answerOptions[optionIndex][field] = value;
    setQuestionData({ ...questionData, Questions: updatedQuestions });
  };

  // Handle changing the 'isCorrect' status of an answer option
  const handleCorrectChange = (questionIndex, optionIndex, isCorrect) => {
    const updatedQuestions = [...questionData.Questions];
    updatedQuestions[questionIndex].answerOptions[optionIndex].isCorrect = isCorrect;
    setQuestionData({ ...questionData, Questions: updatedQuestions });
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

      {/* Loop through questions */}
      {questionData.Questions.map((question, qIndex) => (
        <div key={qIndex}>
          {/* Question Input */}
          <label style={styles.label}>Question {qIndex + 1}:</label>
          <input
            type="text"
            placeholder="Enter your question"
            style={styles.input}
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
            required
          />

          {/* Answer Options */}
          <label style={styles.label}>Answer Options:</label>
          {question.answerOptions.map((opt, idx) => (
            <div key={idx} style={styles.optionRow}>
              <input
                type="text"
                placeholder={`Answer ${idx + 1}`}
                style={styles.input}
                value={opt.answerText}
                onChange={(e) =>
                  handleAnswerOptionChange(
                    qIndex,
                    idx,
                    "answerText",
                    e.target.value
                  )
                }
                required
              />
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={opt.isCorrect}
                  onChange={(e) =>
                    handleCorrectChange(
                      qIndex,
                      idx,
                      e.target.checked
                    )
                  }
                />
                Correct
              </label>
            </div>
          ))}

          {/* Marks Input */}
          <label style={styles.label}>Marks:</label>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Enter marks for this question"
            style={styles.input}
            value={question.marks}
            onChange={(e) =>
              handleQuestionChange(qIndex, "marks", e.target.value)
            }
            required
          />
        </div>
      ))}

      {/* Button to add more questions */}
      <button
        type="button"
        onClick={handleAddQuestion}
        style={styles.button}
      >
        Add Another Question
      </button>

      <button type="submit" style={styles.button}>
        Add Questions
      </button>
    </form>
  );
};

export default AddQuestion;

// Simple inline styles
const styles = {
  form: {
    width:"800px",
    maxWidth: "900px",
    margin: "auto",
    marginTop:"20px",
    marginBottom:"20px",
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
    marginBottom: "10px", // Added margin-bottom to space the button out
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
