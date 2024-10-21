import { useState } from "react";
import "./AddTask.css";

function AddTask({ addTasks }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("Normal");

  function handleSubmit(e) {
    e.preventDefault();
    addTasks({
      id: Date.now(),
      Title: title,
      Description: description,
      Status: "Pending",
      DueDate: date,
      Priority: priority,
    });
    setTitle("");
    setDescription("");
    setDate(new Date());
    setPriority("Normal");
    setShowInput((prevShowInput) => !prevShowInput);
  }

  return (
    <>
      <button type="button" onClick={() => setShowInput((prev) => !prev)}>
        Add Task
      </button>
      {showInput && (
        <form className="addtask" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Description</label>
          <input
            type="text"
            className="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Due Date</label>
          <input
            type="date"
            value={date.toLocaleDateString("en-CA")}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      )}
    </>
  );
}

export default AddTask;
