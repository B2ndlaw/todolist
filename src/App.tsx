import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

export function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
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
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    };

    setTasks([...tasks]);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="What we learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTasksStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}
