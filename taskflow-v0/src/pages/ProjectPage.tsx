import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api, ApiError } from "../api";
import { nextStatus, type Filter, type NewProject, type Priority, type Project, type Sort, type Task } from "../type";
import { EditProjectForm } from "../components/EditProjectForm";
import { Card } from "../components/Card";
import { FilterBar } from "../components/FilterBar";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import { NotFoundPage } from "./NotFoundPage";

type Props = { id: string };

export function ProjectPage({ id }: Props) {
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>("all");
    const [sort, setSort] = useState<Sort>("added");
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;
        // projet + taches en meme temps
        Promise.all([api.getProject(id), api.getTasks(id)])
            .then(([p, t]) => {
                if (ignore) return;
                setProject(p);
                setTasks(t);
            })
            .catch((e) => {
                if (ignore) return;
                if (e instanceof ApiError && e.status === 404) setNotFound(true);
                else setError("Impossible de charger le projet.");
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });
        return () => {
            ignore = true;
        };
    }, [id]);

    // d'abord l'api, apres le state
    const add = async (title: string, priority: Priority, dueDate?: string) => {
        try {
            const created = await api.createTask({ projectId: id, title, status: "todo", priority, dueDate });
            setTasks((prev) => [...prev, created]);
        } catch {
            setError("La tâche n'a pas pu être ajoutée.");
        }
    };

    const cycle = async (taskId: string) => {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;
        try {
            const updated = await api.updateTask(taskId, { status: nextStatus(task.status) });
            setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
        } catch {
            setError("La tâche n'a pas pu être modifiée.");
        }
    };

    const remove = async (taskId: string) => {
        try {
            await api.deleteTask(taskId);
            setTasks((prev) => prev.filter((t) => t.id !== taskId));
        } catch {
            setError("La tâche n'a pas pu être supprimée.");
        }
    };

    const saveProject = async (values: NewProject) => {
        try {
            const updated = await api.updateProject(id, values);
            setProject(updated);
            setEditing(false);
            setError(null);
        } catch {
            setError("Le projet n'a pas pu être modifié.");
        }
    };

    const deleteProject = async () => {
        if (!project) return;
        if (!window.confirm(`Supprimer « ${project.name} » et toutes ses tâches ?`)) return;
        try {
            await api.deleteProject(id);
            navigate("/");
        } catch {
            setError("Le projet n'a pas pu être supprimé.");
        }
    };

    if (loading) return <Loading />;
    if (notFound) return <NotFoundPage />;
    if (!project) return <ErrorMessage message={error ?? "Projet indisponible."} />;

    const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
    // tri par echeance : les taches sans date a la fin
    const visible =
        sort === "dueDate"
            ? [...filtered].sort((a, b) => (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999"))
            : filtered;

    return (
        <section>
            <Link to="/" className="small">
                ← Tous les projets
            </Link>
            {editing ? (
                <EditProjectForm project={project} onSave={saveProject} onCancel={() => setEditing(false)} />
            ) : (
                <>
                    <h1>{project.name}</h1>
                    <p className="muted">{project.description}</p>
                    <div className="actions">
                        <button type="button" onClick={() => setEditing(true)}>
                            Modifier
                        </button>
                        <button type="button" className="danger" onClick={deleteProject}>
                            Supprimer
                        </button>
                    </div>
                </>
            )}
            {error && <ErrorMessage message={error} />}
            <Card
                title="Tâches"
                actions={
                    <>
                        <select aria-label="Trier" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                            <option value="added">Ordre d'ajout</option>
                            <option value="dueDate">Échéance</option>
                        </select>
                        <FilterBar value={filter} onChange={setFilter} />
                    </>
                }
            >
                <TaskForm onAdd={add} />
                <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
            </Card>
        </section>
    );
}
