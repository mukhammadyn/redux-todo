import { useDispatch, useSelector } from "react-redux";
import { addText, clearText } from "../store/textSlice";
import { newTodo } from "../store/todoSlice";

function InputField() {
  const text = useSelector(state => state.text.text)
  const dispatch = useDispatch()

  const handleInputChange = (value) => {
    dispatch(addText({text: value}))
  }

  const handleAddButtonClick = () => {
    if(text.trim().length) {
      dispatch(newTodo(
        {
          id: new Date().toISOString(),
          title: text,
          completed: false
        }
      ))
      dispatch(clearText())
    }
  }

  return (
    <label>
      <input
        className="todo__input"
        onChange={(e) => handleInputChange(e.target.value)}
        type="text"
        placeholder="add todo"
        name="todo"
        value={text}
      />
      <button onClick={() => handleAddButtonClick()}>Add</button>
      <button>Add async</button>
    </label>
  );
}

export default InputField
