import React from "react";
import "./SearchTask.css";

function SearchTask({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-task">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchTask;
