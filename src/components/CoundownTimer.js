import React, { useState, useEffect } from "react";

const Square = ({ filled }) => {
  const squareWidthPercentage = 100 / 9;
  const style = {
    width: `${squareWidthPercentage}%`,
    height: "20px",
    border: "5px solid grey",
    backgroundColor: filled ? "red" : "transparent",
  };
  return <div style={style}></div>;
};

const CountdownTimer = ({ start, canBuzz, setCanBuzz }) => {
  const [squares, setSquares] = useState(Array(9).fill(true));

  useEffect(() => {
    let count = 0;

    let interval;

    if (start) {
      interval = setInterval(() => {
        count++;
        const firstIndex = Math.min(count - 1, squares.length - 1);
        const lastIndex = Math.max(squares.length - count, 0);
        setSquares((prevSquares) => [
          ...prevSquares.slice(0, firstIndex),
          false,
          ...prevSquares.slice(firstIndex + 1, lastIndex),
          false,
          ...prevSquares.slice(lastIndex + 1),
        ]);
        if (count === 5) {
          clearInterval(interval);
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [start, squares.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: squares.includes(true)
          ? null
          : "rgba(237, 237, 237, 0.7)",
        fontWeight: "bold",
        padding: squares.includes(true) ? null : "5px 0px",
      }}
    >
      {squares.includes(true) ? (
        <>
          {squares.map((filled, index) => (
            <Square key={index} filled={filled} />
          ))}
        </>
      ) : (
        <div style={{ color: "#D82B2B" }}>Out of time</div>
      )}
    </div>
  );
};

export default CountdownTimer;
