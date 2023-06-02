import React, { useContext, useState } from "react";
import EndHeaderIcone from "./EndHeaderIcone";
import IconeEcrireMur from "./IconeEcrireMur";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import CreerPublication from "./CreerPublication";

function EcrireMurAmi({
  profilPhoto,
  prenomProfil,
  nomProfil,
  setPublication,
}) {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [modalProfil, setModalProfil] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [valueModalParent, setValueModalParent] = useState("");

  const profil = currentUser[1];

  const handleClickMurProfil = () => {
    setModalProfil(true);
    setPhoto(false);
    setValueModalParent("");
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <EndHeaderIcone icone={profilPhoto} />
        <button
          onClick={handleClickMurProfil}
          style={{
            cursor: "pointer",
            width: "100%",
            backgroundColor: "#F0F2F5",
            border: "none",
            fontSize: "18px",
            color: "#6B676B",
            padding: "11px",
            textAlign: "left",
            borderRadius: "50px",
          }}
        >
          {currentUser[0] == id || id == "" || id == undefined
            ? "Que voulez vous dire ?"
            : `Ecrivez quelque chose à ${prenomProfil} `}
        </button>
      </div>
      {modalProfil && (
        <CreerPublication
          photo={photo}
          valueModalParent={valueModalParent}
          setPublication={setPublication}
          prenomProfil={profil[0]["prenom"]}
          nomProfil={profil[0]["nom"]}
          nameDestination={prenomProfil + " " + nomProfil}
          profilPhoto={profilPhoto}
          setModalProfil={setModalProfil}
          modalProfil={modalProfil}
        />
      )}
      <div
        style={{
          margin: "12px 0 16px 0",
          width: "100%",
          height: "1px",
          backgroundColor: "#D8DADF",
        }}
      ></div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {currentUser[0] == id ? (
          <>
            <IconeEcrireMur
              source="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png"
              titre="Vidéo en direct"
            />
            <IconeEcrireMur
              source="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
              titre="Photo / vidéo"
            />
            <IconeEcrireMur
              source="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/pkbalDbTOVI.png"
              titre="Evènement marquant"
            />
          </>
        ) : (
          <>
            <div
              onClick={() => {
                handleClickMurProfil();
                setPhoto(true);
              }}
            >
              <IconeEcrireMur
                source="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                titre="Photo / vidéo"
              />
            </div>
            <div
              onClick={() => {
                handleClickMurProfil();
                setValueModalParent(1);
              }}
            >
              <IconeEcrireMur
                source="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png"
                titre="Identifier des personnes"
              />
            </div>
            <div
              onClick={() => {
                handleClickMurProfil();
                setValueModalParent(2);
              }}
            >
              <IconeEcrireMur
                source="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                titre="Humeur / activité"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EcrireMurAmi;
