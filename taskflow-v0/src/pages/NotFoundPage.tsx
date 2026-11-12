import { Link } from "react-router";

export function NotFoundPage() {
    return (
        <section>
            <h1>Page introuvable</h1>
            <p className="muted">Cette page ou ce projet n'existe pas.</p>
            <Link to="/">Retour aux projets</Link>
        </section>
    );
}
