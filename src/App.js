import React, { useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TodoList from "./components/TodoList";

import "./style.css";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: "1",
      todo: "Clean my room",
    },
    {
      id: "2",
      todo: "Take out the trash",
    },
    {
      id: "5",
      todo: "Do the dishes",
    },
    {
      id: "6",
      todo: "Make more money",
    },
    {
      id: "7",
      todo: "Meditate",
    },
    {
      id: "8",
      todo: "Eat a good meal",
    },
  ]);

  const [doneTodos, setDoneTodos] = useState([
    {
      id: "3",
      todo: "Read something useful",
    },
    {
      id: "4",
      todo: "Workout",
    },
  ]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // You can swap card when in the same droppable context
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "todos") {
        const newTodos = reorder(todos, source.index, destination.index);
        setTodos(newTodos);
      } else {
        const newTodos = reorder(doneTodos, source.index, destination.index);
        setDoneTodos(newTodos);
      }
    } else {
      if (source.droppableId === "todos") {
        const result = move(todos, doneTodos, source, destination);

        setTodos(result.todos);
        setDoneTodos(result.todosCompleted);
      } else {
        const result = move(doneTodos, todos, source, destination);

        setTodos(result.todos);
        setDoneTodos(result.todosCompleted);
      }
    }
  };

  return (
    <div className="main">
      <div className="flex-row">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided, snapshot) => (
              <TodoList
                title={"To do"}
                todos={todos}
                provided={provided}
                snapshot={snapshot}
              />
            )}
          </Droppable>

          <Droppable droppableId="todosCompleted">
            {(provided, snapshot) => (
              <TodoList
                title={"Done"}
                todos={doneTodos}
                provided={provided}
                snapshot={snapshot}
                strike={true}
              />
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
