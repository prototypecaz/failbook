import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function ReceptionPhoto({
  photo,
  setModalImport,
  setProfilPhoto,
  setProfilPhotoUnique,
}) {
  const { currentUser } = useContext(AuthContext);

  const handleClick = () => {
    fetch(
      "http://www.localhost:8000/php/getPhotoProfil.php?photoProfil=" +
        photo +
        "&id=" +
        currentUser[0],

      { credentials: "include" }
    ).then(function (response) {
      response.text().then(function (reponse) {
        if (reponse == "success") {
          setModalImport(false);
          setProfilPhoto(photo);
          setProfilPhotoUnique(photo);
        }
      });
    });
  };

  const handleAnnule = () => {
    fetch(
      "http://www.localhost:8000/php/getPhotoProfil.php?photoAnnule=" + photo,

      { credentials: "include" }
    ).then(function (response) {
      response.text().then(function (reponse) {
        if (reponse == "reussis") {
          setModalImport(false);
        }
      });
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 10px",
        }}
      >
        <div></div>
        <h2 style={{ fontSize: "19px", color: "#050505" }}>
          Mettre à jour la photo de profil
        </h2>
        <div
          onClick={handleAnnule}
          style={{
            backgroundColor: "#D8DADF",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            borderRadius: "100%",
          }}
        >
          <i
            style={{
              textAlign: "center",
              width: "20px",
              height: "20px",
              backgroundImage:
                'url("https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/fU_qyUls-jF.png")',
              backgroundPosition: "0 -105px",
              display: "inline-block",
            }}
          ></i>
        </div>
      </div>
      <hr
        style={{
          height: "1px",
          backgroundColor: "#dadde1",
          color: "#dadde1",
          border: "none",
          width: "100%",
          marginBottom: "14px",
        }}
      />

      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <img
          style={{ maxWidth: "400px", maxHeight: "400px" }}
          src={require("../assets/upload/" + photo)}
        />
      </div>

      <div
        style={{
          float: "right",
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          padding: "0 10px",
        }}
      >
        <button
          onClick={handleAnnule}
          style={{
            padding: "8px 15px",
            backgroundColor: "white",
            border: "none",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Annuler
        </button>
        <button
          onClick={handleClick}
          style={{
            padding: "8px 15px",
            backgroundColor: "#1b74e4",
            border: "none",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default ReceptionPhoto;
