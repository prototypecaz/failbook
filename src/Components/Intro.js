import React, { useContext } from "react";
import IntroBtn from "./IntroBtn";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function Intro(props) {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  return (
    <>
      <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Intro</span>

      {currentUser[3] == id && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            marginTop: "22px",
          }}
        >
          <IntroBtn titre="Ajouter une bio" />
          <IntroBtn titre="Modifier les infos" />
          <IntroBtn titre="Ajouter des loisirs" />
          <IntroBtn titre="Ajouter du contenu à la une" />
        </div>
      )}
    </>
  );
}

export default Intro;
