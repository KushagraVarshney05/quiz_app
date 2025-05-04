import React, { useState } from "react";
import "./home.css";
const AdminPanel = () => {
  const [eventData, setEventData] = useState({
    event_name: "",
    event_description: "",
    event_url: "",
    start_date: "",
    end_date: "",
    maxRegistration: "",
  });

  const [questionData, setQuestionData] = useState({
    EventId: "",
    Questions: [
      {
        questionText: "",
        answerOptions: [
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
        ],
      },
    ],
  });

  const [resultEventId, setResultEventId] = useState("");
  const [results, setResults] = useState(null);

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

  const handleResultFetch = async () => {
    const res = await fetch(
      `http://localhost:5000/api/v1/result?eventId=${resultEventId}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

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

      <form onSubmit={handleQuestionSubmit} className="form-section">
        <h2>Add Question</h2>
        <input
          type="text"
          placeholder="Event ID"
          onChange={(e) =>
            setQuestionData({ ...questionData, EventId: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Question"
          onChange={(e) => {
            const updatedQuestions = [...questionData.Questions];
            updatedQuestions[0].questionText = e.target.value;
            setQuestionData({ ...questionData, Questions: updatedQuestions });
          }}
        />
        {questionData.Questions[0].answerOptions.map((opt, idx) => (
          <div key={idx}>
            <input
              type="text"
              placeholder={`Answer ${idx + 1}`}
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
            />
            <label>
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
              />{" "}
              Correct
            </label>
          </div>
        ))}
        <button type="submit">Add Question</button>
      </form>

      <div className="form-section">
        <h2>View Results</h2>
        <input
          type="text"
          placeholder="Event ID"
          onChange={(e) => setResultEventId(e.target.value)}
        />
        <button onClick={handleResultFetch}>Get Results</button>
        {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default AdminPanel;
