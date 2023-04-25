import React, {useMemo} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import * as actions from "../redux/actions";
import Todolist from '../components/TodoList';


const Todo =() => {

    const items=useSelector((state) => state.items);
    const userInput=useSelector((state) => state.userInput);
    const filterType=useSelector((state) => state.filterType);
    const editId = useSelector((state) => state.editId);
    let isLoader=useSelector((state) => state.isLoader);

    const dispatch=useDispatch();

    const handleAdd = (e) => {
        e.preventDefault();
        let obj={
            id:Math.round(Math.random() * 100),
            name:userInput,
            isCompleted:false,
        };
        dispatch(actions.asyncAdd(obj));
    }
    
    const count = items.filter((item) => {
        return item.isCompleted===false;
    }).length;

    let display = useMemo(() => {
      return [...items].filter((item) => {
        if (filterType === "Active") {
          return item.isCompleted === false;
        } else if (filterType === "Completed") {
          return item.isCompleted === true;
        } else {
          return items;
        }
      });
    }, [filterType, items])

    return (
        <div className="parent">
          <div className="title">
            <p id="title">Todo List</p>
          </div>
  
          <div className="outerBox">
            <div className="innerBox">
                <form onSubmit={handleAdd}>
                <input
                  id="input"
                  type="text"
                  autoComplete="off"
                  placeholder="What needs to be done?"
                  value={userInput}
                  onChange={(e)=> dispatch(actions.userInput(e.target.value))}
                />
                </form>
            </div>
            <ul id="list">
            {isLoader===true ? <i className="fa fa-spinner" /> : display.map((data) => {
          return (
            <Todolist
              key={data.id}
              data={data}
              editValue={editId}
              onEdit={(setUpdateValue, data, updateValue) =>
                dispatch(
                  actions.handleEditTodo(setUpdateValue, data, updateValue)
                )
              }
              onDelete={(id)=> dispatch(actions.deleteTodo(id))}
              toggle={(data)=> dispatch(actions.toggleTodo(data))}
            />
          );
        })}
            </ul>
          <div id="box">
            <h4 id="count"><b>{count}</b> items left</h4>
            <div className="filters">
              <button className="button" id="all" onClick={()=> dispatch(actions.setFilterType("All"))}>ALL</button>
              <button className="button"  id="active" onClick={()=> dispatch(actions.setFilterType("Active"))}>ACTIVE</button>
              <button className="button"  id="completed" onClick={()=> dispatch(actions.setFilterType("Completed"))}>COMPLETED</button>
            </div>
            <button id="clearCompleted" onClick={()=> dispatch(actions.handleClearTodo())}>Clear Completed</button>
          </div>
        </div>
      </div>
    );

}

export default Todo;
