import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask, toggleCompletion } from "../redux/taskSlice";
import { Task } from "../types";
import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";

const TaskList = () => {
  const filter = useSelector(
    (state: { filter: { filter: String } }) => state.filter
  ).filter;
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks).filter(
    (task) => task.priority === filter || filter === "All"
  );
  const dispatch = useDispatch();

  const [editingTaskId, setEditingTaskId] = useState<number>();
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedPriority, setEditedPriority] = useState<string>("");

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedPriority(task.priority);
  };

  const handleConfirmEdit = () => {
    if (editedTitle.trim() !== "") {
      dispatch(
        editTask({
          id: editingTaskId,
          title: editedTitle,
          priority: editedPriority,
          completed: false,
        })
      );

      // Dispatch an action to update the task title in the Redux store
      setEditingTaskId(0);
      setEditedTitle("");
      setEditedPriority("");
    }
  };

  const handleDismissEdit = () => {
    setEditingTaskId(0);
    setEditedTitle("");
  };

  // Determine the background color based on priority
  const getBackgroundColor = (priority: string, completed: boolean) => {
    if (completed) return "bg-gray-100";
    switch (priority) {
      case "High":
        return "bg-red-100";
      case "Medium":
        return "bg-yellow-100";
      case "Low":
        return "bg-green-100";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="overflow-y-scroll h-5/12">
      {tasks.length > 0 ? (
        <ul className="w-full h-full space-y-4">
          {tasks.map((task: Task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 rounded-md shadow-md ${getBackgroundColor(
                task.priority,
                task.completed
              )}`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleCompletion(task.id))}
                  className="h-5 w-5 accent-blue-500"
                />
                {editingTaskId === task.id ? (
                  <div className="flex items-center  gap-2">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <select
                      className="p-2 border rounded-md text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={(e) => setEditedPriority(e.target.value)}
                      value={editedPriority}
                    >
                      <option value="All">All</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button
                      onClick={handleConfirmEdit}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handleDismissEdit}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <p
                    className={`text-lg truncate  overflow-hidden text-ellipsis ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                    title={task.title}
                  >
                    {task.title}
                    <span className="text-sm text-ellipsis px-2 text-gray-600">
                      ({task.priority})
                    </span>
                  </p>
                )}
              </div>
              {editingTaskId !== task.id ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => dispatch(toggleCompletion(task.id))}
                    className={`p-2 rounded-md ${
                      task.completed
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    title={task.completed ? "Undo Task" : "Complete Task"}
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleEditClick(task)}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    title="Edit Task"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    title="Delete Task"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-center text-xl">
          No tasks set with this priority yet!
        </h1>
      )}
    </div>
  );
};

export default TaskList;
