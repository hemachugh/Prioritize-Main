import { useState, useEffect } from "react";
import "./EditTask.css";

function EditTask({ task, updateTask }) {
  const [activeEdit, setActiveEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.Title);
  const [editedDescription, setEditedDescription] = useState(task.Description);
  const [editedDueDate, setEditedDueDate] = useState(new Date(task.DueDate));
  const [editedPriority, setEditedPriority] = useState(task.Priority);

  useEffect(() => {
    setEditedTitle(task.Title);
    setEditedDescription(task.Description);
    setEditedDueDate(new Date(task.DueDate));
    setEditedPriority(task.Priority);
  }, [task, activeEdit]);

  function handleSave() {
    updateTask(task.id, {
      Title: editedTitle,
      Description: editedDescription,
      DueDate: editedDueDate,
      Priority: editedPriority,
    });
    setActiveEdit(false);
  }

  function handleCancel() {
    setActiveEdit(false);
  }

  return (
    <>
      <button onClick={() => setActiveEdit((prev) => !prev)}>Edit</button>
      {activeEdit && (
        <div className="edit-task">
          <input
            type="text"
            value={editedTitle}
            placeholder="Edit Title"
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            placeholder="Edit Description"
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="date"
            value={editedDueDate.toLocaleDateString("en-CA")}
            onChange={(e) => setEditedDueDate(new Date(e.target.value))}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default EditTask;
