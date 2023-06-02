import React, { useRef, useState } from "react";

function EndHeaderIcone({ icone, composant, width }) {
  return (
    <div
      style={{
        width: width !== undefined ? width : "40px",
        height: width !== undefined ? width : "40px",
        backgroundColor: "#D8DADF",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img
        src={icone.length > 100 ? icone : require("../assets/upload/" + icone)}
        alt=""
        style={
          !(icone.length > 100)
            ? { width: "100%", height: "100%", borderRadius: "100%" }
            : { width: "20px" }
        }
      />
      {composant}
    </div>
  );
}

export default EndHeaderIcone;
