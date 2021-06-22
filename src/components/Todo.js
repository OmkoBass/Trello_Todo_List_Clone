import React from "react";

export default function Todo({ todo, style, provided, strike }) {
  const handleReturnAppropriateComponent = () => {
    if (strike) {
      return <strike>{todo}</strike>;
    } else {
      return <p> {todo} </p>;
    }
  };

  return (
    <div
      className="item"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={style}
    >
      {handleReturnAppropriateComponent()}
    </div>
  );
}
