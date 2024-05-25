import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ tasks, setTasks, isLoading }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

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

  const handleChange = (field, value) => {
    switch (field) {
      case "name":
        setEditedName(value);
        break;
      case "description":
        setEditedDescription(value);
        break;
      case "deadline":
        setEditedDeadline(value);
        break;
      case "priority": {
        // Convert priority option to numeric value
        const priorityValue = value === "High" ? 1 : value === "Medium" ? 2 : 3;
        setEditedPriority(priorityValue);
        break;
      }
      case "status": {
        // Convert status option to numeric value
        const statusValue = value === "Not Yet Started" ? 1 : value === "In Progress" ? 2 : 3;
        setEditedStatus(statusValue);
        break;
      }
      default:
        break;
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditedName(task.task_name);
    setEditedDescription(task.task_description);
    setEditedDeadline(task.task_deadline);
    setEditedPriority(task.task_priority);
    setEditedStatus(task.task_status);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTask = {
        ...editingTask,
        task_name: editedName,
        task_description: editedDescription,
        task_deadline: editedDeadline,
        task_priority: editedPriority,
        task_status: editedStatus,
      };

      // Make the PUT request to update the task
      await axios.put(`http://127.0.0.1:8000/updateTask/${editingTask.id}/`, updatedTask);

      // Update the tasks state with the updated task
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === editingTask.id) {
            return updatedTask;
          }
          return task;
        });
      });

      setEditingTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDelete = async (taskId) => {
    try {
      // Show a confirmation dialog
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");

      if (confirmDelete) {
        // Make the DELETE request to remove the task
        await axios.delete(`http://127.0.0.1:8000/deleteTask/${taskId}/`);

        // Update the tasks state by filtering out the deleted task
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUpdatedTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/getTask/");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!editingTask) {
      fetchUpdatedTasks();
    }
  }, [editingTask, setTasks]);

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
                <tr key={taskItem.task_id}>
                  <td>
                    {editingTask === taskItem ? (
                      <input value={editedName} onChange={(e) => handleChange("name", e.target.value)} />
                    ) : (
                      taskItem.task_name
                    )}
                  </td>
                  <td>
                    {editingTask === taskItem ? (
                      <input value={editedDescription} onChange={(e) => handleChange("description", e.target.value)} />
                    ) : taskItem.task_description ? (
                      taskItem.task_description
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {editingTask === taskItem ? (
                      <select
                        value={getStatusText(editedStatus)}
                        onChange={(e) => handleChange("status", e.target.value)}
                      >
                        <option value="Not Yet Started">Not Yet Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      getStatusText(taskItem.task_status)
                    )}
                  </td>
                  <td>
                    {editingTask === taskItem ? (
                      <select
                        value={getPriorityText(editedPriority)}
                        onChange={(e) => handleChange("priority", e.target.value)}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    ) : (
                      getPriorityText(taskItem.task_priority)
                    )}
                  </td>
                  <td>
                    {editingTask === taskItem ? (
                      <input value={editedDeadline} onChange={(e) => handleChange("deadline", e.target.value)} />
                    ) : (
                      formatDate(taskItem.task_deadline)
                    )}
                  </td>

                  <td className="d-flex justify-content-center">
                    {editingTask === taskItem ? (
                      <>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(taskItem)}>Edit</button>
                        <button onClick={() => handleDelete(taskItem.id)}>Delete</button>
                      </>
                    )}
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
