import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import OngletProfil from "./OngletProfil";
import PhotoCouverture from "./PhotoCouverture";
import PhotoProfil from "./PhotoProfil";
import plus from "../assets/icones/plus.png";
import BlocProfil from "./BlocProfil";
import AllPhotosProfil from "./AllPhotosProfil";
import AllAmisProfil from "./AllAmisProfil";
import EcrireMurAmi from "./EcrireMurAmi";
import PublicationStandard from "./PublicationStandard";
import Intro from "./Intro";
import NombreAmi from "./NombreAmi";
import ModalPersonneLike from "./ModalPersonneLike";

function Profil({ setProfilPhotoUnique, profilPhotoUnique }) {
  const { id } = useParams();
  const [profil, setProfil] = useState();
  const [loading, setLoading] = useState(true);
  const [profilPhoto, setProfilPhoto] = useState();
  const [profilCouverture, setProfilCouverture] = useState();
  const { currentUser, socket, idPublication, setIdPublication } =
    useContext(AuthContext);
  const [friend, setFriend] = useState(false);
  const [demande, setDemande] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [publication, setPublication] = useState([]);
  const [loadingPublication, setLoadingPublication] = useState(false);

  useEffect(() => {
    if (profil !== undefined) {
      fetch(
        "http://www.localhost:8000/php/getNotifications.php?deUser=" +
          currentUser[0] +
          "&aUser=" +
          profil[0].id,

        { credentials: "include" }
      ).then(function (response) {
        response.json().then(function (themes) {
          if (themes.length > 0) {
            setDemande(true);
          }
          setLoading(false);
        });
      });
    }
  }, [profil]);

  useEffect(() => {
    if (profil !== undefined) {
      fetch(
        "http://www.localhost:8000/php/getContactProfil.php?id=" +
          currentUser[0] +
          "&token=" +
          profil[0].id,

        { credentials: "include" }
      ).then(function (response) {
        response.json().then(function (themes) {
          
          if (themes.length > 0) {
            setFriend(true);
          } else {
            setFriend(false);
          }
        });
      });
    }
  }, [profil]);

  useEffect(() => {
    socket.on("newUserConnected", ({ userSocketId, userBDD }) => {
      if (userBDD[0].id == id && profil !== undefined) {
        const copyProfil = [...profil];

        copyProfil[0].socketId = userSocketId;

        setProfil(copyProfil);
      }
    });
  }, [profil]);

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getProfil.php?id=" + id,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        
        setProfil(themes);
        setProfilPhoto(themes[0]["profilPhoto"]);
        setProfilCouverture(themes[0]["profilCouverture"]);
      });
    });

    setPublication([]);

    fetch(
      "http://www.localhost:8000/php/getPublication.php?idUser=" + id,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setPublication(themes);
        setLoadingPublication(true);
      });
    });
  }, [id]);

  const handleClick = () => {
    setDemande(true);
    
    socket.emit("demandeAmi", {
      personne: currentUser[1][0].prenom + " " + currentUser[1][0].nom,
      from: currentUser[0],
      to: profil[0].socketId,
      toToken: profil[0].id,
      message: `Vous avez recu une nouvelle demande d'ami de ${currentUser[1][0].prenom} ${currentUser[1][0].nom}`,
      fromUserInfo: '{"profilPhoto":"' + currentUser[1][0].profilPhoto + '"}',
    });
  };

  useEffect(() => {
    socket.on("reponseAmiAccepte", ({ personne }) => {
      setFriend(true);
    });
  }, []);

  return (
    !loading && (
      <>
        <div
          style={{
            background: "linear-gradient(to bottom,#6D7373,#ffffff,#ffffff)",
            borderBottom: "2px solid #DFE1E4",
          }}
        >
          <div style={{ width: "1300px", margin: "0 auto" }}>
            <PhotoCouverture
              setProfilCouverture={setProfilCouverture}
              profilCouverture={profilCouverture}
            />

            <div style={{ padding: "0 43px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "-45px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "end", gap: "25px" }}
                >
                  <PhotoProfil
                    setProfilPhotoUnique={setProfilPhotoUnique}
                    setProfilPhoto={setProfilPhoto}
                    profilPhoto={profilPhoto}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "13px",
                      marginBottom: "15px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "28px" }}>
                      {profil[0].prenom} {profil[0].nom}
                    </span>
                    <NombreAmi />
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "end",
                    marginBottom: "15px",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  {id == currentUser[0] ? (
                    <>
                      <button
                        style={{
                          padding: "6px 15px",
                          border: "none",
                          borderRadius: "5px",
                          backgroundColor: "#1A6ED8",
                          color: "white",
                          fontSize: "16px",
                        }}
                      >
                        + Ajouter a la story{" "}
                      </button>
                      <button
                        style={{
                          padding: "6px 15px",
                          border: "none",
                          borderRadius: "5px",
                          backgroundColor: "#D8DADF",
                          color: "black",
                          fontSize: "16px",
                        }}
                      >
                        Modifier le profil{" "}
                      </button>
                    </>
                  ) : !demande || friend ? (
                    !(profil[0].id == currentUser[0]) && !friend ? (
                      <button onClick={handleClick}>Ajouter comme ami</button>
                    ) : (
                      <span>deja ami</span>
                    )
                  ) : (
                    <span>demande d'ami envoyer</span>
                  )}
                </div>
              </div>

              <div
                style={{
                  margin: "28px 0 0 0",
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#D8DADF",
                }}
              ></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <OngletProfil titre="Publications" />
                  <OngletProfil titre="A propos" />
                  <OngletProfil titre="Amis" />
                  <OngletProfil titre="Photos" />
                  <OngletProfil titre="Vidéos" />
                  <OngletProfil titre="Lieux" />
                  <OngletProfil titre="Plus" />
                </div>
                <button
                  style={{
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    padding: "18px",
                    borderRadius: "5px",
                  }}
                >
                  <img style={{ width: "16px" }} src={plus} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "1215px",
            margin: "18px auto 0 auto",
            display: "flex",
            gap: "20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <BlocProfil padding="21px" large="470px">
              <Intro />
            </BlocProfil>
            <BlocProfil padding="21px" large="470px">
              <AllPhotosProfil />
            </BlocProfil>
            <BlocProfil padding="21px" large="470px">
              <AllAmisProfil />
            </BlocProfil>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <BlocProfil padding="21px" large="656px">
              <EcrireMurAmi
                setPublication={setPublication}
                prenomProfil={profil[0].prenom}
                nomProfil={profil[0].nom}
                profilPhoto={profilPhotoUnique}
              />
            </BlocProfil>
            <BlocProfil padding="10px 21px" large="656px">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Publications
                </span>
                <button
                  style={{
                    padding: "10px 15px",
                    fontSize: "15px",
                    border: "none",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <i
                    style={{
                      backgroundImage:
                        "url(https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/XXxF22lyk4y.png)",
                      backgroundPosition: "0px -126px",
                      backgroundSize: "auto",
                      width: "16px",
                      height: "16px",
                      backgroundRepeat: "no-repeat",
                      display: "inline-block",
                    }}
                  ></i>
                  Filtres
                </button>
              </div>
            </BlocProfil>

            {loadingPublication &&
              publication.map(
                (x, index) =>
                  (x.destination == "" ||
                    x.destination == "undefined" ||
                    x.destination == id ||
                    x.destination == undefined) && (
                    <BlocProfil key={index} padding="10px 0">
                      <PublicationStandard
                        profilPhotoUnique={profilPhotoUnique}
                        nbCommentaire={x.nbCommentaires}
                        publications={publication}
                        setPublications={setPublication}
                        setIdPublication={setIdPublication}
                        idPublication={x.id}
                        commentaires={
                          x.commentaires !== null &&
                          x.commentaires !== undefined
                            ? JSON.parse(x.commentaires)
                            : []
                        }
                        nombreLike={
                          x.likedUsers !== null && x.likedUsers !== undefined
                            ? JSON.parse(x.likedUsers)
                            : []
                        }
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
                        identifiantUser={x.identifiantUser}
                      />
                    </BlocProfil>
                  )
              )}
            {idPublication !== "" ? (
              <ModalPersonneLike
                setIdPublication={setIdPublication}
                idPublication={idPublication}
              />
            ) : null}
          </div>
        </div>
      </>
    )
  );
}

export default Profil;
