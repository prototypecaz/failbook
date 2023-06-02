import React, { useEffect, useState } from "react";
import BlocProfil from "./BlocProfil";
import PublicationStandard from "./PublicationStandard";
import close from "../assets/images/close.png";

function ModalPersonneCommentaire({
  setAllCommentaires,
  identifiantUser,
  profilPhotoUnique,
  setModalCommentaire,
  nbCommentaire,
  publications,
  setPublications,
  setIdPublication,
  commentaires,
  nombreLike,
  idPublication,
  nameDestination,
  destination,
  color,
  index,
  lieu,
  humeur,
  identifiedUsers,
  idPhoto,
  nameUser,
  date,
  photoPublication,
  photoUser,
  description,
  idUser,
}) {
  const commentairesMap = commentaires.map((element) =>
    JSON.parse(element.result)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getCommentaires.php?idPublication=" +
        idPublication,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAllCommentaires(themes);
        setLoading(false);
      });
    });
  }, [nbCommentaire]);

  
  return (
    !loading && (
      <div
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "rgba(244,244,244,0.8)",
          position: "fixed",
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "0",
          zIndex: "2",
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <h2>Publication de {nameUser}</h2>
            <div
              style={{
                backgroundColor: "#e4e6eb",
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={() => setIdPublication("")}
            >
              <img onClick={() => setModalCommentaire(false)} src={close} />
            </div>
          </div>
          <BlocProfil
            large="682px"
            padding="10px 0"
            maxHeight="700px"
            overflow="scroll"
          >
            <PublicationStandard
              identifiantUser={identifiantUser}
              profilPhotoUnique={profilPhotoUnique}
              nbCommentaire={nbCommentaire}
              publications={publications}
              setPublications={setPublications}
              setIdPublication={setIdPublication}
              commentaires={commentairesMap}
              nombreLike={nombreLike}
              idPublication={idPublication}
              nameDestination={nameDestination}
              destination={destination}
              color={color}
              index={index}
              lieu={lieu}
              humeur={humeur}
              identifiedUsers={identifiedUsers}
              idPhoto={idPhoto}
              nameUser={nameUser}
              date={date}
              photoPublication={photoPublication}
              photoUser={photoUser}
              description={description}
              idUser={idUser}
            />
          </BlocProfil>
        </div>
      </div>
    )
  );
}

export default ModalPersonneCommentaire;
