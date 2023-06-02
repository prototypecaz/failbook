import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/icones/logoFacebook.png";

function UniquePhotoUser(props) {
  const { idPhoto, idUser } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState();
  const [index, setIndex] = useState();

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getPublication.php?idUserPhoto=" + idUser,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAllPhotos(themes);
        const indexe = themes.find((x) => x.id == idPhoto);
        setIndex(themes.indexOf(indexe));
        setLoading(false);
      });
    });
  }, []);

  const handleClickSuivant = () => {
    if (index < allPhotos.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const handleClickPrecedant = () => {
    if (index == 0) {
      setIndex(allPhotos.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  /*<button onClick={handleClickPrecedant}>Prtecedant</button>
            <img src={require('../assets/upload/'+allPhotos[index]['photoPublication'])}/>
            <button onClick={handleClickSuivant}>suivant</button>*/

  return (
    !loading && (
      <div style={{ height: "100vh" }}>
        <div
          style={{
            width: "70%",
            height: "100%",
            backgroundColor: "black",
            position: "relative",
            padding: "0 15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              position: "absolute",
              width: "96%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <i
                onClick={() => window.history.back()}
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/pd14Byg6X3h.png")',
                  backgroundPosition: "0px -105px",
                  backgroundSize: "auto",
                  width: "20px",
                  height: "20px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "invert(100%)",
                  cursor: "pointer",
                }}
              ></i>
              <img style={{ width: "45px" }} src={logo} />
            </div>
            <div style={{ display: "flex", gap: "26px" }}>
              <i
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/ALJ0vkjFJhv.png")',
                  backgroundPosition: "0px -134px",
                  backgroundSize: "auto",
                  width: "20px",
                  height: "20px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "invert(100%)",
                }}
              ></i>

              <i
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/ALJ0vkjFJhv.png")',
                  backgroundPosition: "0px -155px",
                  backgroundSize: "auto",
                  width: "20px",
                  height: "20px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "invert(100%)",
                }}
              ></i>

              <i
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/nyiGAeIUE1-.png")',
                  backgroundPosition: "0px -253px",
                  backgroundSize: "auto",
                  width: "20px",
                  height: "20px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "invert(100%)",
                }}
              ></i>

              <i
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/nyiGAeIUE1-.png")',
                  backgroundPosition: "0px -232px",
                  backgroundSize: "auto",
                  width: "20px",
                  height: "20px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "invert(100%)",
                }}
              ></i>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                border: "none",
                padding: "15px",
                borderRadius: "100%",
                cursor: "pointer",
              }}
              onClick={handleClickPrecedant}
            >
              <i
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/pd14Byg6X3h.png")',
                  backgroundPosition: "-58px -26px",
                  backgroundSize: "auto",
                  width: "24px",
                  height: "24px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                }}
              ></i>
            </button>

            <img
              style={{ width: "70%", maxHeight: "100%" }}
              src={require("../assets/upload/" +
                allPhotos[index]["photoPublication"])}
            />

            <button
              style={{
                display: "flex",
                alignItems: "center",
                border: "none",
                padding: "15px",
                borderRadius: "100%",
                cursor: "pointer",
              }}
              onClick={handleClickSuivant}
            >
              <i
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/pd14Byg6X3h.png")',
                  backgroundPosition: "-108px -26px",
                  backgroundSize: "auto",
                  width: "24px",
                  height: "24px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                }}
              ></i>
            </button>
          </div>
        </div>
        <div></div>
      </div>
    )
  );
}

export default UniquePhotoUser;
