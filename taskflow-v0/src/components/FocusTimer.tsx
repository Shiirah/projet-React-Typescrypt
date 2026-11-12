import { useEffect, useState } from "react";

const DURATION = 25 * 60; // 25 min

export function FocusTimer() {
    const [secondsLeft, setSecondsLeft] = useState(DURATION);
    const [running, setRunning] = useState(false);
    const active = running && secondsLeft > 0;

    useEffect(() => {
        if (!active) return;
        const id = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);
        // stop le timer
        return () => clearInterval(id);
    }, [active]);

    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");

    return (
        <div className="timer">
            <span className="timer__time">
                {minutes}:{seconds}
            </span>
            <button
                type="button"
                onClick={() => setRunning(!running)}
                disabled={secondsLeft === 0}
            >
                {active ? "Pause" : "Démarrer"}
            </button>
            <button
                type="button"
                onClick={() => {
                    setRunning(false);
                    setSecondsLeft(DURATION);
                }}
            >
                Réinitialiser
            </button>
        </div>
    );
}
