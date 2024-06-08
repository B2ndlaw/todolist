import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTasksStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function TodoList(props: TodoListType) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.charCode === 13) {
      addTask();
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPress}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">Title is required</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(t.id, e.currentTarget.checked);
          };
          const onRemoveHandler = () => props.removeTask(t.id);
          return (
            <li key={t.id} className={t.isDone?"is-done":""}>
              <input
                onChange={onChangeHandler}
                type="checkbox"
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
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
