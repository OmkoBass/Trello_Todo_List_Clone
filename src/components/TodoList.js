import React from "react";

import { Draggable } from "react-beautiful-dnd";

import Todo from "./Todo";

export default function TodoList({ todos, provided, snapshot, title, strike }) {
  return (
    <div className="list">
      <h2>{title}</h2>
      <ul
        style={{
          backgroundColor: snapshot.isDraggingOver ? "#e6bbad" : null,
        }}
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {todos.map(({ id, todo, done }, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => {
              const style = {
                backgroundColor: snapshot.isDragging ? "lightBlue" : "white",
                ...provided.draggableProps.style,
              };

              return (
                <Todo
                  provided={provided}
                  style={style}
                  todo={todo}
                  strike={strike}
                />
              );
            }}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    </div>
  );
}
