import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AllNotification from "./AllNotification";
import DemandeDami from "./DemandeDami";
import NombreNotificationsVu from "./NombreNotificationsVu";

function Notification({cacher,nombreNotificationsVu,setNombreNotificationsVu}) {
  const { currentUser, socket } = useContext(AuthContext);
  const [notification, setNotification] = useState([]);
  const [userSocketId, setUserSocketId] = useState("");
  const [userBDD, setUserBDD] = useState([]);

  useEffect(() => {
    const copyNotification = [...notification];
    copyNotification.map((x) => (x.vu = 0));
    setNotification(copyNotification);
  }, [cacher]);

  useEffect(() => {
    socket.on("newUserConnected", ({ userSocketId, userBDD }) => {
      if (userBDD[0].id !== currentUser[3]) {
        setUserBDD(userBDD);
        setUserSocketId(userSocketId);
      }
    });
  }, [socket]);

  useLayoutEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getNotifications.php?toUser=" +
        currentUser[0],

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setNombreNotificationsVu(
          themes.reduce((acc, curr) => acc + curr.vu, 0)
        );

        setNotification(themes);
      });
    });
  }, []);

  useEffect(() => {
    socket.on(
      "reponseDemandeAmi",
      ({ personne, fromUser, message, type, fromUserInfo }) => {
        
        setNotification([
          ...notification,
          { personne, fromUser, message, type, fromUserInfo },
        ]);
        setNombreNotificationsVu((prevstate) => prevstate + 1);
      }
    );

    socket.on(
      "reponseAmiAccepte",
      ({ personne, fromUser, message, type, fromUserInfo }) => {
        
        setNotification([
          ...notification,
          { personne, fromUser, message, type, fromUserInfo },
        ]);
        setNombreNotificationsVu((prevstate) => prevstate + 1);
      }
    );
  }, []);

  useEffect(() => {
    socket.on(
      "envoieLike",
      ({ personne, fromUserInfo, message, idPublication, type, fromUser }) => {
        
        setNotification([
          ...notification,
          { personne, fromUser, fromUserInfo, message, type, idPublication },
        ]);
      }
    );

    socket.on("envoieDislike", ({ fromUser, idPublication, type }) => {
      const notificationFind = notification.find((x) => {
        if (
          x.idPublication == idPublication &&
          fromUser == x.fromUser &&
          type == x.type
        ) {
          return x;
        }
      });

      const indexe = notification.indexOf(notificationFind);

      const notificationFilter = notification.filter(
        (notification, index) => index !== indexe
      );

      setNotification(notificationFilter);
    });

    socket.on(
      "envoieCommentPublication",
      ({ personne, fromUserInfo, message, idPublication, type, fromUser }) => {
        setNotification([
          ...notification,
          { personne, fromUser, fromUserInfo, message, type, idPublication },
        ]);
      }
    );
  }, [notification]);

  return (
    <>
      {cacher && (
        <div
          style={{
            padding: "0 15px 10px 15px",
            borderRadius: "10px",
            width: "360px",
            backgroundColor: "white",
            position: "absolute",
            top: "110%",
            right: "-120%",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxHeight: "600px",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              padding: "17px 2px 5px 2px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: "23px" }}>Notifications</h3>
            <div>
              <i
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/B1muRyTq7W2.png")',
                  backgroundPosition: "-147px -84px",
                  backgroundSize: "auto",
                  width: "20px",
                  height: "20px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                }}
              />
            </div>
          </div>

          {notification.map((x) =>
            x.type == "friend-request" ? (
              <DemandeDami
                setNotification={setNotification}
                newSocketUser={userSocketId}
                newUser={userBDD}
                user={x.fromUser}
                message={x.message}
                fromUserInfo={JSON.parse(x.fromUserInfo)}
                prenomFromUser={x.personne}
              />
            ) : (
              <AllNotification
                message={x.message}
                idPublication={x.idPublication}
                fromUserInfo={JSON.parse(x.fromUserInfo)}
              />
            )
          )}
        </div>
      )}
      <NombreNotificationsVu nombreNotificationsVu={nombreNotificationsVu} />
    </>
  );
}

export default Notification;
