import { STATUS_LABELS, type Task } from "../type";

type Props = {
    task: Task;
    onCycle: (id: string) => void;
    onRemove: (id: string) => void;
};

// "2026-11-20" -> "20/11/2026"
const formatDate = (d: string) => d.split("-").reverse().join("/");

export function TaskItem({ task, onCycle, onRemove }: Props) {
    const today = new Date().toISOString().slice(0, 10);
    // en retard si la date est passee et pas finie
    const late = !!task.dueDate && task.dueDate < today && task.status !== "done";
    return (
        <li className={`task task-item--${task.status}`}>
        <button
            type="button"
            className="task__status"
            onClick={() => onCycle(task.id)}
            title="Passer au statut suivant"
        >
            {STATUS_LABELS[task.status]}
        </button>
        <span className="task__title">{task.title}</span>
        {task.dueDate && (
            <span className={late ? "due due--late" : "due"} title={late ? "En retard" : "Échéance"}>
                {formatDate(task.dueDate)}
            </span>
        )}
        <span className={`prop prio--${task.priority}`}>P{task.priority}</span>
        <button
            type="button"
            className="task__remove"
            onClick={() => onRemove(task.id)}
            aria-label={`Supprimer << ${task.title}>>`}
        >
            ×
        </button>
        </li>
    );
}