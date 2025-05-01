import { CSSProperties, useCallback } from "react";
import { Input } from "../outer/atomic/atoms/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../outer/atomic/atoms/Button";

type FormTaskProps = {
  createNewTodo: (newTodoValue: string) => void;
  onChangeInputCallback: (newValue: string) => void;
  newTodoValue: string;
  setNewTodoValue: React.Dispatch<React.SetStateAction<string>>;
  style?: CSSProperties;
};

export const FormTask = ({
  createNewTodo,
  onChangeInputCallback,
  newTodoValue,
  setNewTodoValue,
  style,
}: FormTaskProps) => {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newTodoValue) return;
      if (newTodoValue) {
        createNewTodo(newTodoValue.trim());
        window.localStorage.setItem("TasksList", newTodoValue);
        setNewTodoValue("");
      }
    },
    [createNewTodo, newTodoValue, setNewTodoValue]
  );

  return (
    <form
      style={{ ...style }}
      onSubmit={onSubmit}
      className="w-full flex items-center justify-center gap-3"
    >
      <Input
        value={newTodoValue}
        onChange={(e): void => {
          const newValue = (e.target as HTMLInputElement).value;
          onChangeInputCallback(newValue);
          return !newValue ? setNewTodoValue("") : setNewTodoValue(newValue);
        }}
        placeholder="Write a new to-do"
        className="text-2xl rounded-lg md:text-4xl"
      />
      <Button
        title="Save To-Do"
        aria-label="Button save To-Do"
        className="p-2 text-xl rounded-lg md:p-3 md:text-3xl"
      >
        <FontAwesomeIcon icon={faRightLong} />
      </Button>
    </form>
  );
};
