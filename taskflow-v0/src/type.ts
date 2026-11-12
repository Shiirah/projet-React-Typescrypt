export type Status = "todo" | "doing" | "done";
export type Priority = 1 | 2 | 3;
export type Filter = "all" | Status;
export type Project = { id: string; name: string; description: string };
export type Task = { id: string; projectId: string; title: string; status: Status; priority: Priority };

// sans id, c'est le serveur qui le cree
export type NewProject = Omit<Project, "id">;
export type NewTask = Omit<Task, "id">;

// reponse de /projects?_embed=tasks
export type ProjectWithTasks = Project & { tasks: Task[] };
// export const MAX_TITLE = 80;

export const STATUS_LABELS: Record<Status, string> = {
  todo: "To Do",
  doing: "Doing",
  done: "Done"
};

export const nextStatus = (s: Status): Status => 
    s === "todo" ? "doing" : s === "doing" ? "done" : "todo";