import React, { useState } from "react";

const TaskForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Date:", date);
    console.log("Priority:", priority);
    console.log("Status:", status);
    handleForm();
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
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Task Name Here"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter Task Description Here"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority:</label>
                    <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                      <option value="">Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Select Status</option>
                      <option value="not started">Not Started</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleForm}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Save Changes
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
