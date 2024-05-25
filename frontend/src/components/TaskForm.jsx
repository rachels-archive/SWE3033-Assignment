import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ updateTaskList }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(3); // intial priority: low
  const [status, setStatus] = useState(1); // intial status: not yet started

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !deadline || !priority || !status) {
      alert("Please fill out all required fields");
      return;
    }

    const newTask = {
      task_name: name,
      task_description: description,
      task_deadline: deadline,
      task_priority: priority,
      task_status: status,
      is_active: 1,
    };

    try {
      await axios.post("http://127.0.0.1:8000/createTask/", newTask);

      // Reset the form fields
      setName("");
      setDescription("");
      setDeadline("");
      setPriority(3);
      setStatus(1);

      // Close the form
      handleForm();

      updateTaskList(); // Add this line
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleForm}>
        Add Task <i className="fa-solid fa-plus"></i>
      </button>

      {showForm && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create A New Task</h5>
                <button type="button" className="btn-close" onClick={handleForm}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label  d-flex align-items-center fw-bold">
                      Name
                      <span className="bg-danger text-white rounded ms-2 px-2 py-1 small rounded-pill">Required</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Task Name Here"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label d-flex align-items-center fw-bold">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter Task Description Here"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label  d-flex align-items-center fw-bold">
                      Deadline
                      <span className="bg-danger text-white rounded ms-2 px-2 py-1 small rounded-pill">Required</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label  d-flex align-items-center fw-bold">
                      Priority
                      <span className="bg-danger text-white rounded ms-2 px-2 py-1 small rounded-pill">Required</span>
                    </label>
                    <select
                      className="form-select"
                      value={priority}
                      onChange={(e) => setPriority(parseInt(e.target.value))}
                    >
                      <option value="3">Low</option>
                      <option value="2">Medium</option>
                      <option value="1">High</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label  d-flex align-items-center fw-bold">
                      Status
                      <span className="bg-danger text-white rounded ms-2 px-2 py-1 small rounded-pill">Required</span>
                    </label>
                    <select
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(parseInt(e.target.value))}
                    >
                      <option value="1">Not Yet Started</option>
                      <option value="2">In Progress</option>
                      <option value="3">Completed</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleForm}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
