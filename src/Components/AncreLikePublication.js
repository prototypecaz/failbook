import React, { useContext, useEffect, useRef, useState } from "react";
import PublicationStandard from "./PublicationStandard";
import { useParams } from "react-router-dom";
import BlocProfil from "./BlocProfil";
import { AuthContext } from "../context/AuthContext";
import ModalPersonneLike from "./ModalPersonneLike";

function AncreLikePublication({ profilPhotoUnique }) {
  const [publication, setPublication] = useState();
  const [loading, setLoading] = useState(true);
  const { idPublicationParams } = useParams();
  const { idPublication, setIdPublication } = useContext(AuthContext);

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }

    fetch(
      "http://www.localhost:8000/php/getPublication.php?idPublication=" +
        idPublicationParams,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        
        setPublication(themes);
        setLoading(false);
      });
    });
  }, [idPublicationParams]);

  return (
    <div
      style={{
        height: `calc(100vh - ${headerHeight}px - 20px)`,
        overflowY: "auto",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      {!loading && (
        <BlocProfil large="682px" padding="10px 0">
          <PublicationStandard
            profilPhotoUnique={profilPhotoUnique}
            setIdPublication={setIdPublication}
            nbCommentaire={publication[0].nbCommentaires}
            publications={publication}
            setPublications={setPublication}
            commentaires={
              publication[0].commentaires !== null &&
              publication[0].commentaires !== undefined
                ? JSON.parse(publication[0].commentaires)
                : []
            }
            nombreLike={
              publication[0].likedUsers !== null &&
              publication[0].likedUsers !== undefined
                ? JSON.parse(publication[0].likedUsers)
                : []
            }
            idPublication={publication[0].id}
            nameDestination={publication[0].nameDestination}
            destination={publication[0].destination}
            color={publication[0].color}
            index={null}
            lieu={publication[0].lieu}
            humeur={publication[0].humeur}
            identifiedUsers={publication[0].identifiedUsers}
            idPhoto={publication[0].id}
            nameUser={publication[0].nameUser}
            date={publication[0].date}
            photoPublication={publication[0].photoPublication}
            photoUser={publication[0].photoUser}
            description={publication[0].description}
            idUser={publication[0].idUser}
            identifiantUser={publication[0].identifiantUser}
          />
        </BlocProfil>
      )}
      {idPublication !== "" ? (
        <ModalPersonneLike
          setIdPublication={setIdPublication}
          idPublication={idPublication}
        />
      ) : null}
    </div>
  );
}

export default AncreLikePublication;
