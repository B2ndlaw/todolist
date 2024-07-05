import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';



export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [key: string]: TaskType[];
};

export function App() {
  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((t) => t.id != id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];

    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
  let tasks = tasksObj[todoListId];
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.title = newTitle;
    setTasks({ ...tasksObj });
  }
}

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]);

  let removeTodoList = (id: string) => {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== id);
    setTodoLists(filteredTodoList);
    delete tasksObj[id];
    setTasks({ ...tasksObj });
  };

  function changeTodoListTitle(id: string, newTitle: string){

  const todoList = todoLists.find(tl=>tl.id===id);
  if(todoList){
    todoList.title = newTitle;
    setTodoLists([...todoLists]);
  }
  }

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        isDone: false,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
      {
        id: v1(),
        title: "ReactJS",
        isDone: false,
      },
      {
        id: v1(),
        title: "Redux",
        isDone: false,
      },
    ],

    [todoListId2]: [
      {
        id: v1(),
        title: "Book",
        isDone: false,
      },
      {
        id: v1(),
        title: "Milk",
        isDone: true,
      },
    ],
  });

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: [],
    });
  }

  return (
    <div className="App">
      <Container fixed>


<Grid container sx={{mb:'30px'}}><AddItemForm addItem={addTodoList} /></Grid>
      
<Grid container spacing={4}>
      {todoLists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
        return (
          <Grid item key={tl.id}>
         <Paper elevation={6} sx={{p:'30px'}}>
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTasksStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}/>
          </Paper>
           </Grid>
        );
      })}
      </Grid>
      </Container>
    </div>

  );
}
