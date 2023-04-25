export const initialState = {
  items: [],
  userInput: "",
  filterType: "All",
  isLoader: false,
  editId:null,
  updateValue:""
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "userInput":
      return {
        ...state,
        userInput: action.payload,
      };

    case "addTodo":
      return {
        ...state,
        items: [...state.items, action.payload],
        userInput: "",
      };

    case "isLoaderToTrue":
      return {
        ...state,
        isLoader: true,
      };

    case "isLoaderToFalse":
      return {
        ...state,
        isLoader: false,
      };

    case "deleteTodo":
      return {
        ...state,
        items: state.items.filter((data) => data.id !== action.payload.id),
      };

    case "toggleTodo":
      return {
        ...state,
        items: state.items.map((item) => {
          if (action.payload.data.id === item.id) {
            return {
              ...item,
              isCompleted: !action.payload.data.isCompleted,
            };
          } else {
            return item;
          }
        }),
      };

    case "setFilterType":
      return {
        ...state,
        filterType: action.payload,
      };

    case "handleClearTodo":
      return {
        ...state,
        items: state.items.filter((data) => data.isCompleted === false),
      };

    case "updateTodo":
      return {
        ...state,
        updateValue: action.payload.value,
      };

    case "handleEditTodo": {
      const { data } = action.payload;
      if (data.id === state.editId) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (data.id === item.id) {
              return {
                ...item,
                name: state.updateValue,
              };
            }
            return item;
          }),
          editId: null,
        };
      } else {
        return {
          ...state,
          updateValue: data.name,
          editId: data.id,
        };
      }
    }

    default:
      return state;
  }
};

