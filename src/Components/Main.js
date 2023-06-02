import React from "react";
import BlocStart from "./BlocStart";
import BlocMiddle from "./BlocMiddle";
import BlocEnd from "./BlocEnd";
import Header from "./Header";
function Main({ profilPhotoUnique }) {
  return (
    <main style={{ display: "flex" }}>
      <BlocStart profilPhotoUnique={profilPhotoUnique} />
      <BlocMiddle profilPhotoUnique={profilPhotoUnique} />
      <BlocEnd />
    </main>
  );
}

export default Main;
