import React from "react";

function IntroBtn({ titre }) {
  return (
    <button
      style={{
        width: "100%",
        padding: "8px 0",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
      }}
    >
      {titre}
    </button>
  );
}

export default IntroBtn;
