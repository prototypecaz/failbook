// ETAPE 1: Déployer le fichier server.js
// ETAPE 2: Ecouter le client (connecté) coter front (line 11: Page.js)
// ETAPE 3: Ecoute du client connecté coter server (détermine qui c'est) (line 28 : server.js)
// ETAPE 4: Ecoute du nouveau message du client (coter front) au server.js  (line 21 : Conversation.js)
// ETAPE 5 : Ecoute/Reception du message du client coter server (line 34 : server.js)
// ETAPE 6: Envoie du message réception coter server au client (line 37: server.js)
// ETAPE 7: Ecoute/Reception du message coter client (line 39: Page.js)

const express = require("express");
require('dotenv').config()
const app = express();
const PORT = 4000;
const mysql = require("mysql");
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const database = mysql.createConnection({
  host: process.env.DB_HOSTSERVER,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// cette methode nous permet de fournir le memem id au meme utilisateur ( si il ouvre plusieur fenetre il envoie et recois dans chacun de c'est fe,netre)

let allUser = [];

//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log('ok')
  database.query(
    "UPDATE contact SET socketId = '" + socket.id + "' WHERE identifiant = ?",
    [socket.handshake.query.userId],
    (error, result) => {}
  );

  database.query(
    "UPDATE users SET socketId = '" + socket.id + "' WHERE id = ?",
    [socket.handshake.query.userId],
    (error, result) => {}
  );

  socket.customId = socket.id;


  database.query(
    " SELECT * FROM users WHERE id = ?",
    [socket.handshake.query.userId],
    (error, result) => {
      socketIO.emit("newUserConnected", {
        userSocketId: socket.id,
        userBDD: result,
      });
    }
  );

  socket.on(
    "like",
    ({ identifiantUser, userName, idPublication, userInfo, fromUser }) => {
      database.query(
        "SELECT socketId FROM users WHERE id = ? ",
        [identifiantUser],
        (error, result) => {

          socketIO
            .to(result[0].socketId)
            .emit("envoieLike", {
              personne: userName,
              fromUser: fromUser,
              fromUserInfo: JSON.stringify(userInfo),
              message: userName + " aime votre publication",
              idPublication: idPublication,
              type: "like-publication",
            });
        }
      );
    }
  );

  socket.on("dislike", ({ fromUser, idPublication, type, identifiantUser }) => {
    
    database.query(
      "SELECT socketId FROM users WHERE id = ? ",
      [identifiantUser],
      (error, result) => {
        socketIO
          .to(result[0].socketId)
          .emit("envoieDislike", { fromUser, idPublication, type });
        database.query(
          "SELECT * FROM notifications WHERE idPublication = ? and fromUser = ? and toUser = ? and type= ? ",
          [idPublication, fromUser, identifiantUser, type],
          (error, resulte) => {
            
            socketIO
              .to(result[0].socketId)
              .emit("envoieDislikeNombre", { vu: resulte[0].vu });
          }
        );
      }
    );
  });

  socket.on(
    "commentPublication",
    ({ identifiantUser, userName, idPublication, userInfo, fromUser }) => {
      database.query(
        "SELECT socketId FROM users WHERE id = ? ",
        [identifiantUser],
        (error, result) => {
          socketIO
            .to(result[0].socketId)
            .emit("envoieCommentPublication", {
              personne: userName,
              fromUser: fromUser,
              fromUserInfo: JSON.stringify(userInfo),
              message: userName + " a commenter votre publication",
              idPublication: idPublication,
              type: "comment-publication",
            });
        }
      );
    }
  );

  socket.on("typing", ({ message, to, from }) => {
    socket.to(to).emit("typingReponse", { message: message, from: from });
  });

  database.query(
    "SELECT * FROM conversation WHERE fromToken=? OR toToken=? ",
    [socket.handshake.query.userId, socket.handshake.query.userId],
    (error, result) => {
      socketIO.to(socket.id).emit("reponseMessageServer", { result });
    }
  );

  socket.on("newMessageForServer", ({ text, to, from, toIdBdd }) => {
    database.query(
      "INSERT INTO conversation (id,message,fromToken,toToken) VALUES (?,?,?,?)",
      [null, text, from, toIdBdd],
      (error, result) => {}
    );

    database.query(
      "SELECT * FROM countMessage WHERE fromIdentifiantUser = ? AND toIdentifiantUser = ? ",
      [from, toIdBdd],
      (error, result) => {
        if (result.length > 0) {
        } else {
          database.query(
            "INSERT INTO countMessage (id,fromIdentifiantUser,toIdentifiantUser) VALUES (?,?,?)",
            [null, from, toIdBdd],
            (error, result) => {}
          );
        }
      }
    );

    let result = [];

    socketIO
      .to(to)
      .to(socket.customId)
      .emit("reponseMessageServer", {
        message: text,
        from: from,
        to: toIdBdd,
        result,
      });
    socketIO
      .to(to)
      .emit("reponseMessengerVu", {
        from: from,
        to: toIdBdd,
        emite: "test",
        socketId: socket.customId,
      });
  });

  socket.on(
    "demandeAmi",
    ({ from, to, toToken, message, personne, fromUserInfo }) => {
      database.query(
        "INSERT INTO `notifications` (`id`,`personne`,`idPublication`, `fromUser`, `toUser`,`message`,`type`,`vu`) VALUES (NULL,?,NULL, ?, ?, ?, ?,1)",
        [personne, from, toToken, message, "friend-request"],
        (error, result) => {}
      );

      database.query(
        "SELECT * FROM users WHERE id= ? ",
        [from],
        (error, result) => {
          socketIO
            .to(to)
            .emit("reponseDemandeAmi", {
              personne: `${result[0].prenom + " " + result[0].nom}`,
              fromUser: result[0].id,
              message: `Vous avez recu une nouvelle demande d'ami de ${
                result[0].prenom + " " + result[0].nom
              }`,
              type: "friend-request",
              fromUserInfo: fromUserInfo,
            });
        }
      );
    }
  );

  socket.on(
    "demandeAmiAccepte",
    ({ id, myIdentifiant, myUsername, userToken, fromUserInfo }) => {
      database.query(
        "SELECT * FROM users WHERE id IN (?,?) ORDER BY FIELD (id,?,?) ",
        [userToken, myIdentifiant, userToken, myIdentifiant],
        (error, result) => {
          socketIO
            .to(result[0].socketId)
            .emit("newFriendConnected", {
              username: result[1].prenom,
              profilPhoto: result[1].profilPhoto,
              identifiant: result[1].id,
              socketId: result[1].socketId,
            });
          socketIO
            .to(result[1].socketId)
            .emit("newFriendConnected", {
              username: result[0].prenom,
              profilPhoto: result[0].profilPhoto,
              identifiant: result[0].id,
              socketId: result[0].socketId,
            });

          database.query(
            "UPDATE notifications SET message = 'Vous avez accepté la demande d''ami de " +
              result[0].prenom +
              " " +
              result[0].nom +
              "', type = 'accept-friend' WHERE fromUser = ? AND toUser = ? AND type = ?",
            [userToken, myIdentifiant, "friend-request"],
            (error, result) => {
              
            }
          );

          database.query(
            "INSERT INTO `contact` (`id`, `identifiant`, `token-me`, `connected`, `socketId`) VALUES (NULL, ?, ?,false, ?),(NULL, ?, ?,false, ?)",
            [
              userToken,
              id,
              result[0].socketId,
              myIdentifiant,
              userToken,
              result[1].socketId,
            ],
            (error, result) => {
              
            }
          );

          database.query(
            "INSERT INTO `notifications` (`id`,`personne`,`idPublication`, `fromUser`, `toUser`, `message`, `type`, `vu`) VALUES (NULL,?,NULL, ?, ?, ?, ?,1)",
            [
              myUsername,
              myIdentifiant,
              userToken,
              `Vous etes maintenant amis avec ${myUsername}`,
              "accept-friend",
            ],
            (error, result) => {
              
            }
          );
          socket
            .to(result[0].socketId)
            .emit("reponseAmiAccepte", {
              personne: myUsername,
              fromUser: myIdentifiant,
              message: `Vous etes maintenant amis avec ${myUsername}`,
              type: "accept-friend",
              fromUserInfo: fromUserInfo,
            });
        }
      );
    }
  );

  socket.on("disconnect", () => {});
});

http.listen(PORT, () => {
  
});
