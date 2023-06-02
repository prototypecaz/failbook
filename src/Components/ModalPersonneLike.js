import React, { useEffect, useState } from "react";
import close from "../assets/images/close.png";

const ModalPersonneLike = ({ idPublication, setIdPublication }) => {
  const [personneLike, setPersonneLike] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getLikeUser.php?idPublication=" +
        idPublication,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setPersonneLike(themes);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "rgba(244,244,244,0.8)",
        position: "fixed",
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
        zIndex: "2",
      }}
    >
      <div
        style={{ width: "548px", backgroundColor: "white", height: "250px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "13px 15px 25px 33px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <img
              src="https://www.facebook.com/reaction/image/1635855486666999/?size=20&amp;scale=1"
              alt=""
            />
            <span style={{ fontSize: "15px", color: "#1d6df7" }}>
              {personneLike.length}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#e4e6eb",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => setIdPublication("")}
          >
            <img src={close} />
          </div>
        </div>

        <div style={{ padding: "0 15px" }}>
          {!loading &&
            personneLike.map((x, index) => {
              return (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <img
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "100%",
                        }}
                        src={require("../assets/upload/" + x.profilPhoto)}
                      />
                      <img
                        style={{
                          position: "absolute",
                          width: "16px",
                          right: 0,
                          bottom: 0,
                        }}
                        src="https://www.facebook.com/reaction/image/1635855486666999/?size=20&amp;scale=1"
                        alt=""
                      />
                    </div>

                    <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {x.prenom + " " + x.nom}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ModalPersonneLike;
