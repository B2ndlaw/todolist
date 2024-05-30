import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { title } from "process";

// export function Counter() {
//   console.log("coonter rendered");
//   let arr = useState(5);
//   let data = arr[0];
//   let setData = arr[1];
//   return (
//     <div
//       onClick={() => {
//         setData(data + 1);
//       }}
//     >
//       {data}
//     </div>
//   );
// }
export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    {
      id: v1(),
      title: "HTML&CSS",
      isDone: true,
    },
    {
      id: v1(),
      title: "JS",
      isDone: true,
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
      />
    </div>
  );
}

export default App;
