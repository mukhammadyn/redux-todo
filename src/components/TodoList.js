import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/todoSlice";
import TodoItem from "./TodoItem";

function TodoList() {
  const {todos, delError} = useSelector(state => state.todos)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodos())
  
    return () => null
  }, [dispatch])
  
  return (
    <ul className="todo__list">
      {
        delError ? JSON.parse(localStorage.getItem('todos')).map(todo => (
          <TodoItem key={todo.id} todoName={todo.title} todoId={todo.id} completed={todo.completed}/>
        )) : 
        todos && todos.length > 0 && todos.map(todo => (
          <TodoItem key={todo.id} todoName={todo.title} todoId={todo.id} completed={todo.completed}/>
        ))
      }
    </ul>
  );
}

export default TodoList;
