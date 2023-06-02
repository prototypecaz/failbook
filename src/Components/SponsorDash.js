import React from "react";
import Pub from "./Pub";
import pub1 from "../assets/images/pub1.jpg";
import pub2 from "../assets/images/pub2.jpg";

function SponsorDash(props) {
  return (
    <div style={{ marginTop: "15px" }}>
      <h3 style={{ padding: "8px", color: "#050505", fontSize: "1.06rem" }}>
        Sponsorisé
      </h3>
      <div>
        <Pub
          image={pub1}
          texte="Osez changer de fond avec Photoshop"
          lien="adobe.com"
        />
        <Pub
          image={pub2}
          texte="Sciences Et Avenir"
          lien="sciencesetavenir.fr"
        />
      </div>
    </div>
  );
}

export default SponsorDash;
