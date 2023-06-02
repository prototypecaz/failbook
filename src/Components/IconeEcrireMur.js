import React from "react";

function IconeEcrireMur({ source, titre, fonction, styleFilter }) {
  return (
    <span
      onClick={fonction}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#65676B",
      }}
    >
      <img src={source} style={{ filter: styleFilter }} />
      {titre}
    </span>
  );
}

export default IconeEcrireMur;
