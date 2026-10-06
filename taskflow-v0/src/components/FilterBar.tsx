import type { Filter } from "../type.ts";
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "todo", label: "À faire" },
  { value: "doing", label: "En cours" },
  { value: "done", label: "Terminées" },
];
type Props = { value: Filter; onChange: (f: Filter) => void };
export function FilterBar({ value, onChange }: Props) {
    return (
        <div className="filters" role="group" aria-label="Filtrer les tâches">
            {FILTERS.map((f) => (
                <button
                    key={f.value}
                    type="button"
                    aria-pressed={value === f.value}
                    onClick={() => onChange(f.value)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}