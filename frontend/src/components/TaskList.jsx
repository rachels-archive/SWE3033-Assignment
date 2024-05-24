import React, { useState, useEffect } from "react";

const TaskList = ({ tasks, setTasks, isLoading }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 2:
        return "In Progress";
      case 3:
        return "Completed";
      default:
        return "Not Yet Started";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      default:
        return "Low";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead className="border-bottom">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((taskItem, index) => (
                <tr key={taskItem.id}>
                  <td>{taskItem.task_name}</td>
                  <td>{taskItem.task_description ? taskItem.task_description : "-"}</td>
                  <td>{getStatusText(taskItem.task_status)}</td>
                  <td>{getPriorityText(taskItem.task_priority)}</td>
                  <td>{formatDate(taskItem.task_deadline)}</td>

                  <td className="d-flex justify-content-center">
                    <i className="fa-solid fa-edit me-4"></i>
                    <i className="fa-solid fa-trash"></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No tasks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
