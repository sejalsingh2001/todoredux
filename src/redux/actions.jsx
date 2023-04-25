export function userInput(value){
    return {
        type:"userInput",
        payload:value
    }
  }
  
  export function addTodo(item) {
    return {
        type:"addTodo",
        payload:item,
    }
  }
  
  export function added () {
    return {
        type:"isLoaderToFalse"
    }
  }
  
  export function asyncAdd(item){
    return (dispatch) => {
        dispatch(isLoader())
        setTimeout(()=> {
            dispatch(addTodo(item))
            dispatch(added())
        },1000)
    }
  }
  
  export function deleteTodo(id) {
    return {
        type:"deleteTodo",
        payload:{id}
    }
  }
  
  export function toggleTodo(data) {
    return {
        type:"toggleTodo",
        payload:{data}
    }
  }
  
  export function isLoader() {
    return {
        type:"isLoaderToTrue"
    }
  }
  
  export function setFilterType(value){
    return {
        type:"setFilterType",
        payload:value
    }
  }
  
  export function handleClearTodo() {
    return {
        type:"handleClearTodo",
    }
  }
  
  export function updateTodo(todo) {
    return {
        type:"updateTodo",
        payload:{value:todo},
    };
  }
  
  export function handleEditTodo(data){
    return {
        type:"handleEditTodo",
        payload:{data}
    }
  }
  