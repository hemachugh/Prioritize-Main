import React from "react";
import "./FilterTask.css"; // Import styles

function FilterTask({ filter, setFilter, sortCriteria, setSortCriteria }) {
  return (
    <div className="filter-task-container row">
      {/* Dropdown for filtering by task status */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="Overdue">Overdue</option>
      </select>

      {/* Dropdown for sorting tasks */}
      <select
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
      >
        <option value="default">Default Order</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="name">Sort by Name</option>
      </select>
    </div>
  );
}

export default FilterTask;
