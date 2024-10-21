import EditTask from "../EditTask/EditTask";
import "./ListOfTask.css";

function ListOfTask({
  sortedTasks,
  handleMarkAsCompletedToggle,
  deleteTask,
  updateTask,
}) {
  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <li key={task.id} className="task-item">
          <header>
            <h4>{task.Title}</h4>
          </header>
          <p>{task.Description}</p>
          <footer>
            <p>Status: {task.Status}</p>
            <p>Due Date: {new Date(task.DueDate).toDateString()}</p>
            <p>Priority: {task.Priority}</p>
            <EditTask task={task} updateTask={updateTask} />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <input
              type="checkbox"
              checked={task.Status === "Completed"}
              onChange={() => handleMarkAsCompletedToggle(task.id)}
            />
            Mark as Completed
          </footer>
        </li>
      ))}
    </ul>
  );
}

export default ListOfTask;
