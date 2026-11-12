import { useEffect, useState } from 'react'

import './App.css'
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { useLocalStorage } from "./hook/useLocalStorage";

type Status = "todo" | "doing" | "done";
type Task = { id: string; title: string; status: Status; priority: 1 | 2 | 3; };
type Filter = "all" | Status;

export default function App() {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const remaining = tasks.filter((t) => t.status !== "done").length;

  // Synchroniser le titre de l'onglet avec les tâches restantes
  useEffect(() => {
    document.title = remaining > 0 ? `(${remaining}) TaskFlow` : "TaskFlow";
  }, [remaining]);

  const add = (title: string) => {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, status: "todo", priority: 2 }]);
  };
  const cycle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: next(t.status) } : t)));
  };
  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  return (
    <main className="app">
      <h1>TaskFlow <small> {remaining} restante(s)</small></h1>
      <TaskForm onAdd={add} />
      <FilterBar value={filter} onChange={setFilter} />
      <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
    </main>
  );
}
const next = (s: Status): Status => (s === "todo" ? "doing" : s === "doing" ? "done" : "todo");