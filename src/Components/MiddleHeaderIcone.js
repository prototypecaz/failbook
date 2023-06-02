import React from "react";

function MiddleHeaderIcone({ icone, to }) {
  return (
    <div
      style={{
        width: "112px",
        height: "57px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "3px",
      }}
    >
      <img src={icone} alt="" style={{ width: "32px" }} />
    </div>
  );
}

export default MiddleHeaderIcone;
