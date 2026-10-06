export type Status = "todo" | "doing" | "done";
export type Priority = 1 | 2 | 3;
export type Task = { id: string; title: string; status: Status; priority: Priority };
export type Filter = "all" | Status;
// export const MAX_TITLE = 80;

export const STATUS_LABELS: Record<Status, string> = {
  todo: "To Do",
  doing: "Doing",
  done: "Done"
};

export const nextStatus = (s: Status): Status => 
    s === "todo" ? "doing" : s === "doing" ? "done" : "todo";