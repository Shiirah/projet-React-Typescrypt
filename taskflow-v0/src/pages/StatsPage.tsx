import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import { STATUS_LABELS, type ProjectWithTasks, type Status, type Task } from "../type";
import { Card } from "../components/Card";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";

const STATUSES: Status[] = ["todo", "doing", "done"];

// nb de taches pour un statut
const count = (tasks: Task[], status: Status) => tasks.filter((t) => t.status === status).length;

export function StatsPage() {
    const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;
        api
            .getProjects()
            .then((data) => {
                if (!ignore) setProjects(data);
            })
            .catch(() => {
                if (!ignore) setError("Impossible de charger les statistiques.");
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });
        return () => {
            ignore = true;
        };
    }, []);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    const allTasks = projects.flatMap((p) => p.tasks);

    return (
        <section>
            <h1>Statistiques</h1>

            <Card title="Par statut">
                <ul className="stats-grid">
                    <li className="stat">
                        <span className="stat__value">{allTasks.length}</span>
                        <span className="muted">Total</span>
                    </li>
                    {STATUSES.map((s) => (
                        <li key={s} className={`stat stat--${s}`}>
                            <span className="stat__value">{count(allTasks, s)}</span>
                            <span className="muted">{STATUS_LABELS[s]}</span>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card title="Par projet">
                {projects.length === 0 ? (
                    <p className="empty">Aucun projet.</p>
                ) : (
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Projet</th>
                                {STATUSES.map((s) => (
                                    <th key={s}>{STATUS_LABELS[s]}</th>
                                ))}
                                <th>Progression</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => {
                                const done = count(p.tasks, "done");
                                const percent = p.tasks.length === 0 ? 0 : Math.round((done / p.tasks.length) * 100);
                                return (
                                    <tr key={p.id}>
                                        <td>
                                            <Link to={`/projects/${p.id}`}>{p.name}</Link>
                                        </td>
                                        {STATUSES.map((s) => (
                                            <td key={s}>{count(p.tasks, s)}</td>
                                        ))}
                                        <td>
                                            <div className="progress" aria-label={`${percent} % terminé`}>
                                                <div className="progress__bar" style={{ width: `${percent}%` }} />
                                            </div>
                                            <span className="small">{percent} %</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </Card>
        </section>
    );
}
