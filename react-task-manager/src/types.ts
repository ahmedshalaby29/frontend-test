export type Task = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};
