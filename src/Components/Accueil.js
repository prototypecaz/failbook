import React from "react";
import { Route, Routes } from "react-router-dom";
import ConfirmationEmail from "./ConfirmationEmail";
import ConnexionUsers from "./ConnexionUsers";
import MotDePasseOublié from "./MotDePasseOublié";

function Accueil(props) {
  return (
    <Routes>
      <Route path="/" element={<ConnexionUsers />} />
      <Route path="/confirmationEmail" element={<ConfirmationEmail />}></Route>
      <Route path="/forget" element={<MotDePasseOublié />}></Route>
    </Routes>
  );
}

export default Accueil;
