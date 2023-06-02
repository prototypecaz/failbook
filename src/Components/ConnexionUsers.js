import React, { useState } from "react";
import ConnexionRecente from "./ConnexionRecente";
import Login from "./Login";
import Register from "./Register";

function ConnexionUsers() {
  const [modalRegister, setModalRegister] = useState(false);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          gap: "9em",
        }}
      >
        <ConnexionRecente />
        <Login setModalRegister={setModalRegister} />
      </div>

      {modalRegister && <Register setModalRegister={setModalRegister} />}
    </div>
  );
}

export default ConnexionUsers;
