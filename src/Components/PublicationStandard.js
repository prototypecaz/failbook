import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import cecilePhotos from "../assets/upload/cecileCouverture.jpg";
import plus from "../assets/icones/plus.png";
import pouce from "../assets/icones/pouceBleu.png";
import coeur from "../assets/icones/coeur.png";
import EndHeaderIcone from "./EndHeaderIcone";
import { Link, useParams } from "react-router-dom";
import L from "leaflet";
import { AuthContext } from "../context/AuthContext";
import ModalPersonneCommentaire from "./ModalPersonneCommentaire";

function PublicationStandard({
  profilPhotoUnique,
  nbCommentaire,
  publications,
  setPublications,
  setIdPublication,
  nombreLike,
  commentaires,
  idPublication,
  destination,
  color,
  index,
  lieu,
  humeur,
  identifiedUsers,
  photoUser,
  nameUser,
  date,
  photoPublication,
  description,
  idPhoto,
  idUser,
  nameDestination,
  identifiantUser,
}) {
  const [colorLike, setColorLike] = useState("#606266");
  const [filterPouce, setFilterPouce] = useState(
    "invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(147deg) brightness(94%) contrats(86%)"
  );
  const [imgPouce, setImgPouce] = useState("370px");
  const [allCommentaires, setAllCommentaires] = useState([]);
  const [modalCommentaire, setModalCommentaire] = useState(false);
  const [indexe, setIndexe] = useState(index);
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [valueCommentaire, setValueCommentaire] = useState([]);
  const lieue =
    typeof lieu == "string" && lieu !== "" ? JSON.parse(lieu) : lieu;

  useEffect(() => {
    if (lieue.length > 0 && photoPublication == "none" && color == "") {
      var container = L.DomUtil.get("mapid" + indexe);
      if (container != null) {
        container._leaflet_id = null;
        setIndexe(null);
      }

      const position = lieue[0].geometry.coordinates.reverse();
      let newMap = L.map("mapid" + indexe).setView(position, 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
      }).addTo(newMap);

      const newMarker = L.marker(position)
        .addTo(newMap)
        .bindPopup(lieue[0].properties.city + "," + lieue[0].properties.country)
        .openPopup();

      setMap(newMap);
      setMarker(newMarker);
    }
  }, [description, modalCommentaire]);

  const humeure =
    typeof humeur == "string" && humeur !== "" ? JSON.parse(humeur) : humeur;
  const { currentUser, socket } = useContext(AuthContext);
  const { id } = useParams();
  const jsonTableau = currentUser[1];
  const userInfo = {
    nom: jsonTableau[0]["nom"],
    prenom: jsonTableau[0]["prenom"],
    profilPhoto: jsonTableau[0]["profilPhoto"],
  };

  const handleClicLike = () => {
    if (nombreLike.find((x) => x.id == currentUser[0]) !== undefined) {
      if (idUser !== currentUser[0]) {
        
        socket.emit("dislike", {
          fromUser: currentUser[0],
          idPublication: idPublication,
          type: "like-publication",
          identifiantUser: idUser,
        });
      }

      fetch(
        "http://www.localhost:8000/php/setLikePublications.php?idPublicationDelete=" +
          idPublication +
          "&idUtilisateurDelete=" +
          currentUser[0] +
          "&fromUser=" +
          currentUser[0],
        { credentials: "include" }
      );

      const newTableau = [...publications];
      newTableau.filter((x) => {
        if (x.id == idPublication) {
          const b = JSON.parse(x.likedUsers);
          const u = b.filter((x) => x.id !== currentUser[0]);

          u.length > 0
            ? (x.likedUsers = JSON.stringify(u))
            : (x.likedUsers = null);
        }

        return x;
      });

      setPublications(newTableau);
    } else {
      fetch(
        "http://www.localhost:8000/php/setLikePublications.php?idPublication=" +
          idPublication +
          "&idUtilisateur=" +
          currentUser[0] +
          "&personne=" +
          "test" +
          "&fromUser=" +
          currentUser[0] +
          "&toUser=" +
          idUser +
          "&message=" +
          "test" +
          " aime votre publication" +
          "&type=like-publication",

        { credentials: "include" }
      );

      const newTableau = [...publications];

      newTableau.filter((x) => {
        if (x.id == idPublication) {
          if (x.likedUsers == null) {
            x.likedUsers = '[{"id":' + currentUser[0] + "}]";
          } else {
            const y = JSON.parse(x.likedUsers);
            y.push({ id: currentUser[0] });
            x.likedUsers = JSON.stringify(y);
          }
        }

        return x;
      });

      setPublications(newTableau);

      if (idUser !== currentUser[0]) {
        socket.emit("like", {
          fromUser: currentUser[0],
          identifiantUser: idUser,
          userName: jsonTableau[0]["prenom"] + " " + jsonTableau[0]["nom"],
          idPublication: idPublication,
          userInfo: userInfo,
        });
      }
    }
  };

  useEffect(() => {
    if (
      nombreLike.find((x) => x.id == currentUser[0]) !== undefined &&
      nombreLike.find((x) => x.id == currentUser[0]) !== null
    ) {
      setColorLike("#2078f4");
      setImgPouce("370px");
      setFilterPouce(
        "invert(39%) sepia(57%) saturate(200%) saturate(200%) saturate(200%) saturate(200%) saturate(200%) saturate(147.75%) hue-rotate(202deg) brightness(97%) contrast(96%)"
      );
    } else {
      setColorLike("#606266");
      setImgPouce("389px");
      setFilterPouce(
        "invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(174deg) brightness(94%) contrast(86%)"
      );
    }
  }, [nombreLike]);

  const handleClicCommentaire = () => {
    setModalCommentaire(true);
  };

  const Like = () => {
    return (
      <span
        onClick={handleClicLike}
        style={{
          cursor: "pointer",
          color: colorLike,
          fontWeight: "bold",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <i
          style={{
            backgroundImage:
              ' url("https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/77DWt4rzuTp.png")',
            backgroundPosition: "0px -" + imgPouce,
            backgroundSize: "auto",
            width: "18px",
            height: "18px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
            filter: filterPouce,
          }}
        ></i>
        J'aime
      </span>
    );
  };

  const ContainerNombreLike = () => {
    return (
      <span
        onClick={() => setIdPublication(idPublication)}
        style={{ cursor: "pointer", fontSize: "14px", color: "#606266" }}
      >
        {nombreLike.length}
      </span>
    );
  };

  const NombreCommentaire = () => {
    return (
      <span
        onClick={handleClicCommentaire}
        style={{ fontSize: "15px", color: "#606266" }}
      >
        {nbCommentaire} commentaires
      </span>
    );
  };

  const handleChange = (e) => {};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetch(
        "http://www.localhost:8000/php/setCommentaires.php?idPublication=" +
          idPublication +
          "&idUtilisateur=" +
          currentUser[0] +
          "&contenu=" +
          event.target.value +
          "&date=2022-03-08" +
          "&fromUser=" +
          currentUser[0] +
          "&toUser=" +
          idUser +
          "&personne=" +
          "test",

        { credentials: "include" }
      );

      const currentInfo = currentUser[1][0];
      const userInfo = {
        id: currentInfo.id,
        nom: currentInfo.nom,
        prenom: currentInfo.prenom,
        profilPhoto: profilPhotoUnique,
      };

      const tableauUniqueCom = {
        user_info: userInfo,
        id_utilisateur: currentUser[0],
        contenu_commentaire: event.target.value,
      };

      const copyPublication = [...publications];
      const publication = copyPublication.map((x) => {
        if (x.id == idPublication) {
          if (x.commentaires == null) {
            x.commentaires = JSON.stringify([tableauUniqueCom]);
            x.nbCommentaires = 1;
          } else {
            const pushCommentaire = JSON.parse(x.commentaires);
            pushCommentaire.push(tableauUniqueCom);
            x.commentaires = JSON.stringify(pushCommentaire);
            x.nbCommentaires = x.nbCommentaires + 1;
          }
        }
        return x;
      });

      

      setPublications(publication);

      if (idUser !== currentUser[0]) {
        socket.emit("commentPublication", {
          fromUser: currentUser[0],
          identifiantUser: idUser,
          userName: jsonTableau[0]["prenom"] + " " + jsonTableau[0]["nom"],
          idPublication: idPublication,
          userInfo: userInfo,
        });
      }

      event.target.value = "";
    }
  };

  return (
    <>
      {
        <>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 21px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link to={"/profil/" + idUser}>
                <EndHeaderIcone
                  icone={
                    currentUser[0] == identifiantUser
                      ? profilPhotoUnique
                      : photoUser
                  }
                />
              </Link>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {destination != undefined &&
                    destination != "" &&
                    destination != "undefined" ? (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        {nameUser}
                        <i
                          style={{
                            backgroundImage: `url("https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/PrY22OeojOG.png")`,
                            backgroundPosition: "0px -663px",
                            backgroundSize: "auto",
                            width: "16px",
                            height: "16px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        ></i>{" "}
                        {nameDestination}{" "}
                      </span>
                    ) : (
                      nameUser
                    )}
                  </span>
                  {humeure.length > 0 && (
                    <>
                      {" "}
                      est{" "}
                      <img
                        style={{ width: "25px", height: "25px" }}
                        src={humeure[0]["lien"]}
                      />
                      <span> {humeure[0]["label"]}</span>
                    </>
                  )}
                  {identifiedUsers !== null && identifiedUsers !== "[]" ? (
                    <span>
                      {" "}
                      {humeur.length > 0 ? "" : "est"} avec{" "}
                      <span>
                        {JSON.parse(identifiedUsers).map((x, index) => {
                          return index == 0 ? (
                            <Link
                              key={index}
                              to={"/profil/" + x.id}
                              style={{
                                textDecoration: "none",
                                color: "black",
                                fontWeight: "bold",
                              }}
                            >
                              {" " + x.prenom + " " + x.nom}
                            </Link>
                          ) : (
                            <>
                              <span className="spanUnique"> et</span>{" "}
                              <Link
                                to={"/profil/" + x.id}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  fontWeight: "bold",
                                }}
                              >
                                {x.prenom + " " + x.nom}
                              </Link>
                            </>
                          );
                        })}
                      </span>
                    </span>
                  ) : null}
                  {lieue.length > 0 && (
                    <span>
                      {" "}
                      {humeur.length > 0 ||
                      (identifiedUsers !== null && identifiedUsers !== "[]")
                        ? ""
                        : "est"}{" "}
                      à{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {lieue[0].properties.city}
                      </span>
                    </span>
                  )}
                </div>

                <span style={{ fontSize: "12px" }}>{date}</span>
              </div>
            </div>
            <img src={plus} />
          </div>
          {color == "" && (
            <div style={{ margin: "10px 0", padding: "0 21px" }}>
              {description}
            </div>
          )}
          {photoPublication !== "none" && photoPublication !== "" ? (
            <div>
              <Link to={"/photoUser/" + idPhoto + "/user/" + idUser}>
                <img
                  src={require("../assets/upload/" + photoPublication)}
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
            </div>
          ) : null}
          {lieue.length > 0 && photoPublication == "none" && color == "" ? (
            <div id={"mapid" + indexe} style={{ height: "200px", zIndex: 0 }} />
          ) : null}
          {color !== "" && (
            <div
              style={{
                backgroundColor: color,
                width: "100%",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "13px 0",
                fontSize: "30px",
                wordBreak: "break-word",
              }}
            >
              <p style={{ padding: "10px" }}>{description}</p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 21px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <img style={{ width: "31px" }} src={pouce} />
              <ContainerNombreLike />
            </div>
            <NombreCommentaire />
          </div>
          <div
            style={{
              margin: "12px 0 16px 0",
              width: "100%",
              height: "1px",
              backgroundColor: "#D8DADF",
            }}
          ></div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Like />
            <span
              style={{
                color: "#606266",
                fontWeight: "bold",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <i
                style={{
                  backgroundImage:
                    "url(https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/MQeT9DYW9Fz.png)",
                  backgroundPosition: "0px -305px",
                  backgroundSize: "auto",
                  width: "18px",
                  height: "18px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                }}
              ></i>
              Commenter
            </span>
          </div>
          <div
            style={{
              margin: "12px 0 10px 0",
              width: "100%",
              height: "1px",
              backgroundColor: "#D8DADF",
            }}
          ></div>
          <div style={{ padding: "0 21px", marginBottom: "10px" }}>
            {commentaires.length > 0 &&
              commentaires.map((x, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "100%",
                      }}
                      src={require("../assets/upload/" +
                        (x.id_utilisateur == id
                          ? profilPhotoUnique
                          : x.user_info.profilPhoto))}
                    />
                    <div>
                      <div
                        style={{
                          backgroundColor: "#f0f2f5",
                          padding: " 8px 12px",
                          borderRadius: "18px",
                          width: "93%",
                          wordBreak: "break-word",
                        }}
                      >
                        <span
                          style={{ fontWeight: "bold", fontSize: "12.5px" }}
                        >
                          {x.user_info.prenom + " " + x.user_info.nom}
                        </span>
                        <p style={{ fontSize: "13px" }}>
                          {x.contenu_commentaire}
                        </p>
                      </div>
                      <div
                        style={{
                          fontSize: "11.5px",
                          fontWeight: "bold",
                          display: "flex",
                          gap: "13.5px",
                          marginLeft: "13px",
                          color: "#65676b",
                        }}
                      >
                        <span>J'aime</span>
                        <span>Répondre</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 21px",
              gap: "6px",
            }}
          >
            <img
              style={{ width: "35px", height: "35px", borderRadius: "100%" }}
              src={require("../assets/upload/" + profilPhotoUnique)}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F0F2F5",
                width: "100%",
                borderRadius: "50px",
                padding: "8px",
                justifyContent: "space-between",
              }}
            >
              <textarea
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                placeholder="Ecrivez un commentaire..."
                type="text"
                style={{
                  fontSize: "16px",
                  border: "none",
                  backgroundColor: "#F0F2F5",
                  width: "50%",
                  height: "20px",
                }}
              ></textarea>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <i
                  style={{
                    backgroundImage:
                      "url(https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/MQeT9DYW9Fz.png)",
                    backgroundPosition: "0px -417px",
                    backgroundSize: "auto",
                    width: "16px",
                    height: "16px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
                <i
                  style={{
                    backgroundImage:
                      "url(https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/MQeT9DYW9Fz.png",
                    backgroundPosition: "0px -536px",
                    backgroundSize: "auto",
                    width: "16px",
                    height: "16px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
                <i
                  style={{
                    backgroundImage:
                      "url(https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/MQeT9DYW9Fz.png)",
                    backgroundPosition: "0px -451px",
                    backgroundSize: "auto",
                    width: "16px",
                    height: "16px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
                <i
                  style={{
                    backgroundImage:
                      "url(https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/MQeT9DYW9Fz.png)",
                    backgroundPosition: "0px -587px",
                    backgroundSize: "auto",
                    width: "16px",
                    height: "16px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
                <i
                  style={{
                    backgroundImage:
                      "url(https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/MQeT9DYW9Fz.png)",
                    backgroundPosition: "0px -706px",
                    backgroundSize: "auto",
                    width: "16px",
                    height: "16px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
              </div>
            </div>
          </div>
        </>
      }

      {modalCommentaire && (
        <ModalPersonneCommentaire
          identifiantUser={identifiantUser}
          profilPhotoUnique={profilPhotoUnique}
          setModalCommentaire={setModalCommentaire}
          nbCommentaire={nbCommentaire}
          publications={publications}
          setPublications={setPublications}
          setIdPublication={setIdPublication}
          commentaires={allCommentaires}
          setAllCommentaires={setAllCommentaires}
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
      )}
    </>
  );
}

export default PublicationStandard;
