import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRightLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ComponentPropsWithoutRef, Dispatch, FormEvent, useState } from "react";
import { Input } from "./Input";
import { TodoData } from "../../../types";
import { Button } from "./Button";

type TodoProps = {
  todo: TodoData;
  toggleTodo: (todo: TodoData) => void;
  currentId: string;
  fnAllTodos: Dispatch<React.SetStateAction<TodoData[]>>;
} & ComponentPropsWithoutRef<"li">;

export const TodoItem = ({
  todo,
  toggleTodo,
  currentId,
  fnAllTodos,
  ...props
}: TodoProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [newValue, setNewValue] = useState(todo.content);

  const updateTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fnAllTodos((p) =>
      p.filter((c) => (c.id === currentId ? (c.content = newValue) : c.content))
    );
    setShowEditForm(false);
  };

  return (
    <li
      {...props}
      className={`w-full list-none relative px-4 py-2 flex items-center justify-between gap-3 rounded-xl group/todo hover:bg-dark ${
        showEditForm ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {!showEditForm && (
        <label className="w-full flex items-center gap-4 group-hover/todo:bg-transparent">
          <FontAwesomeIcon
            icon={todo.done ? faCheckCircle : faCircle}
            className="text-teal-light"
          />
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo)}
            className="hidden"
          />
          {todo.content}
        </label>
      )}
      {currentId === todo.id && showEditForm && (
        <form
          className="w-full flex items-center gap-2"
          onSubmit={(e) => updateTodo(e)}
        >
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            style={{ fontSize: "20px", padding: "6px 6px" }}
          />
          <Button
            title="Update to-do"
            className="p-1 rounded-full text-base md:text-lg md:p-2 border-none bg-transparent"
          >
            <FontAwesomeIcon icon={faRightLong} />
          </Button>
        </form>
      )}

      <Button
        title="Edit to-do"
        className={`grid place-items-center ${
          currentId === todo.id && showEditForm ? "px-[6px] py-1" : "p-[6px]"
        } rounded-full text-lg ${
          currentId === todo.id && showEditForm
            ? "text-teal-lighter"
            : "text-teal-lighter/20 hover:bg-teal-dark  hover:text-teal-lighter "
        } md:text-lg md:p-2 border-none bg-transparent`}
        onClick={() => setShowEditForm((p) => !p)}
      >
        <FontAwesomeIcon
          icon={currentId === todo.id && showEditForm ? faXmark : faPen}
        />
      </Button>
    </li>
  );
};
