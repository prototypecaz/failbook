import React from "react";

function Pub({ image, texte, lien }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "13px",
        padding: "8px",
      }}
    >
      <img src={image} style={{ width: "131px", borderRadius: "10px" }} />
      <div>
        <span style={{ display: "block", fontSize: "15px" }}>{texte}</span>
        <span style={{ display: "block", fontSize: "13px", color: "#65676B" }}>
          {lien}
        </span>
      </div>
    </div>
  );
}

export default Pub;
