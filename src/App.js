import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask/AddTask";
import ListOfTask from "./components/ListOfTask/ListOfTask";
import FilterTask from "./components/FilterTask/FilterTask";
import Search from "./components/SearchTask/SearchTask";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("default");

  useEffect(() => {
    const loadedTasks = loadTasksFromLocalStorage();
    setTasks(loadedTasks);
  }, []);

  const loadTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  };

  const addTasks = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const filteredTasks = () => {
    let filtered = tasks;

    // Filter by status
    switch (filter) {
      case "Completed":
        filtered = tasks.filter((task) => task.Status === "Completed");
        break;
      case "Pending":
        filtered = tasks.filter((task) => task.Status === "Pending");
        break;
      case "Overdue":
        filtered = tasks.filter((task) => task.Status === "Overdue");
        break;
      default:
        filtered = tasks;
        break;
    }

    // Search functionality
    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.Description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort functionality
    if (sortCriteria === "dueDate") {
      filtered.sort((a, b) => new Date(a.DueDate) - new Date(b.DueDate));
    } else if (sortCriteria === "name") {
      filtered.sort((a, b) => a.Title.localeCompare(b.Title));
    }

    return filtered;
  };
  const handleMarkAsCompletedToggle = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            Status: task.Status === "Completed" ? "Pending" : "Completed",
          }
        : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="App">
      <AddTask addTasks={addTasks} />
      <FilterTask
        filter={filter}
        setFilter={setFilter}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ListOfTask
        sortedTasks={filteredTasks()}
        deleteTask={deleteTask}
        updateTask={updateTask}
        handleMarkAsCompletedToggle={handleMarkAsCompletedToggle}
      />
    </div>
  );
}

export default App;
