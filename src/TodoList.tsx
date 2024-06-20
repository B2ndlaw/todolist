import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListType = {
  id: string
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTasksStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void
};

export function TodoList(props: TodoListType) {






  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active",props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed",props.id);
const removeTodoList = () => {
props.removeTodoList(props.id)
}

const addTask =(title:string)=>{
props.addTask(title, props.id)

}
  return (
    <div>
      <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onClickHandler = () => props.removeTask(t.id, props.id);
          return (
            <li key={t.id} className={t.isDone?"is-done":""}>
              <input
                onChange={onChangeHandler}
                type="checkbox"
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

