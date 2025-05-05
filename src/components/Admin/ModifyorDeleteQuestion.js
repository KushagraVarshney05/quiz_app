import React, { useEffect, useState } from "react";
import axios from "axios";

const EventQuestionsPage = () => {
    const [eventId, setEventId] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [events, setEvents] = useState([]);
    const [marksError, setMarksError] = useState(""); // To store marks validation error

    // Fetch all events on component mount
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
    const fetchQuestions = async () => {
        if (!eventId) return;
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/question/getquestions/${eventId}`);
            const allQuestions = res.data.questions.flatMap(q => q.Questions);
            setQuestions(allQuestions);
        } catch (error) {
            console.error("Failed to fetch questions:", error.message);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };
    // Fetch questions when eventId changes
    useEffect(() => {
        

        fetchQuestions();
    }, [eventId]);

    // Delete a question
    const deleteQuestion = async (questionId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/question/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setQuestions(questions.filter((q) => q._id !== questionId));
        } catch (error) {
            console.error("Failed to delete question:", error.message);
        }
    };

    // Start editing
    const startEdit = (question) => {
        setEditingId(question._id);
        setEditData({
            ...question,
            marks: question.marks || 1, // Default marks to 1 if not provided
            answerOptions: question.answerOptions.map((opt) => opt.answerText), // Extract individual answer options
        });
    };

    // Track edit field changes
    const handleEditChange = (e) => {
        const { name, value, dataset } = e.target;
        if (name === "marks") {
            // Validate marks field
            if (value < 1 || value > 10) {
                setMarksError("Marks should be between 1 and 10");
            } else {
                setMarksError("");
            }
        }

        // Update either marks or answer options
        if (name === "marks") {
            setEditData({ ...editData, marks: value });
        } else if (name.startsWith("answerOption")) {
            const index = parseInt(dataset.index);
            const newOptions = [...editData.answerOptions];
            newOptions[index] = value;
            setEditData({ ...editData, answerOptions: newOptions });
        }
    };

    // Submit updated question
    const submitEdit = async () => {
        if (marksError) return; // Prevent saving if there's a validation error on marks

        try {
            // Convert the answer options back to the expected format
            const updatedAnswerOptions = editData.answerOptions.map((answer) => ({
                answerText: answer.trim(),
                isCorrect: false, // Set default isCorrect to false or modify as needed
            }));

            const updatedData = {
                ...editData,
                answerOptions: updatedAnswerOptions,
            };

           await axios.patch(`http://localhost:5000/api/v1/question/${editingId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            await fetchQuestions();
            setEditingId(null);
        } catch (error) {
            console.error("Failed to update question:", error.message);
        }
    };

    const selectedEventName = events.find((e) => e._id === eventId)?.event_name || "";

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Event Questions Manager</h1>

            {/* Event Dropdown */}
            <label className="block mb-2 font-medium">Select Event:</label>
            <select
                className="border p-2 rounded mb-6 w-full"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
            >
                <option value="">-- Select Event --</option>
                {events.map((event) => (
                    <option key={event._id} value={event._id}>
                        {event.event_name}
                    </option>
                ))}
            </select>

            {loading ? (
                <p>Loading questions...</p>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-3">
                        Questions for Event: {selectedEventName}
                    </h2>

                    {questions.length === 0 ? (
                        <p>No questions found for this event.</p>
                    ) : (
                        <ul className="space-y-4">
                            {questions.map((q) => (
                                <li key={q._id} className="border p-4 rounded shadow">
                                    {editingId === q._id ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="questionText"
                                                value={editData.questionText}
                                                onChange={handleEditChange}
                                                className="border p-1 w-full"
                                            />
                                            <label className="block mt-2">Marks</label>
                                            <input
                                                type="number"
                                                name="marks"
                                                value={editData.marks}
                                                onChange={handleEditChange}
                                                className="border p-1 w-full"
                                            />
                                            {marksError && <p className="text-red-500">{marksError}</p>}

                                            <label className="block mt-2">Answer Options</label>
                                            {editData.answerOptions.map((option, index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                    <input
                                                        type="text"
                                                        name={`answerOption-${index}`}
                                                        data-index={index}
                                                        value={option}
                                                        onChange={handleEditChange}
                                                        className="border p-1 w-full"
                                                    />
                                                </div>
                                            ))}
                                            <button
                                                onClick={submitEdit}
                                                className="bg-green-600 text-white px-3 py-1 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="ml-2 bg-gray-500 text-white px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p>
                                                <strong>Question:</strong> {q.questionText}
                                            </p>
                                            <p>
                                                <strong>Marks:</strong> {q.marks}
                                            </p>
                                            <ul className="ml-4 list-disc">
                                                {q.answerOptions.map((opt, idx) => (
                                                    <li key={idx}>
                                                        {opt.answerText} 
                                                        {opt.isCorrect && <span className="text-green-600 font-semibold">(Correct)</span>}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-2 space-x-2">
                                                <button
                                                    onClick={() => startEdit(q)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteQuestion(q._id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default EventQuestionsPage;
