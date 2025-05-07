import { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faListCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FormTask } from "./components/FormTask";
import { TodoItemList } from "./components/TodoItemList";
import { Footer } from "./components/Footer";
import { TodoData } from "./types";
import { getId } from "./utilities";
import { Button } from "./outer/atomic/atoms/Button";

export const App = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);

  const [query, setQuery] = useState<string>("");
  const [processedTodos, setProcessedTodos] = useState<TodoData[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const createNewTodo = (todoContent: string): void => {
    if (!todos.find((task) => task.content === todoContent)) {
      setTodos([{ id: getId(), content: todoContent, done: false }, ...todos]);
    }
  };

  const toggleTodo = (task: TodoData) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.content === task.content ? { ...t, done: !t.done } : t
      )
    );
  };

  const removeAllCompletedTodos = () => {
    setTodos(todos.filter((task) => !task.done));
    setShowCompleted(false);
  };

  const onFilterNotes = useCallback(
    (query: string) => {
      const filteredNotes = todos.filter((cur) => cur.content.includes(query));
      setProcessedTodos(filteredNotes);
    },
    [todos]
  );

  useEffect(() => {
    onFilterNotes(query);
  }, [query, onFilterNotes]);

  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const data = localStorage.getItem("ToDoList");
    console.log("jiji", { data });
    setTodos(JSON.parse(data ?? "[]"));
  }, []);

  return (
    <div className="h-full flex flex-col">
      <header>
        <h1 className="title">
          <FontAwesomeIcon icon={faListCheck} className="icon-title" /> to - do
        </h1>
      </header>
      <main className="w-full min-h-[64dvh] h-full flex-1 flex flex-col px-4 py-6">
        {/* filter todos */}
        <section className="m-auto h-full max-w-[900px] flex-1 w-full flex flex-col items-center justify-center">
          <FormTask
            createNewTodo={createNewTodo}
            onChangeInputCallback={onFilterNotes}
            newTodoValue={query}
            setNewTodoValue={setQuery}
          />
          {!todos.length && (
            <p className="text-center text-white/50 text-lg px-10 py-5">
              You do not have todos yet
            </p>
          )}
        </section>
        {/* todos options */}
        {todos.length !== 0 && (
          <section className="options-container">
            <div>
              {processedTodos.length !== todos.length && (
                <p className="options-text">
                  You have <strong>{processedTodos.length}</strong> to-dos that
                  start with <strong>"{query}"</strong>
                </p>
              )}
              {processedTodos.length === todos.length && (
                <p className="options-text">You have {todos.length} to-dos</p>
              )}
            </div>
            <div className="container-buttons-options">
              <Button
                onClick={() => setShowCompleted((prev) => !prev)}
                title={showCompleted ? "Hide completed" : "Show completed"}
                aria-label={
                  showCompleted
                    ? "Button hide completed"
                    : "Button show completed"
                }
                className="p-2 rounded-full bg-dark border-none text-lg md:text-2xl md:p-3 hover:text-teal-lighter hover:bg-teal-dark"
              >
                <FontAwesomeIcon icon={showCompleted ? faEyeSlash : faEye} />{" "}
              </Button>
              <Button
                onClick={removeAllCompletedTodos}
                title="Delete completed"
                aria-label="Button delete completed"
                className="p-2 rounded-full bg-dark border-none text-lg md:text-2xl md:p-3 hover:text-teal-lighter hover:bg-teal-dark"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          </section>
        )}
        {/* to-dos */}
        {todos.length !== 0 && (
          <section className="mx-auto flex-1 flex flex-col gap-5 items-center max-w-[900px] w-full text-xl text-white">
            {Boolean(todos.length) && !processedTodos.length && (
              <p>There is no todos with the query you wrote</p>
            )}
            <TodoItemList
              todos={processedTodos}
              allTodos={todos}
              toggleTodo={toggleTodo}
              showCompleted={false}
              fnAllTodos={setTodos}
            />
            {showCompleted && (
              <TodoItemList
                todos={processedTodos}
                allTodos={todos}
                toggleTodo={toggleTodo}
                showCompleted={showCompleted}
                fnAllTodos={setTodos}
              />
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
