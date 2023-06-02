import socketIO from "socket.io-client";
import React, { useState, useEffect, useContext } from "react";
import AllUsers from "./AllUsers";
import Conversation from "./Conversation";
import { AuthContext } from "../context/AuthContext";
import cam from "../assets/icones/cam.png";
import search from "../assets/icones/search.png";
import plus from "../assets/icones/plus.png";

function ChatUser() {
  const [allUser, setAllUser] = useState([]);
  const { userChoose, setUserChoose } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const { socket, currentUser, allUsers } = useContext(AuthContext);
  const [typing, setTyping] = useState("");
  const [loading, setLoading] = useState(true);

  // récupère les contacts de l'utilisateur depuis la base de données

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getContact.php",

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAllUser(themes);
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    socket.on(
      "newFriendConnected",
      ({ username, profilPhoto, identifiant, idBDD, socketId }) => {
        setAllUser([
          ...allUser,
          { username, profilPhoto, identifiant, idBDD, socketId },
        ]);
      }
    );
  }, [allUser]);

  useEffect(() => {
    socket.on("newUserConnected", ({ userSocketId, userBDD }) => {
      if (currentUser[0] !== userBDD[0].id && allUser.length > 0) {
        const copyAllUser = [...allUser];

        const i = copyAllUser.find((x) => x.identifiant == userBDD[0].id);

        if ([i].length > 0 && i !== undefined) {
          copyAllUser[copyAllUser.indexOf(i)].socketId = userSocketId;

          setAllUser(copyAllUser);
        }
      }
    });
  }, [allUser]);

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getConversation.php?token=" +
        socket["_opts"].query.userId,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setConversation(themes);
      });
    });
  }, []);

  // Detecter frappe clavier
  useEffect(() => {
    socket.on("typingReponse", (data) => {
      setTyping(data);
    });
  }, [socket]);

  // Recupere message privé du serveur
  useEffect(() => {
    socket.on("reponseMessageServer", ({ message, from, to, result }) => {
      if (result.length > 0) {
        setConversation(result);
      } else {
        setConversation([
          ...conversation,
          { message: message, from: from, to: to },
        ]);
      }
    });
  }, [conversation, socket]);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 13px",
            alignItems: "center",
            marginBottom: "17px",
          }}
        >
          <h3 style={{ color: "#65676B", fontSize: "1.06rem" }}>Contacts</h3>
          <div>
            <img src={cam} alt="" />
            <img src={search} alt="" style={{ margin: "0 20px" }} />
            <img src={plus} alt="" />
          </div>
        </div>
        {!loading && (
          <AllUsers setUserChoose={setUserChoose} allUsers={allUser} />
        )}
      </div>
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          display: "flex",
          gap: "10px",
          justifyContent: "end",
          width: "99%",
        }}
      >
        {!loading &&
          allUser.map((x, index) => {
            return (
              x.identifiant !== socket["_opts"].query.userId && (
                <Conversation
                  key={index}
                  typing={typing.from == x.identifiant ? typing : ""}
                  conversation={conversation}
                  socket={socket}
                  idSocket={x.socketId}
                  idIdentifiant={x.identifiant}
                  username={x.username}
                  userChoose={userChoose}
                  setUserChoose={setUserChoose}
                  profilPhoto={x.profilPhoto}
                />
              )
            );
          })}
      </div>
    </>
  );
}

export default ChatUser;
