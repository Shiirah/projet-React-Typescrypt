import { useEffect, useState } from 'react'

import './App.css'
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { Card } from './components/Card';
import { FocusTimer } from './components/FocusTimer';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { useLocalStorage } from "./hook/useLocalStorage";
import type { Priority } from "./type";

type Status = "todo" | "doing" | "done";
type Task = { id: string; title: string; status: Status; priority: 1 | 2 | 3; };
type Filter = "all" | Status;

export default function App() {
  return (
    <ThemeProvider>
      <Board />
    </ThemeProvider>
  );
}

function Board() {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const remaining = tasks.filter((t) => t.status !== "done").length;

  // titre onglet
  useEffect(() => {
    document.title = remaining > 0 ? `(${remaining}) TaskFlow` : "TaskFlow";
  }, [remaining]);

  const add = (title: string, priority: Priority) => {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, status: "todo", priority }]);
  };
  const cycle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: next(t.status) } : t)));
  };
  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  return (
    <main className="app">
      <header className="topbar">
        <h1>TaskFlow <small> {remaining} restante(s)</small></h1>
        <ThemeToggle />
      </header>
      <TaskForm onAdd={add} />
      <FilterBar value={filter} onChange={setFilter} />
      <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
      <Card title="Concentration">
        <FocusTimer />
      </Card>
    </main>
  );
}
const next = (s: Status): Status => (s === "todo" ? "doing" : s === "doing" ? "done" : "todo");