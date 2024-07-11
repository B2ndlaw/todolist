import { TaskStateType, TodoListType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodoListAC, todolistsReducer } from "./todolists-reducer";


test("ids should be equals", ()=>{
  const startTasksState: TaskStateType = {};
const startTodoListsState: Array<TodoListType> = [];

const action = addTodoListAC("new todoList");

const endTasksState = tasksReducer(startTasksState, action);
const endTodoListsState = todolistsReducer(startTodoListsState, action);

const keys = Object.keys(endTasksState);
const idFromTasks = keys[0];
const idFromTodoLists = endTodoListsState[0].id;

expect(idFromTasks).toBe(action.todoListId);
expect(idFromTodoLists).toBe(action.todoListId);
})

