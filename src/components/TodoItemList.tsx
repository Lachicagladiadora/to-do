import { Dispatch, useState } from "react";
import { TodoData } from "../types";
// import { getId } from "../utilities";
import { TodoItem } from "../outer/atomic/atoms/TodoItem";

type TodoItemListProps = {
  todos: TodoData[];
  allTodos: TodoData[];
  toggleTodo: (todo: TodoData) => void;
  showCompleted: boolean;
  fnAllTodos: Dispatch<React.SetStateAction<TodoData[]>>;
};

export const TodoItemList = ({
  todos,

  toggleTodo,
  showCompleted = false,
  fnAllTodos,
}: TodoItemListProps) => {
  const [currentId, setCurrentId] = useState("000000");
  // const [showEditForm, setShowEditForm] = useState(false);

  const todoUnique = (doneValue: boolean) => {
    return (
      <ul
        style={{
          minWidth: "300px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "8px",
        }}
      >
        {todos
          .filter((todo: { done: boolean }) => todo.done === doneValue)
          .map((todo: { content: string; done: boolean; id: string }) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              // key={getId()}
              toggleTodo={toggleTodo}
              // allTodos={todos}
              // showEditForm={showEditForm}
              // fnShowEditForm={setShowEditForm}
              currentId={currentId}
              fnCurrentId={setCurrentId}
              fnAllTodos={fnAllTodos}
              onClick={() => setCurrentId(todo.id)}
            />
          ))}
      </ul>
    );
  };
  if (!todoUnique)
    return (
      <p style={{ background: "red", color: "green" }}>
        you have no tasks done
      </p>
    );
  return (
    <div className="wrapper-task" style={{ width: "100%" }}>
      <ul>{todoUnique(showCompleted)}</ul>
    </div>
  );
};
