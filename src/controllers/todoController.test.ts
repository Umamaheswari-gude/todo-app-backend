import { addTasks, deleteTasks, viewTasks } from "../services/todoService";
import { addTask, deleteTask, viewTask } from "./todoController";

jest.mock("../services/todoService");

describe("addTask", () => {
  let req: any;
  let res: any;

  const mockTask = {
    id: "1",
    name: "assignment",
    description: "complete the assignment",
    status: "Pending",
    priority: "Low",
    deadline: "2025-11-20",
  };

  beforeEach(() => {
    req = { params: { id: "1" }, body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("should create a task and return 201", async () => {
    req.body = mockTask;
    (addTasks as jest.Mock).mockResolvedValue(mockTask);
    await addTask(req, res);
    expect(addTasks).toHaveBeenCalledWith(mockTask);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });

  test("should return 400 if some fields are missing", async () => {
    req.body = { name: "assignment" };
    await addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  test("should return 500 if service throws error", async () => {
    req.body = mockTask;
    (addTasks as jest.Mock).mockRejectedValue(
      new Error("something went wrong")
    );
    await addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to add tasks",
    });
  });

  test("should return all tasks and 200", async () => {
    (viewTasks as jest.Mock).mockResolvedValue([mockTask]);
    await viewTask(req, res);
    expect(viewTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockTask]);
  });

  test("should return 500 if service throws error", async () => {
    (viewTasks as jest.Mock).mockRejectedValue(new Error("fails"));
    await viewTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch tasks",
    });
  });

  test("should delete a task and return 200", async () => {
    (deleteTasks as jest.Mock).mockResolvedValue(undefined);
    await deleteTask(req, res);
    expect(deleteTasks).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task deleted successfully",
    });
  });

  test("should return 500 if delete service throws error", async () => {
    (deleteTasks as jest.Mock).mockRejectedValue(new Error("delete failed"));
    await deleteTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to delete the task",
    });
  });
});
