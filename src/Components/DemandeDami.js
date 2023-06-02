import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function DemandeDami({
  user,
  setNotification,
  newSocketUser,
  newUser,
  message,
  fromUserInfo,
  prenomFromUser,
}) {
  const [accepte, setAccepte] = useState(false);
  const [reponse, setReponse] = useState(false);
  const { currentUser, socket } = useContext(AuthContext);

  const handleClick = () => {
    socket.emit("demandeAmiAccepte", {
      userToken: user,
      id: currentUser[0],
      myIdentifiant: currentUser[0],
      myUsername: currentUser[1][0].prenom + " " + currentUser[1][0].nom,
      fromUserInfo: '{"profilPhoto":"' + currentUser[1][0].profilPhoto + '"}',
    });

    setReponse(true);
    setAccepte(true);

    setNotification((prevState) => {
      const array = prevState.filter((x) => {
        if (x.fromUser == user && x.type == "friend-request") {
          x.message = `Vous avez accepter la demande d'ami de ${x.personne} `;
          x.type = "friend-accept";
        }

        return x;
      });

      return array;
    });
  };

  const handleAnnule = () => {
    setNotification((prevState) => {
      const array = prevState.filter((x) => {
        if (x.fromUser == user && x.type == "friend-request") {
          x.message = `Vous avez refuser la demande d'ami de ${x.personne} `;
          x.type = "friend-accept";
        }

        return x;
      });

      return array;
    });

    fetch(
      "http://www.localhost:8000/php/getNotifications.php?fromUserAnnuleFriend=" +
        user +
        "&toUserAnnuleFriend=" +
        currentUser[0] +
        "&type=friend-request&personne=" +
        prenomFromUser,
      { credentials: "include" }
    );
  };

  return (
    !reponse && (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            style={{ width: "53px", height: "53px", borderRadius: "100%" }}
            src={require("../assets/upload/" + fromUserInfo.profilPhoto)}
          />
          {message !== "" ? (
            <span>{message}</span>
          ) : (
            <span>Demande d'ami de {user[0].prenom}</span>
          )}
          <br />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "5px",
            marginLeft: "62px",
          }}
        >
          <button
            style={{
              padding: "6px 13px",
              backgroundColor: "lightgrey",
              border: "none",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              borderRadius: "8px",
            }}
            className="btnFriend"
            onClick={handleAnnule}
          >
            Annuler
          </button>
          <button
            style={{
              padding: "6px 13px",
              backgroundColor: "#1b74e4",
              border: "none",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            className="btnFriend"
            onClick={handleClick}
          >
            Accepter
          </button>
        </div>
      </div>
    )
  );
}

export default DemandeDami;
