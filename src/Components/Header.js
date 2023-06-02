import React, { useContext, useEffect, useRef, useState } from "react";
import application from "../assets/icones/application.png";
import contact from "../assets/icones/contact.png";
import home from "../assets/icones/home1.png";
import jeu from "../assets/icones/jeu.png";
import market from "../assets/icones/market.png";
import media from "../assets/icones/media.png";
import messenger from "../assets/icones/messenger.png";
import notificatione from "../assets/icones/notification.png";
import MiddleHeaderIcone from "./MiddleHeaderIcone";
import EndHeaderIcone from "./EndHeaderIcone";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SearchUser from "./SearchUser";
import Notification from "./Notification";
import DiscussionMessenger from "./DiscussionMessenger";
import mp3 from "../assets/sound/messenger.mp3";

function Header({ profilPhotoUnique }) {
  const {
    currentUser,
    socket,
    setUserChoose,
    nombreMessengerVu,
    setNombreMessengerVu,
  } = useContext(AuthContext);
  const profilLink = `/profil/${currentUser[0]}`;
  const [cacher, setCacher] = useState(false);
  const [messengerCacher, setMessengerCacher] = useState(false);
  const [photoHeader, setPhotoHeader] = useState(profilPhotoUnique);
  const [nombreNotificationsVu, setNombreNotificationsVu] = useState(0);
  const [loading, setLoading] = useState(true);
  const audio = new Audio(mp3);

  const refs = {
    divRef: useRef(),
    messenger: useRef(),
  };

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getNombreMessengerVu.php?toIdentifiantUser=" +
        currentUser[0],

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setNombreMessengerVu(themes);
        setLoading(false);
        localStorage.setItem("messengerVu", JSON.stringify(themes));
      });
    });
  }, []);

  useEffect(() => {
    socket.on("reponseMessengerVu", ({ from, to, emite, socketId }) => {
      if (!loading && emite == "test") {
        audio.play();
        if (JSON.parse(localStorage.getItem("messengerVu")).length == 0) {
          localStorage.setItem(
            "messengerVu",
            JSON.stringify([
              { fromIdentifiantUser: from, toIdentifiantUser: to },
            ])
          );
        } else {
          const resultat = JSON.parse(localStorage.getItem("messengerVu")).find(
            (x) =>
              x.fromIdentifiantUser == from && x.toIdentifiantUser == to
                ? x
                : undefined
          );

          if (resultat == undefined) {
            const newStorage = JSON.parse(localStorage.getItem("messengerVu"));
            newStorage.push({
              fromIdentifiantUser: from,
              toIdentifiantUser: to,
            });
            localStorage.setItem("messengerVu", JSON.stringify(newStorage));
          }
        }

        setNombreMessengerVu(JSON.parse(localStorage.getItem("messengerVu")));
        setUserChoose({ identifiant: from, idBDD: from, socketId: socketId });
      }
    });
  }, [JSON.parse(localStorage.getItem("messengerVu")), loading]);

  useEffect(() => {
    socket.on("envoieDislikeNombre", ({ vu }) => {
      if (vu == 1) {
        setNombreNotificationsVu((prevstate) => prevstate - 1);
      }
    });

    socket.on("envoieLike", () => {
      setNombreNotificationsVu((prevstate) => prevstate + 1);
    });

    socket.on(
      "envoieCommentPublication",
      ({ personne, fromUserInfo, message, idPublication, type, fromUser }) => {
        setNombreNotificationsVu((prevstate) => prevstate + 1);
      }
    );
  }, []);

  const handleClick = () => {
    setCacher(true);

    fetch(
      "http://www.localhost:8000/php/getNotifications.php?updateVuToUser=" +
        currentUser[0],

      { credentials: "include" }
    );

    setNombreNotificationsVu(0);
  };

  const handleClickMessenger = () => {
    setMessengerCacher(true);
    setNombreMessengerVu([]);
    localStorage.setItem("messengerVu", JSON.stringify([]));
    fetch(
      "http://www.localhost:8000/php/getNombreMessengerVu.php?toIdentifiantUserVu=" +
        currentUser[0],
      { credentials: "include" }
    );
  };

  window.onclick = function (e) {
    if (refs.divRef.current != null) {
      if (
        !refs.divRef.current.contains(e.target) &&
        !(e.target.className == "btnFriend")
      ) {
        setCacher(false);
      }
    }

    if (refs.messenger.current != null) {
      if (!refs.messenger.current.contains(e.target)) {
        setMessengerCacher(false);
      }
    }
  };

  useEffect(() => {
    setPhotoHeader(profilPhotoUnique);
  }, [profilPhotoUnique]);

  

  return (
    <header
      style={{
        boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: "0 15px",
        position: "sticky",
        top: "0",
        zIndex: "1",
      }}
    >
      <SearchUser />

      <div style={{ display: "flex", gap: "25px", marginRight: "147px" }}>
        <MiddleHeaderIcone icone={home} />
        <MiddleHeaderIcone icone={contact} />
        <MiddleHeaderIcone icone={media} />
        <MiddleHeaderIcone icone={market} />
        <MiddleHeaderIcone icone={jeu} />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <EndHeaderIcone icone={application} />
        <div ref={refs["messenger"]} onClick={handleClickMessenger}>
          <EndHeaderIcone
            composant={
              <DiscussionMessenger
                nombreMessengerVu={nombreMessengerVu.length}
                cacher={messengerCacher}
                setMessengerCacher={setMessengerCacher}
              />
            }
            icone={messenger}
          />
        </div>

        <div
          style={{ position: "relative" }}
          ref={refs["divRef"]}
          onClick={handleClick}
        >
          <EndHeaderIcone
            icone={notificatione}
            composant={
              <Notification
                nombreNotificationsVu={nombreNotificationsVu}
                setNombreNotificationsVu={setNombreNotificationsVu}
                cacher={cacher}
              />
            }
          />
        </div>
        <Link to={profilLink}>
          <EndHeaderIcone icone={photoHeader} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
