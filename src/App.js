import { useSelector } from "react-redux";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

function App() {
  const {status, error} = useSelector(state => state.todos)

  return (
    <div className="App todo">
      <InputField  />

      {status === 'loading' && <h1>Loading...</h1>}
      {error && <div><strong>{error}</strong></div>}
      <TodoList />
    </div>
  );
}

export default App;
