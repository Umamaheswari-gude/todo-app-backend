import { db } from "../firebase/firebaseConfig";
import { Task } from "../types/types";

const tasksCollection = db.collection("todo-app");

export const addTasks = async (task: Task): Promise<Task> => {
  const addTasks = tasksCollection.doc();
  await addTasks.set({ ...task, id: addTasks.id });
  return { ...task, id: addTasks.id };
};

export const viewTasks = async (): Promise<Task[]> => {
  const getTasks = await tasksCollection.get();
  return getTasks.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as Task)
  );
};

export const deleteTasks = async (id: string): Promise<void> => {
  await tasksCollection.doc(id).delete();
};

export const editTasks = async (
  id: string,
  updatedTask: Task
): Promise<Task> => {
  const updateTask = tasksCollection.doc(id);
  await updateTask.set(updatedTask);
  return updatedTask;
};
