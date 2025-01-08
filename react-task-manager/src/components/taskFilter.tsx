import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filterSlice";
import { Task } from "../types";

const TaskFilter = () => {
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const filter = useSelector(
    (state: { filter: { filter: string } }) => state.filter.filter
  );
  const dispatch = useDispatch();

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

  const handleFilterChange = (newFilter: string) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="flex flex-row items-center gap-4 p-2 lg:p-6 bg-white rounded-lg shadow-md">
      <select
        className="p-2 border rounded-md text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => handleFilterChange(e.target.value)}
        value={filter}
      >
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <p className="text-gray-600">
        Showing <span className="font-semibold">{filteredTasks.length}</span>{" "}
        tasks
      </p>
    </div>
  );
};

export default TaskFilter;
