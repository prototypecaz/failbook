import React from "react";

function NombreMessengerVu({ nombreMessengerVu }) {
  return (
    nombreMessengerVu > 0 && (
      <div
        style={{
          height: "20px",
          width: "20px",
          backgroundColor: "red",
          position: "absolute",
          borderRadius: "100%",
          top: "-20%",
          right: "-10%",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {nombreMessengerVu}
      </div>
    )
  );
}

export default NombreMessengerVu;
