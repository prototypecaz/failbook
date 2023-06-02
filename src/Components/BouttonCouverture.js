import React from "react";
import contact from "../assets/icones/contact.png";

function BouttonCouverture({ titre }) {
  return (
    <button
      style={{
        backgroundColor: "white",
        border: "none",
        padding: "10px 0",
        textAlign: "left",
        fontSize: "15.5px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img src={contact} />
      {titre}
    </button>
  );
}

export default BouttonCouverture;
