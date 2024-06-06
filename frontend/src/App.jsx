import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import axios from "axios";
import background from "./assets/bg.jpg";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/getTask/");
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/getTask/");
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid full-screen">
      <nav className="text-start">
        <h1 className=" text-warning">
          <strong>Task Manager</strong>
        </h1>
        <p>
          Welcome back, today is <strong>{currDate}</strong>.
        </p>
      </nav>

      <TaskForm updateTaskList={updateTaskList} />
      <TaskList tasks={tasks} isLoading={isLoading} setTasks={setTasks} />
    </div>
  );
}

export default App;
