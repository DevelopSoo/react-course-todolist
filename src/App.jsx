import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  // TODO: 데이터 추가, 수정, 삭제 시에도 fetch 로 데이터를 수정해줘야 한다.
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      {
        userId: 1,
        id: Date.now(),
        title: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleIsDone = (id) => {
    setTodos((prev) => {
      // 1. id가 같은 놈을 찾아
      // 2. 그놈만 변경한다
      return prev.map((prevTodo) => {
        if (prevTodo.id === id) {
          return {
            ...prevTodo,
            completed: !prevTodo.completed,
          };
        } else {
          return prevTodo;
        }
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen py-4">
      <div className="mx-auto w-full max-w-96 p-4 flex flex-col gap-4 border min-h-96 rounded-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <form className="flex gap-2" onSubmit={onSubmit}>
            <input
              type="text"
              id="first_name"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="할 일을 입력하세요."
              required
              value={input}
              onChange={handleInput}
            />
            <button
              className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={todo.completed}
              value=""
              onChange={() => toggleIsDone(todo.id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              className={todo.completed ? "line-through" : ""}
              htmlFor="task1"
            >
              {todo.title}
            </label>
            <button
              className="ml-auto p-2 text-xs font-medium text-center inline-flex items-center  rounded-lg hover:bg-slate-200 focus:ring-4 focus:outline-none border "
              size="icon"
              onClick={() => deleteTodo(todo.id)}
            >
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete task</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
