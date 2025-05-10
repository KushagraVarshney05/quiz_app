import React, { useState, useEffect } from "react";

const AddQuestion = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // full event object
  const [questionData, setQuestionData] = useState({
    EventId: "",
    Questions: [
      {
        questionText: "",
        marks: "",
        answerOptions: [
          // only for quiz
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
        ],
        input: "", // only for competition
        output: "", // only for competition
      },
    ],
  });

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

    let apiUrl = "";
    let bodyToSend = {};

    if (selectedEvent?.key === "quiz") {
      apiUrl = "http://localhost:5000/api/v1/question";

      // Strip out input/output from each question before sending
      const quizQuestions = questionData.Questions.map((q) => ({
        questionText: q.questionText,
        marks: q.marks,
        answerOptions: q.answerOptions,
      }));

      bodyToSend = {
        EventId: questionData.EventId,
        Questions: quizQuestions,
      };
    } else if (selectedEvent?.key === "competition") {
      apiUrl = "http://localhost:5000/api/v1/cometition-question";
      const competitionQuestions = questionData.Questions.map((q) => ({
        question: q.questionText,
        input: q.input,
        output: q.output,
        marks: q.marks,
      }));

      bodyToSend = {
        eventId: questionData.EventId,
        questions: competitionQuestions,
      };
    } else {
      alert("Invalid event type selected.");
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Questions added successfully!");
        setSelectedEvent(null);
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
              input: "",
              output: "",
            },
          ],
        });
      } else {
        alert("Failed to add question: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Error submitting questions:", err);
      alert("Something went wrong while submitting questions.");
    }
  };

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
          input: "",
          output: "",
        },
      ],
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questionData.Questions];
    updatedQuestions[index][field] = value;
    setQuestionData({ ...questionData, Questions: updatedQuestions });
  };

  const handleAnswerOptionChange = (
    questionIndex,
    optionIndex,
    field,
    value
  ) => {
    const updatedQuestions = [...questionData.Questions];
    updatedQuestions[questionIndex].answerOptions[optionIndex][field] = value;
    setQuestionData({ ...questionData, Questions: updatedQuestions });
  };

  const handleCorrectChange = (questionIndex, optionIndex, isCorrect) => {
    const updatedQuestions = [...questionData.Questions];
    updatedQuestions[questionIndex].answerOptions[optionIndex].isCorrect =
      isCorrect;
    setQuestionData({ ...questionData, Questions: updatedQuestions });
  };

  return (
    <form onSubmit={handleQuestionSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add Questions</h2>

      <label style={styles.label}>Select Event:</label>
      <select
        style={styles.select}
        value={questionData.EventId}
        onChange={(e) => {
          const event = events.find((ev) => ev._id === e.target.value);
          setSelectedEvent(event);
          setQuestionData({ ...questionData, EventId: event._id });
        }}
        required
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.event_name} ({event.key})
          </option>
        ))}
      </select>

      {questionData.Questions.map((question, qIndex) => (
        <div key={qIndex}>
          <label style={styles.label}>Question {qIndex + 1}:</label>
          <input
            type="text"
            placeholder="Enter question"
            style={styles.input}
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
            required
          />

          {/* Conditional rendering based on event key */}
          {selectedEvent?.key === "quiz" ? (
            <>
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
                        handleCorrectChange(qIndex, idx, e.target.checked)
                      }
                    />
                    Correct
                  </label>
                </div>
              ))}
            </>
          ) : selectedEvent?.key === "competition" ? (
            <>
              <label style={styles.label}>Input (use \\n for new line):</label>
              <textarea
                rows="4"
                style={styles.input}
                placeholder="Input test case"
                value={question.input}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "input", e.target.value)
                }
                required
              />
              <label style={styles.label}>Output (use \\n for new line):</label>
              <textarea
                rows="4"
                style={styles.input}
                placeholder="Expected output"
                value={question.output}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "output", e.target.value)
                }
                required
              />
            </>
          ) : null}

          <label style={styles.label}>Marks:</label>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Enter marks"
            style={styles.input}
            value={question.marks}
            onChange={(e) =>
              handleQuestionChange(qIndex, "marks", e.target.value)
            }
            required
          />
        </div>
      ))}

      <button type="button" onClick={handleAddQuestion} style={styles.button}>
        Add Another Question
      </button>
      <button type="submit" style={styles.button}>
        Submit Questions
      </button>
    </form>
  );
};

export default AddQuestion;

// Styles
const styles = {
  form: {
    width: "800px",
    margin: "auto",
    marginTop: "20px",
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
    marginBottom: "10px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
