import React from "react";
import accesHabitat from "../assets/images/accesHabitat.png";
import Promotion from "./Promotion";
import plus from "../assets/icones/plus.png";
import bascule from "../assets/icones/bascule.png";
import interphone from "../assets/icones/interphone.png";

function PageProfilDash(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 13px",
        }}
      >
        <h3 style={{ color: "#65676B", fontSize: "1.06rem" }}>
          Vos Pages et profils
        </h3>
        <img src={plus} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "0 10px",
        }}
      >
        <img
          src={accesHabitat}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "100%",
            border: "1px solid lightgrey",
          }}
        />
        <span>Acces Habitat</span>
      </div>

      <Promotion texte="Basculer sur la Page" image={bascule} />
      <Promotion texte="Créer une promotion" image={interphone} />
    </div>
  );
}

export default PageProfilDash;
