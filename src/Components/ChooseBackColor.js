import React, { useState } from "react";

function ChooseBackColor({ setColorChoose, setClicColor }) {
  const tabColor = ["red", "blue", "grey", "yellow", "orange", "green"];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, color, index) => {
    setColorChoose(color);
    setActiveIndex(index);
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {tabColor.map((x, index) => {
        return (
          <div
            key={index}
            onClick={(e) => handleClick(e, x, index)}
            style={{
              padding: "15px",
              backgroundColor: x,
              borderRadius: "7px",
              border:
                activeIndex === index
                  ? "2px solid white"
                  : "1px solid transparent",
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default ChooseBackColor;
