import { STATUS_LABELS, type Task } from "../type";

type Props = {
    task: Task;
    onCycle: (id: string) => void;
    onRemove: (id: string) => void;
};

export function TaskItem({ task, onCycle, onRemove }: Props) {
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