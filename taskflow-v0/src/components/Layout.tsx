import { NavLink, Outlet } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
    return (
        <div className="app">
            <header className="topbar">
                <NavLink to="/" className="brand">
                    TaskFlow
                </NavLink>
                <nav className="nav" aria-label="Navigation principale">
                    <NavLink to="/" end>
                        Projets
                    </NavLink>
                    <NavLink to="/projects/new">Nouveau projet</NavLink>
                    <NavLink to="/stats">Stats</NavLink>
                    <NavLink to="/about">À propos</NavLink>
                </nav>
                <ThemeToggle />
            </header>
            <main>
                {/* la page de l'url s'affiche ici */}
                <Outlet />
            </main>
        </div>
    );
}
