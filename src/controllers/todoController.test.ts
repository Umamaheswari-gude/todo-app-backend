import { addTasks } from "../services/todoService";
import { addTask } from "./todoController";

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
});
