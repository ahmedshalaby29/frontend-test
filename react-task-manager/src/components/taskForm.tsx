import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(addTask({ id: Date.now(), title, priority, completed: false }));
    setTitle("");
  };

  return (
    <form
      className="my-5 py-5 flex flex-col md:flex-row items-center gap-4 bg-gray-50 shadow-md p-6 rounded-lg"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full md:w-auto flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <select
        className="w-full md:w-auto flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
