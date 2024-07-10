import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

export type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

export const todolistsReducer = (
  state: Array<TodoListType>,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.id);
    }

    case "ADD-TODOLIST": {
      return [...state, { id: v1(), title: action.title, filter: "all" }];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }

    default:
      throw new Error("I dond understand this action type");
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
};

export const addTodoListAC = (title: string): AddTodoListActionType => {
  return { type: "ADD-TODOLIST", title: title };
};

export const changeTodoListTitleAC = (
  title: string,
  id: string
): ChangeTodoListTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", title: title, id: id };
};

export const changeTodoListFilterAC = (
  filter: FilterValuesType,
  id: string
): ChangeTodoListFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id };
};
