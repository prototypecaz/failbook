import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function AllAmisProfil(props) {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [amisCommun, setAmisCommun] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getAmisProfil.php?userOneCommun=" +
        currentUser[0] +
        "&userTwoCommun=" +
        id,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAmisCommun(themes);
        setLoading(false);
      });
    });
  }, [id]);

  return (
    !loading && (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Amis</span>
          <span style={{ color: "#1F7ADC" }}>Tous les amis</span>
        </div>

        <span
          style={{
            margin: "10px 0 15px 0",
            display: "inline-block",
            fontSize: "17px",
            color: "#67676B",
          }}
        >
          {amisCommun.length} {id == currentUser[0] ? "amis" : "amis en commun"}
        </span>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "11px",
            overflow: "hidden",
            justifyContent: "start",
            overflow: "hidden",
          }}
        >
          {amisCommun.map((x, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <img
                  src={require("../assets/upload/" + x.profilPhoto)}
                  style={{
                    width: "148px",
                    height: "148px",
                    borderRadius: "10px",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                >
                  {x.prenom + " " + x.nom}
                </span>
              </div>
            );
          })}
        </div>
      </>
    )
  );
}

export default AllAmisProfil;
