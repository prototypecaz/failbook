import React from "react";

function Promotion({ image, texte }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 25px",
        gap: "13px",
      }}
    >
      <img src={image} />
      <span
        style={{ color: "#65676B", fontSize: "0.8rem", fontWeight: "bold" }}
      >
        {texte}
      </span>
    </div>
  );
}

export default Promotion;
