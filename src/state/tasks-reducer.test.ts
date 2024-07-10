import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer";

test("correct task should be delete from correct array", () => {
  const startState: TaskStateType = {
    todoListId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "ReactJS",
        isDone: false,
      },
    ],

    todoListId2: [
      {
        id: "1",
        title: "Book",
        isDone: false,
      },
      {
        id: "2",
        title: "Milk",
        isDone: true,
      },
      {
        id: "3",
        title: "Tea",
        isDone: false,
      },
    ],
  };

  const action = removeTaskAC("2", "todoListId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(2);
  expect(endState["todoListId2"].every((t) => t.id != "2")).toBeTruthy();
  expect(endState["todoListId2"][0].id).toBe("1");
  expect(endState["todoListId2"][1].id).toBe("3");
});

test("correct task should be add from correct array", () => {
  const startState: TaskStateType = {
    todoListId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "ReactJS",
        isDone: false,
      },
    ],

    todoListId2: [
      {
        id: "1",
        title: "Book",
        isDone: false,
      },
      {
        id: "2",
        title: "Milk",
        isDone: true,
      },
      {
        id: "3",
        title: "Tea",
        isDone: false,
      },
    ],
  };

  const action = addTaskAC("new title", "todoListId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe("new title");
  expect(endState["todoListId2"][0].isDone).toBe(false);
});

test("correct change task status should be change from correct array", () => {
  const startState: TaskStateType = {
    todoListId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "ReactJS",
        isDone: false,
      },
    ],

    todoListId2: [
      {
        id: "1",
        title: "Book",
        isDone: false,
      },
      {
        id: "2",
        title: "Milk",
        isDone: true,
      },
      {
        id: "3",
        title: "Tea",
        isDone: false,
      },
    ],
  };

  const action = changeTaskStatusAC("2", false, "todoListId2");

  const endState = tasksReducer(startState, action);


  expect(endState["todoListId2"][1].isDone).toBe(false);
  expect(endState["todoListId1"][1].isDone).toBe(true);

});


test("correct change task status should be change from correct array", () => {
  const startState: TaskStateType = {
    todoListId1: [
      {
        id: "1",
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "ReactJS",
        isDone: false,
      },
    ],

    todoListId2: [
      {
        id: "1",
        title: "Book",
        isDone: false,
      },
      {
        id: "2",
        title: "Milk",
        isDone: true,
      },
      {
        id: "3",
        title: "Tea",
        isDone: false,
      },
    ],
  };
  
  const action = changeTaskTitleAC("2", "change title", "todoListId2");

  const endState = tasksReducer(startState, action);


  expect(endState["todoListId2"][1].title).toBe("change title");
  expect(endState["todoListId1"][1].title).toBe("JS");

});
