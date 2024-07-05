import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import { AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListFilterActionType, ChangeTodoListTitleAC, RemoveTodoListAC, todolistsReducer } from "./todolists-reducer";

test("correct todolist should be removed",()=>{
    let todoListId1 = v1();
    let todoListId2 = v1();
    
   const startState: Array<TodoListType> = [
      { id: todoListId1, title: "What to learn", filter: "all" },
      { id: todoListId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(startState, RemoveTodoListAC(todoListId1))


    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2)

})

test("correct todolist should be added",()=>{
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New TodoList"
    
   const startState: Array<TodoListType> = [
      { id: todoListId1, title: "What to learn", filter: "all" },
      { id: todoListId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(startState, AddTodoListAC(newTodoListTitle))


    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe("all")

})

test("correct todolist should change its name",()=>{
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList"
  
 const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ];


  const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodoListTitle, todoListId2))

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodoListTitle)

})

test("correct filter of todolist should be change",()=>{
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValuesType = "completed"
  
 const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, ChangeTodoListFilterAC(newFilter, todoListId2))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)

})

