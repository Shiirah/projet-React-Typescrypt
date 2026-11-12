import type { NewProject, NewTask, Project, ProjectWithTasks, Task } from "./type";

// en ligne : VITE_API_URL (reglee sur vercel), sinon l'api locale
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// garde le code http (pour les 404)
export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(API_URL + path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    // fetch throw pas sur un 404 donc on check
    if (!response.ok) {
        throw new ApiError(response.status, `Erreur ${response.status} sur ${path}`);
    }
    return (await response.json()) as T;
}

export const api = {
    getProjects: () => request<ProjectWithTasks[]>("/projects?_embed=tasks"),
    getProject: (id: string) => request<Project>(`/projects/${id}`),
    createProject: (data: NewProject) =>
        request<Project>("/projects", {
            method: "POST",
            body: JSON.stringify(data),
        }),
    updateProject: (id: string, changes: Partial<NewProject>) =>
        request<Project>(`/projects/${id}`, {
            method: "PATCH",
            body: JSON.stringify(changes),
        }),
    // _dependent=tasks supprime aussi les taches du projet
    deleteProject: (id: string) =>
        request<Project>(`/projects/${id}?_dependent=tasks`, { method: "DELETE" }),
    getTasks: (projectId: string) => request<Task[]>(`/tasks?projectId=${projectId}`),
    createTask: (data: NewTask) =>
        request<Task>("/tasks", {
            method: "POST",
            body: JSON.stringify(data),
        }),
    updateTask: (id: string, changes: Partial<Task>) =>
        request<Task>(`/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify(changes),
        }),
    deleteTask: (id: string) => request<Task>(`/tasks/${id}`, { method: "DELETE" }),
};
