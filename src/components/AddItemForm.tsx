import { ChangeEvent, KeyboardEvent, useState } from "react";


type AddItemFormPropsType ={
addItem: (title: string)=>void

}

export function AddItemForm(props: AddItemFormPropsType){
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
    setNewTaskTitle(e.currentTarget.value);}
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.ctrlKey && e.charCode === 13) {
       addTask();
      }
  };
return(
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
)
}