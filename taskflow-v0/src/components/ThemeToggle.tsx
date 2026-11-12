import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button type="button" onClick={toggleTheme}>
            {theme === "light" ? "Mode sombre" : "Mode clair"}
        </button>
    );
}
