import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import { FormTask } from "./components/FormTask";
import { TaskItemList } from "./components/TaskItemList";
import { VisibilityControl } from "./components/VisibilityControl";
import { Footer } from "./components/Footer";

export const App = () => {
  const [taskItems, setTaskItems] = useState<
    { content: string; done: boolean }[]
  >([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const createNewTask = (taskContent: string): void => {
    if (!taskItems.find((task) => task.content === taskContent)) {
      setTaskItems([...taskItems, { content: taskContent, done: false }]);
    }
  };

  const toogleTask = (task: any) => {
    setTaskItems(
      taskItems.map((t) =>
        t.content === task.content ? { ...t, done: !t.done } : t
      )
    );
  };

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("TasksList");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("TasksList", JSON.stringify(taskItems));
  }, [taskItems]);

  return (
    <>
      <header style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <h1
          className="title"
          style={{
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "#48c0ac",
            textAlign: "center",
            fontSize: "60px",
          }}
        >
          to-do
        </h1>
      </header>
      <main
        className="wrapper"
        style={{
          margin: "10px auto",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <FormTask createNewTask={createNewTask} />
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: "1",
          }}
        >
          {showCompleted && (
            <TaskItemList
              tasks={taskItems}
              toogleTask={toogleTask}
              showCompleted={showCompleted}
            />
          )}
          <TaskItemList
            tasks={taskItems}
            toogleTask={toogleTask}
            showCompleted={false}
          />
          {/* <VisibilityControl
            isChecked={showCompleted}
            setShowCompleted={(checked: boolean) => setShowCompleted(checked)}
            cleanTasks={cleanTasks}
          /> */}
        </section>
      </main>
      <Footer />
    </>
  );
};
