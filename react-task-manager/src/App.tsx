import TaskFilter from "./components/taskFilter";
import TaskForm from "./components/taskForm";
import TaskList from "./components/taskList";

function App() {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col gap-5 items-center justify-center">
      <h1 className="text-black font-bold text-2xl pt-5">React Task Manager</h1>
      <TaskFilter />
      <TaskList />
      <TaskForm />
    </div>
  );
}

export default App;
