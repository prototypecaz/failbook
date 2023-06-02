import React, { useContext, useEffect, useRef, useState } from "react";
import EndHeaderIcone from "./EndHeaderIcone";
import IconeEcrireMur from "./IconeEcrireMur";
import { AuthContext } from "../context/AuthContext";
import IdentifierPersonne from "./IdentifierPersonne";
import Humeur from "./Humeur";
import OpenStreetMap from "./OpenStreetMap";
import L from "leaflet";
import EmojiList from "./EmojiList";
import ChooseBackColor from "./ChooseBackColor";
import BackColor from "./BackColor";
import { useParams } from "react-router-dom";

function CreerPublication({
  profilPhoto,
  setModalProfil,
  modalProfil,
  prenomProfil,
  nomProfil,
  setPublication,
  nameDestination,
  photo,
  valueModalParent,
}) {
  const [dragOver, setDragOver] = useState(false);

  const [imageUpload, setImageUpload] = useState("none");
  const [usersChoose, setUsersChoose] = useState([]);
  const [userChooseId, setChooseId] = useState("false");
  const [valueText, setValueText] = useState("");
  const [modalHumeur, setModalHumeur] = useState([]);
  const [valueModal, setValueModal] = useState(valueModalParent);
  const [citiesChoose, setCitiesChoose] = useState([]);
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [modalEmojis, setModalEmojis] = useState(false);
  const [clicColor, setClicColor] = useState(false);
  const [colorChoose, setColorChoose] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const idChoose = usersChoose.map((x) => x.identifiant);

    if (idChoose.length > 0) {
      setChooseId(idChoose.join(","));
    }
  }, [usersChoose]);

  function handleDragOver(event) {
    event.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDragOver(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    const formData = new FormData();
    formData.append("image", files[0]);

    fetch("http://www.localhost:8000/php/setPublication.php", {
      method: "POST",
      body: formData,
    }).then(function (response) {
      response.text().then(function (image) {
        setImageUpload(image);
      });
    });
  }

  const date = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formatter = new Intl.DateTimeFormat("fr-FR", options);

  const aujourdhui = formatter.format(date);

  const { currentUser } = useContext(AuthContext);

  const [description, setDescription] = useState({
    description: "",
  });
  const [blocPhoto, setBlocPhoto] = useState(photo);

  const divRef = useRef();

  const handleClose = () => {
    setModalProfil(false);
  };

  document.onclick = function (e) {
    if (divRef.current !== null) {
      divRef.current == e.target && setModalProfil(false);
    }
  };

  const handleChange = (e) => {
    setValueText(e.target.value);
    setDescription((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }));
  };

  const handleClicPublication = () => {
    if (citiesChoose.length > 0) {
      const { geometry, properties } = citiesChoose[0];
      const newTableau = [{ geometry, properties }];
    }
    let destination = undefined;
    if (currentUser[0] != id) {
      destination = id;
    }

    fetch(
      "http://www.localhost:8000/php/setPublication.php?nameUser=" +
        prenomProfil +
        " " +
        nomProfil +
        "&photoUser=" +
        profilPhoto +
        "&date=" +
        aujourdhui +
        "&photoPublication=" +
        imageUpload +
        "&description=" +
        valueText +
        "&humeur=" +
        JSON.stringify(modalHumeur) +
        "&lieu=" +
        JSON.stringify(citiesChoose) +
        "&color=" +
        colorChoose +
        "&destination=" +
        destination +
        "&nameDestination=" +
        nameDestination +
        "&identifierPersonne=" +
        userChooseId +
        "&idUser=" +
        currentUser[0],
      { credentials: "include" }
    ).then(function (response) {
      response.text().then(function (themes) {
        setPublication((prevState) => {
          const nouvellePublication = {
            id: prevState[0] == undefined ? 1 : prevState[0].id + 1,
            nameUser: prenomProfil + " " + nomProfil,
            photoUser: profilPhoto,
            date: aujourdhui,
            photoPublication: imageUpload,
            identifiedUsers: themes,
            idUser: currentUser[0],
            humeur: modalHumeur,
            lieu: citiesChoose,
            color: colorChoose,
            destination: destination,
            likedUsers: null,
            commentaires: null,
            nameDestination: nameDestination,
            nbCommentaires: 0,
            description: valueText,
          };
          const nouveauTableau = [nouvellePublication, ...prevState];
          return nouveauTableau;
        });

        setModalProfil(false);
      });
    });
  };

  const handleClickPhoto = () => {
    setBlocPhoto(true);
  };

  const handleChangeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    fetch("http://www.localhost:8000/php/setPublication.php", {
      method: "POST",
      body: formData,
    }).then(function (response) {
      response.text().then(function (image) {
        setImageUpload(image);
      });
    });
  };

  const handleClickIdentifierPersonne = () => {
    setValueModal(1);
  };

  const handleClickHumeur = () => {
    setValueModal(2);
  };

  const handleClickJesuisLa = () => {
    setValueModal(3);
  };

  function getResult(value) {
    switch (value) {
      case 1:
        return (
          <IdentifierPersonne
            setValueModal={setValueModal}
            usersChoose={usersChoose}
            setUsersChoose={setUsersChoose}
          />
        );
      case 2:
        return (
          <Humeur
            setValueModal={setValueModal}
            setModalHumeur={setModalHumeur}
          />
        );
      case 3:
        return (
          <OpenStreetMap
            setValueModal={setValueModal}
            setCitiesChoose={setCitiesChoose}
          />
        );
      default:
        return;
    }
  }

  useEffect(() => {
    if (citiesChoose.length > 0 && !blocPhoto && colorChoose == "") {
      
      const position = citiesChoose[0].geometry.coordinates.reverse(); // Coordonnées de Paris
      const newMap = L.map("mapid").setView(position, 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
      }).addTo(newMap);

      const newMarker = L.marker(position)
        .addTo(newMap)
        .bindPopup(
          citiesChoose[0].properties.city +
            "," +
            citiesChoose[0].properties.country
        )
        .openPopup();

      setMap(newMap);
      setMarker(newMarker);

      // Nettoyage de la carte et des marqueurs lorsqu'on détruit le composant
      return () => {
        newMap.remove();
      };
    }
  }, [citiesChoose]);

  const handleClickColor = () => {
    setClicColor(true);
    setColorChoose("red");
  };

  return (
    <div
      ref={divRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(244,244,244,0.8)",
        position: "fixed",
        top: 0,
        zIndex: "2",
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "32%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
          borderRadius: "10px",
        }}
      >
        {valueModal == "" ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #E5E5E5",
                padding: "18px",
              }}
            >
              <h3
                style={{ textAlign: "center", width: "95%", fontSize: "21px" }}
              >
                Créer une publication
              </h3>
              <div
                onClick={handleClose}
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
            <div style={{ display: "flex", gap: "15px", padding: "18px 15px" }}>
              <EndHeaderIcone icone={profilPhoto} />
              <div>
                {usersChoose.length > 0 ? (
                  <span>
                    {" "}
                    {prenomProfil + " " + nomProfil} est{" "}
                    {modalHumeur.length > 0 && (
                      <>
                        <img
                          style={{ width: "25px", height: "25px" }}
                          src={modalHumeur[0]["lien"]}
                        />
                        <span> {modalHumeur[0]["label"]}</span>
                      </>
                    )}{" "}
                    avec
                    {usersChoose.map((x, index) => {
                      if (
                        index >= 0 &&
                        usersChoose.length > 0 &&
                        index < usersChoose.length - 1
                      ) {
                        return " " + x.username + " et ";
                      } else {
                        return " " + x.username;
                      }
                    })}
                    {citiesChoose.length > 0 && (
                      <span> a {citiesChoose[0].properties.city}</span>
                    )}
                  </span>
                ) : (
                  <span>
                    {prenomProfil + " " + nomProfil}{" "}
                    {modalHumeur.length > 0 && (
                      <>
                        est{" "}
                        <img
                          style={{ width: "25px", height: "25px" }}
                          src={modalHumeur[0]["lien"]}
                        />
                        <span> {modalHumeur[0]["label"]}</span>
                      </>
                    )}
                    {citiesChoose.length > 0 && (
                      <span>
                        {" "}
                        est à{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {citiesChoose[0].properties.city}
                        </span>
                      </span>
                    )}
                  </span>
                )}
                <div>Moi uniquement</div>
              </div>
            </div>
            <div style={{ padding: !clicColor ? "0 15px" : "0px" }}>
              <div style={{ position: "relative" }}>
                {clicColor ? (
                  <BackColor
                    colorChoose={colorChoose}
                    value={valueText}
                    setValueText={setValueText}
                  />
                ) : (
                  <textarea
                    id="description"
                    onChange={handleChange}
                    value={valueText}
                    placeholder="Que voulez-vous dire ?"
                    style={{
                      width: "100%",
                      height:
                        blocPhoto || citiesChoose.length > 0 ? "60px" : "154px",
                      fontSize:
                        blocPhoto || citiesChoose.length > 0 ? "16px" : "23px",
                      border: "none",
                      resize: "none",
                      color: "#65676B",
                      outline: "none",
                    }}
                  ></textarea>
                )}
                {citiesChoose.length > 0 && !blocPhoto && colorChoose == "" ? (
                  <div id="mapid" style={{ height: "200px" }} />
                ) : null}
                {blocPhoto ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                      width: "99%",
                      border: "1px solid #CED0D4",
                      borderRadius: "10px",
                    }}
                  >
                    <div style={{ padding: "5px", position: "relative" }}>
                      <div
                        onClick={(e) => {
                          setBlocPhoto(false);
                          e.preventDefault();
                          setImageUpload("none");
                        }}
                        style={{
                          position: "absolute",
                          top: "4%",
                          right: "2%",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                          borderRadius: "100%",
                          boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
                        }}
                      >
                        <i
                          style={{
                            backgroundImage:
                              "url('https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/9mtMHUuH7nj.png')",
                            backgroundPosition: "0px -105px",
                            backgroundSize: "auto",
                            width: "20px",
                            height: "20px",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                          }}
                        ></i>
                      </div>
                      {imageUpload !== "none" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{ width: "100%", borderRadius: "10px" }}
                            src={require("../assets/upload/" + imageUpload)}
                          />
                        </div>
                      ) : (
                        <>
                          <label
                            for="monInput"
                            style={{
                              backgroundColor: "#F7F8FA",
                              height: "200px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: "#D8DADF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "10px",
                                borderRadius: "100%",
                                marginBottom: "5px",
                              }}
                            >
                              <i
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/FUORWl2ZrHy.png")',
                                  backgroundPosition: "0px -83px",
                                  backgroundSize: "auto",
                                  width: "20px",
                                  height: "20px",
                                  backgroundRepeat: "no-repeat",
                                  display: "inline-block",
                                }}
                              ></i>
                            </div>

                            <span style={{ fontSize: "18px" }}>
                              Ajouter des photos/vidéos
                            </span>
                            <span style={{ fontSize: "13px" }}>
                              ou faites glisser-déposer
                            </span>
                          </label>
                          <input
                            onChange={handleChangeImage}
                            type="file"
                            id="monInput"
                            style={{ display: "none" }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ position: "absolute", bottom: 0, width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: !clicColor ? "6px 0" : "15px ",
                      }}
                    >
                      {clicColor ? (
                        <div
                          onClick={() => {
                            setClicColor(false);
                            setColorChoose("");
                          }}
                          style={{
                            padding: "7px",
                            backgroundColor: "#e4e6eb",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "7px",
                          }}
                        >
                          <i
                            style={{
                              backgroundImage:
                                'url("https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/rQp6okZNzWW.png")',
                              backgroundPosition: "-34px -126px",
                              backgroundSize: "auto",
                              width: "16px",
                              height: "16px",
                              backgroundRepeat: "no-repeat",
                              display: "inline-block",
                            }}
                          ></i>
                        </div>
                      ) : (
                        <img
                          onClick={handleClickColor}
                          src={require("../assets/images/chooseColor.png")}
                          style={{ height: "42px", width: "42px" }}
                        />
                      )}
                      {clicColor && (
                        <ChooseBackColor
                          setClicColor={setClicColor}
                          setColorChoose={setColorChoose}
                        />
                      )}
                      <i
                        id="clicEmojis"
                        onClick={() => setModalEmojis(true)}
                        style={{
                          height: "24px",
                          width: "24px",
                          backgroundImage:
                            'url("https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/R9mlcwEIAqG.png")',
                          backgroundPosition: "0px -58px",
                          backgroundSize: "auto",
                          backgroundRepeat: "no-repeat",
                          display: "inline-block",
                        }}
                      ></i>
                    </div>

                    {modalEmojis && (
                      <div style={{ position: "relative" }}>
                        <EmojiList
                          setValueText={setValueText}
                          setModalEmojis={setModalEmojis}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: "15px 15px" }}>
              <div
                style={{
                  border: "1.5px solid #CED0D4",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 18px",
                  borderRadius: "10px",
                }}
              >
                <span>Ajouter à votre publication</span>
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <IconeEcrireMur
                    source="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                    fonction={!clicColor && handleClickPhoto}
                    titre=""
                    styleFilter={
                      clicColor
                        ? "grayscale(1) contrast(0) brightness(1.5)"
                        : null
                    }
                  />
                  <IconeEcrireMur
                    source="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png"
                    fonction={handleClickIdentifierPersonne}
                    titre=""
                  />
                  <IconeEcrireMur
                    source="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                    fonction={handleClickHumeur}
                    titre=""
                  />
                  <IconeEcrireMur
                    source="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png"
                    fonction={handleClickJesuisLa}
                    titre=""
                  />
                  <IconeEcrireMur
                    source="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/pkbalDbTOVI.png"
                    titre=""
                    styleFilter={
                      clicColor
                        ? "grayscale(1) contrast(0) brightness(1.5)"
                        : ""
                    }
                  />
                  <IconeEcrireMur
                    source="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/pkbalDbTOVI.png"
                    titre=""
                    styleFilter={
                      clicColor
                        ? "grayscale(1) contrast(0) brightness(1.5)"
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: "0 15px 15px 15px" }}>
              <button
                onClick={handleClicPublication}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "17px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Publier
              </button>
            </div>
          </>
        ) : (
          getResult(valueModal)
        )}
      </div>
    </div>
  );
}

export default CreerPublication;
