import { useReducer, useState } from 'react'
import './App.css'

const initialState = {
  todos: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        todos: [...state.todos, action.payload]
      };
    case "DELETE_TASK":
      return {
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        )
      };
    default:
      return state;
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const addTodo = () => {
    if (input.trim() == "") {
      setMessage("❌ Please enter a task!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: input
    };
    dispatch({
      type: "ADD_TASK",
      payload: newTodo
    });
    setMessage("Task Added Successfully!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    setInput("");
  };

  return (
    <>
      <div className="todo-container"><h1>TODO</h1>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTodo}>Add</button>

        <ul>
          {state.todos.map((todo) => (
            <li key={todo.id}>{todo.text}
              <button onClick={() => dispatch({
                type: "DELETE_TASK",
                payload: todo.id
              })}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {message && (
        <div className="alert-box">
          {message}
        </div>
      )}
    </>
  )
}

export default App
