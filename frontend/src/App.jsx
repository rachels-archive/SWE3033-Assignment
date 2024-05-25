import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <nav>
        <h1>Task Manager</h1>
      </nav>

      <TaskForm updateTaskList={updateTaskList} />
      <TaskList tasks={tasks} isLoading={isLoading} setTasks={setTasks} />
    </div>
  );
}

export default App;
