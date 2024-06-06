import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ updateTaskList }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(3);
  const [status, setStatus] = useState(1);

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

      // reset form
      setName("");
      setDescription("");
      setDeadline("");
      setPriority(3);
      setStatus(1);

      // close form and update task list
      handleForm();
      updateTaskList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary float-end" onClick={handleForm} style={{ background: "#000", border: "none" }}>
        <i className="fa-solid fa-plus"></i>
      </button>

      {showForm && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content px-3" style={{ background: "#fdd674" }}>
              <div className="modal-header border-0 text-center d-flex justify-content-center">
                <button
                  type="button"
                  className="float-start btn-close  btn-close  bg-danger rounded-circle"
                  onClick={handleForm}
                  style={{ position: "absolute", left: "2rem" }}
                ></button>
                <h4 className="modal-title fw-bold ">Create A New Task</h4>
              </div>
              <div className="modal-body ">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label  d-flex align-items-center fw-bold justify-content-between">
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
                    <label className="form-label  d-flex align-items-center fw-bold justify-content-between">
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
                    <label className="form-label  d-flex align-items-center fw-bold justify-content-between">
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
                    <label className="form-label  d-flex align-items-center fw-bold justify-content-between">
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
              <div className="modal-footer border-0 d-flex justify-content-center">
                <button type="button" className="btn btn-primary " onClick={handleSubmit}>
                  Create
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
