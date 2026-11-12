import { useState, type ChangeEvent, type FormEvent } from "react";
import type { NewProject, Project } from "../type";

type Props = {
    project: Project;
    onSave: (values: NewProject) => Promise<void>;
    onCancel: () => void;
};

export function EditProjectForm({ project, onSave, onCancel }: Props) {
    const [values, setValues] = useState<NewProject>({
        name: project.name,
        description: project.description,
    });
    const [saving, setSaving] = useState(false);

    // meme regles que pour la creation
    const error =
        values.name.trim().length < 3
            ? "Le nom doit contenir au moins 3 caractères."
            : values.description.length > 200
              ? "200 caractères maximum pour la description."
              : null;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (error) return;
        setSaving(true);
        await onSave({ name: values.name.trim(), description: values.description.trim() });
        setSaving(false);
    };

    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
                <label htmlFor="edit-name">Nom du projet</label>
                <input
                    id="edit-name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={!!error}
                    aria-describedby="edit-error"
                />
            </div>
            <div className="field">
                <label htmlFor="edit-description">Description</label>
                <textarea
                    id="edit-description"
                    name="description"
                    rows={3}
                    value={values.description}
                    onChange={handleChange}
                />
            </div>
            {error && (
                <p id="edit-error" className="error">
                    {error}
                </p>
            )}
            <div className="actions">
                <button type="submit" disabled={saving || !!error}>
                    {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
                <button type="button" onClick={onCancel}>
                    Annuler
                </button>
            </div>
        </form>
    );
}
