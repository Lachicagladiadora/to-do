import { Dispatch, useState } from "react";
import { TodoData } from "../types";
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

  const todoUnique = (doneValue: boolean) => {
    return (
      <ul className="min-w-[300px] grid grid-cols-[1fr] gap-2">
        {todos
          .filter((todo: { done: boolean }) => todo.done === doneValue)
          .map((todo: { content: string; done: boolean; id: string }) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              currentId={currentId}
              fnAllTodos={fnAllTodos}
              onClick={() => setCurrentId(todo.id)}
            />
          ))}
      </ul>
    );
  };
  if (!todoUnique)
    return <p className="bg-red-500 text-green-700">you have no tasks done</p>;
  return (
    <div className="wrapper-task w-full">
      <ul>{todoUnique(showCompleted)}</ul>
    </div>
  );
};
