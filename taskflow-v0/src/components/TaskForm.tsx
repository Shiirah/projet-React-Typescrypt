import { useEffect, useRef, useState } from "react";
import type { Priority } from "../type";

type Props = { onAdd: (title: string, priority: Priority, dueDate?: string) => void };
export function TaskForm({ onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>(2);
    const [dueDate, setDueDate] = useState("");
    const error = title.length > 80 ? "80 caractères minimum" : null;
    const inputRef = useRef<HTMLInputElement>(null);

    // focus au debut
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || error) return;
        // pas de date = undefined
        onAdd(title.trim(), priority, dueDate || undefined);
        setTitle("");
        setDueDate("");
        // refocus apres ajout
        inputRef.current?.focus();
    }
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="new-task" className="sr-only">
                Nouvelle tâche
            </label>
            <input
                id="new-task"
                ref={inputRef}
                value={title}
                placeholder="Nouvelle tâche"
                onChange={(e) => setTitle(e.target.value)}
                aria-invalid={!error}
                aria-describedby="new-task-error"
            />
            <select
                aria-label="Priorité"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value) as Priority)}
            >
                <option value={1}>Haute</option>
                <option value={2}>Moyenne</option>
                <option value={3}>Basse</option>
            </select>
            <input
                type="date"
                aria-label="Échéance"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button disabled={!title.trim() || !!error}>Ajouter</button>
        </form>);}