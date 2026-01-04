import { db } from "../firebase/firebaseConfig";
import { Task } from "../types/types";
import { addTasks, deleteTasks, viewTasks } from "./todoService";

jest.mock("../firebase/firebaseConfig", () => {
  const mockSet = jest.fn().mockResolvedValue(null);
  const mockGet = jest.fn().mockResolvedValue({ exists: true });
  const mockDelete = jest.fn().mockResolvedValue(undefined);

  const mockDoc = {
    id: "1",
    set: mockSet,
    get: mockGet,
    delete: mockDelete,
  };

  const mockCollection = {
    doc: jest.fn((id?: string) => {
      if (id) mockDoc.id = id; 
      else mockDoc.id = "1"; 
      return mockDoc;
    }),
    get: jest.fn().mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            name: "assignment",
            description: "Complete the assignment",
            status: "Pending",
            priority: "Low",
            deadline: "jan5",
          }),
        },
      ],
    }),
  };

  return {
    db: {
      collection: jest.fn(() => mockCollection),
    },
  };
});


describe("Task service", () => {
  const mockTask: Task = {
    name: "assignment",
    description: "complete the assignment",
    status: "Pending",
    priority: "Low",
    deadline: "jan5",  
  };

  let mockCollection: any;
  let mockDoc: any;
  let mockSet: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCollection = (db.collection as jest.Mock)();
    mockDoc = mockCollection.doc();
    mockSet = mockDoc.set;
  });

  test("addTasks should add task", async () => {
    const result = await addTasks(mockTask);
    expect(result.name).toBe("assignment");
    expect(result.description).toBe("complete the assignment");
  });

  test("viewTasks should return all tasks", async () => {
    const tasks = await viewTasks();
    expect(mockCollection.get).toHaveBeenCalled();
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe("assignment");
    expect(tasks[0].status).toBe("Pending");
    expect(tasks[0].id).toBe("1");
  });

  test("deleteTasks should delete an existing task", async () => {
    mockDoc.get.mockResolvedValueOnce({ exists: true });
    await deleteTasks("1");
    expect(mockCollection.doc).toHaveBeenCalledWith("1");
    expect(mockDoc.delete).toHaveBeenCalled();
  });
  
});

