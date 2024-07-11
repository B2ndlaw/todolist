import { v1 } from "uuid";
import { FilterValuesType, TaskStateType } from "../App";
import { AddTodoListActionType, RemoveTodoListActionType } from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todoListId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todoListId: string;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  newTitle: string;
  todoListId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todoListId: string;
  status: boolean;
  taskId: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskTitleActionType
  | ChangeTaskStatusActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (
  state: TaskStateType,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todoListId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.status;
      }
      return stateCopy;
    }

    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.newTitle;

      
      }  return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
stateCopy[action.todoListId]=[];
      return stateCopy

    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }

    default:
      throw new Error("I dond understand this action type");
  }
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todoListId, taskId };
};

export const addTaskAC = (
  title: string,
  todoListId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todoListId };
};

export const changeTaskTitleAC = (
  taskId: string,
  newTitle: string,
  todoListId: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todoListId };
};

export const changeTaskStatusAC = (
  taskId: string,
  status: boolean,
  todoListId: string
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", status, todoListId, taskId };
};
