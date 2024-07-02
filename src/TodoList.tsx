import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, ButtonGroup } from "@mui/material";


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
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeTaskTitle: (id: string, todoListId: string, newTitle: string) => void;
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
      <h3>
        <EditableSpan
          title={props.title}
          onChange={changeTodoListTitleHandler}
        />

        <IconButton aria-label="delete" size="small" onClick={removeTodoList}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <List>
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
            <ListItem key={t.id} className={t.isDone ? "is-done" : ""}>
              
              <Checkbox  onChange={onChangeStatusHandler}
           
                checked={t.isDone}/>
            
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />

              <IconButton
                aria-label="delete"
                size="small"
                onClick={onClickHandler}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button color="inherit" variant={props.filter === "all" ? "contained" : "outlined" }  onClick={onAllClickHandler}>All</Button>
      <Button color="primary" variant={props.filter === "active" ? "contained" : "outlined" } onClick={onActiveClickHandler}>Active</Button>
      <Button color="secondary" variant={props.filter === "completed" ? "contained" : "outlined" } onClick={onCompletedClickHandler}>Completed</Button>
       
      </ButtonGroup>
    </div>
  );
}
