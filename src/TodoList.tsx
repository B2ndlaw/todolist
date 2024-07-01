import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListType = {
  id: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTasksStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  filter: FilterValuesType;
  removeTodoList: (id: string) => void;
  changeTodoListTitle: (id: string, newTitle: string)=>void;
  changeTaskTitle: (id: string, todoListId: string, newTitle: string)=>void;
 
};

export function TodoList(props: TodoListType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitleHandler = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);

  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  return (
    <div>
      <h3><EditableSpan title={props.title} onChange={changeTodoListTitleHandler}/>
       
        <button onClick={removeTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
           const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTasksStatus(t.id, newIsDoneValue, props.id);
          };

          const onChangeTitleHandler = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.id);
          };
         
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                onChange={onChangeStatusHandler}
                type="checkbox"
                checked={t.isDone}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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



