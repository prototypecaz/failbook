import React from "react";

function HeaderAccueil(props) {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <img
        style={{ width: "45px" }}
        src={require("../assets/images/logoFacebook.png")}
      />
      <span>v</span>
    </div>
  );
}

export default HeaderAccueil;
