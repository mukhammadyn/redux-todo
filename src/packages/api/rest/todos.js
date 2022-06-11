import makeRequest from "../makeRequest";

export const getTodos = async () => {
  const res = await makeRequest({
    url: "https://jsonplaceholder.typicode.com/todos?_limit=10",
  });
  if (!res.ok) {
    throw Error("Server error");
  }
  const data = await res.json();
  localStorage.setItem("todos", JSON.stringify(data));
  return data;
};

export const delTodo = async (id) => {
  const res = await makeRequest({
    url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    method: "DELETE",
  });
  if (!res.ok) {
    throw Error("Server error");
  }
};

export const checkTodo = async (id, todo) => {
  const res = await makeRequest({
    url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    method: "PATCH",
    params: {
      body: JSON.stringify({
      completed: !todo.completed
      })
    },
    headers: {'Content-type': 'Application/json; charset=UTF-8'}
  });
  if (!res.ok) {
    throw Error('Server error')
  }
};

export const makeTodo = async (todo) => {

  const res = await makeRequest({
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'POST',
    headers: {'Content-type': 'application/json; charset=UTF-8'},
    params: {
      body: JSON.stringify(todo),
    }
  })

  if(!res.ok) {
    throw new Error('Server error')
  }
}
