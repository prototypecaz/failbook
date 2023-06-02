import React from "react";

function BlocProfil({ children, large, titre, padding, maxHeight, overflow }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: large,
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        padding: padding,
        borderRadius: "10px",
        marginTop: "15px",
        maxHeight: maxHeight ? maxHeight : "none",
        overflowY: overflow,
      }}
    >
      {children}
    </div>
  );
}

export default BlocProfil;
