import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions";

function Todolist(props) {
  const dispatch = useDispatch();
  const updateValue = useSelector((state) => state.updateValue);

  const { data, onDelete, toggle, editValue } = props;
  const { id, name, isCompleted } = props.data;
  return (
    <div>
      <li className="listItems">
        <input
          type="checkbox"
          onChange={() => toggle(data)}
          className={isCompleted === true ? "check-completed" : "check"}
          checked={isCompleted}
        />
        {id !== editValue ? (
          <span
            className={isCompleted === true ? "completed" : "not-completed"}
          >
            {name}
          </span>
        ) : (
          <input
            className="input editInput"
            type="text"
            id="input1"
            value={updateValue}
            onChange={(e) => dispatch(actions.updateTodo(e.target.value))}
            autoFocus
          ></input>
        )}
        <div className="btnn">
          <button
            style={{ border: "none" }}
            name="edit"
            className={id === editValue ? "save" : "edit"}
            onClick={() => dispatch(actions.handleEditTodo(data))}
          >
            {id === editValue ? "SAVE" : "EDIT"}
          </button>
          <button id="del" onClick={() => onDelete(id)}>X</button>
        </div>
      </li>
    </div>
  );
}

export default Todolist;
