import { db } from "../firebase/firebaseConfig";
import { Task } from "../types/types";
import { addTasks, deleteTasks, editTasks, viewTasks } from "./todoService";

jest.mock("../firebase/firebaseConfig", () => {
  const mockSet = jest.fn().mockResolvedValue(null);
  const mockGet = jest.fn().mockResolvedValue({ exists: true });

  const mockDoc = {
    id: "1",
    set: mockSet,
    get: mockGet,
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

});

