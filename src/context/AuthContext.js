import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import socketIO from "socket.io-client";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [userChoose, setUserChoose] = useState([]);
  const [nombreMessengerVu, setNombreMessengerVu] = useState(
    JSON.parse(localStorage.getItem("messengerVu")) !== null &&
      JSON.parse(localStorage.getItem("messengerVu")).length > 0
      ? JSON.parse(localStorage.getItem("messengerVu"))
      : []
  );
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState();
  const [idPublication, setIdPublication] = useState("");

  const loginUser = async (email, password) => {
    try {
      let response = await fetch("http://www.localhost:8000/php/login.php", {
        method: "POST",
        credentials: "include",
        header: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let result = await response.text();

      if (result) {
        return result;
      }
    } catch (err) {
      return { success: 0, message: "Server Error!" };
    }
  };

  const loggedInCheck = async () => {
    fetch(
      "http://www.localhost:8000/php/getUser.php",

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        if (themes.length > 0) {
          setCurrentUser(themes);

          const socket = socketIO.connect("http://localhost:4000", {
            query: {
              userId: themes[0],
              idBDD: themes[1],
              id: themes[0],
              user: themes[4],
            },
            auth: {
              username: themes[2],
            },
          });

          setSocket(socket);

          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    });
  };

  useEffect(() => {
    loggedInCheck();

    //setOtherLoading(false)
    //setOtherLoading(true)
    // ATTENTION UTILISER PR GOOGLE CHROME CAR SANS CA IMPOSSIBLE DAVOIR UNE VUE SUR CHROME
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        currentUser,
        loggedInCheck,
        socket,
        loading,
        userChoose,
        setUserChoose,
        idPublication,
        setIdPublication,
        nombreMessengerVu,
        setNombreMessengerVu,
      }}
    >
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};
