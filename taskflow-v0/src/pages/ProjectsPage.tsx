import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import type { ProjectWithTasks } from "../type";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";

export function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false; // si on quitte la page avant la reponse
        api
            .getProjects()
            .then((data) => {
                if (!ignore) setProjects(data);
            })
            .catch(() => {
                if (!ignore) setError("Impossible de charger les projets.");
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

    return (
        <section>
            <h1>Projets</h1>
            {projects.length === 0 && <p className="empty">Aucun projet.</p>}
            <ul className="project-grid">
                {projects.map((p) => {
                    const done = p.tasks.filter((t) => t.status === "done").length;
                    return (
                        <li key={p.id}>
                            <Link to={`/projects/${p.id}`} className="project-card">
                                <h2>{p.name}</h2>
                                <p className="muted">{p.description}</p>
                                <p className="small">
                                    {done} / {p.tasks.length} tâche(s) terminée(s)
                                </p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
