import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import search from "../assets/icones/search.png";
import NombreMessengerVu from "./NombreMessengerVu";

function DiscussionMessenger({
  cacher,
  setMessengerCacher,
  nombreMessengerVu,
}) {
  const { currentUser } = useContext(AuthContext);
  const [allUserMessage, setAllUserMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUserChoose } = useContext(AuthContext);

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getMessenger.php?token=" + currentUser[0],

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAllUserMessage(themes);
        setLoading(false);
      });
    });
  }, [cacher]);

  const handleClick = (userChoose) => {
    setUserChoose(userChoose);
    setMessengerCacher(false);
  };

  return (
    <>
      {cacher && (
        <div
          style={{
            width: "360px",
            backgroundColor: "white",
            position: "absolute",
            top: "110%",
            right: "-240%",
            padding: "0 15px 10px 15px",
            borderRadius: "10px",
            boxShadow:
              "0 12px 28px 0 rgba(0,0,0,0.2),0 2px 4px 0 rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "17px 10px",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: "23px" }}>Discussions</h3>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  style={{
                    backgroundImage:
                      'url("https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/rQp6okZNzWW.png")',
                    backgroundPosition: "-147px -84px",
                    backgroundSize: "auto",
                    width: "20px",
                    height: "20px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  style={{
                    backgroundImage:
                      'url("https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/aU-815RRDTt.png")',
                    backgroundPosition: "0px -673px",
                    backgroundSize: "auto",
                    width: "20px",
                    height: "20px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  style={{
                    backgroundImage:
                      'url("https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/cNgJ4aPtjjy.png")',
                    backgroundPosition: "0px -334px",
                    backgroundSize: "auto",
                    width: "20px",
                    height: "20px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                  }}
                ></i>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  style={{
                    backgroundImage:
                      'url("https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/cNgJ4aPtjjy.png")',
                    backgroundPosition: "0px -1616px",
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

          <div
            style={{
              backgroundColor: "#F0F2F5",
              height: "35px",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              padding: " 0 13px",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <img src={search} style={{ width: "18px" }} />
            <input
              placeholder="Rechercher dans Messenger"
              style={{
                height: "50%",
                backgroundColor: "#F0F2F5",
                border: "none",
                fontSize: "16px",
                width: "100%",
              }}
            />
          </div>
          {!loading &&
            allUserMessage.map((x, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleClick(JSON.parse(x.participants)[0])}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <img
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "100%",
                      }}
                      src={require("../assets/upload/" +
                        JSON.parse(x.participants)[0]["photoProfil"])}
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "16.5px",
                        marginBottom: "2.5px",
                        display: "block",
                      }}
                    >
                      {JSON.parse(x.participants)[0]["username"]}
                    </span>
                    <span
                      style={{
                        display: "block",
                        color: "#606266",
                        fontSize: "13.5px",
                      }}
                    >
                      {x.message}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <NombreMessengerVu nombreMessengerVu={nombreMessengerVu} />
    </>
  );
}

export default DiscussionMessenger;
