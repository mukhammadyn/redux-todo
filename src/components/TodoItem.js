import { useDispatch } from "react-redux";
import { changeTodo, deleteTodo } from "../store/todoSlice";

function TodoItem({todoName, todoId, completed}) {

  const dispatch = useDispatch()

  const handleRemoveTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleCheckTodo = (id) => {
    dispatch(changeTodo(id))
  }

  return (
    <li className="todo__item">
      <label className="todo__item-label">
        <input
          className="todo__checkbox"
          onChange={() => handleCheckTodo(todoId)}
          checked={completed}
          type="checkbox"
          name="isChecked"
          id="todo"
        />
        <span className="todo__name">{todoName}</span>
        <button className="todo__btn" onClick={() => handleRemoveTodo(todoId)}>
          &times;
        </button>
      </label>
    </li>
  );
}

export default TodoItem
