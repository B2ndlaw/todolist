import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.charCode === 13) {
      addTask();
    }
  };
  return (
    <div>
      <TextField error={!!error}  size="small" id="outlined-basic" label={error ? "Title is required" : "Enter a title"} variant="outlined"  value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPress}
        className={error ? "error" : ""}/>
     
      <Button
      color={error?"error":"success"}
        variant="contained"
        style={{
          maxWidth: "40px",
          maxHeight: "40px",
          minWidth: "40px",
          minHeight: "40px",
        }}
        onClick={addTask}
      >
        +
      </Button>


      {/* {error && <div className="error-message">Title is required</div>} */}
    </div>
  );
}
