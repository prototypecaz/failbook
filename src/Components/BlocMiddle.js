import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BlocProfil from "./BlocProfil";
import PublicationStandard from "./PublicationStandard";
import EcrireMurAmi from "./EcrireMurAmi";
import ModalPersonneLike from "./ModalPersonneLike";

function BlocMiddle({ profilPhotoUnique }) {
  const [publications, setPublications] = useState([]);
  const { currentUser, idPublication, setIdPublication, socket } = useContext(AuthContext);
  const [loadingPublication, setLoadingPublication] = useState(false);
  const profil = currentUser[1];

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getPublication.php?identifiantUser=" +
        currentUser[0],

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setPublications(themes);
        setLoadingPublication(true);
      });
    });
  }, []);

  return (
    <div
      style={{
        width: "890px",
        padding: "0 50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BlocProfil padding="21px" large="639px">
        <EcrireMurAmi
          setPublication={setPublications}
          prenomProfil={profil[0]["prenom"]}
          nomProfil={profil[0]["nom"]}
          profilPhoto={profilPhotoUnique}
        />
      </BlocProfil>
      {loadingPublication &&
        publications.map((x, index) => (
          <BlocProfil key={index} large="682px" padding="10px 0">
            <PublicationStandard
              nbCommentaire={x.nbCommentaires}
              publications={publications}
              setPublications={setPublications}
              setIdPublication={setIdPublication}
              commentaires={
                x.commentaires !== null && x.commentaires !== undefined
                  ? JSON.parse(x.commentaires)
                  : []
              }
              nombreLike={
                x.likedUsers !== null && x.likedUsers !== undefined
                  ? JSON.parse(x.likedUsers)
                  : []
              }
              idPublication={x.id}
              nameDestination={x.nameDestination}
              destination={x.destination}
              color={x.color}
              index={index}
              lieu={x.lieu}
              humeur={x.humeur}
              identifiedUsers={x.identifiedUsers}
              idPhoto={x.id}
              nameUser={x.nameUser}
              date={x.date}
              photoPublication={x.photoPublication}
              photoUser={x.photoUser}
              description={x.description}
              idUser={x.idUser}
              profilPhotoUnique={profilPhotoUnique}
              identifiantUser={x.identifiantUser}
            />
          </BlocProfil>
        ))}
      {idPublication !== "" ? (
        <ModalPersonneLike
          setIdPublication={setIdPublication}
          idPublication={idPublication}
        />
      ) : null}
    </div>
  );
}

export default BlocMiddle;
