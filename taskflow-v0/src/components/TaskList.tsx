import type { Task } from "../type";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  onCycle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TaskList({ tasks, onCycle, onRemove }: Props) {
  if (tasks.length === 0) return <p className="empty">Aucune tâche à afficher.</p>;

  return (
    <ul className="tasks">
      {tasks.map((task) => (
        // key stable issue des données, jamais l'index
        <TaskItem key={task.id} task={task} onCycle={onCycle} onRemove={onRemove}/>
      ))}
    </ul>
  );
}