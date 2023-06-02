import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContext";
import camera from "../assets/icones/camera-solid.png";
import { useParams } from "react-router-dom";
import BouttonCouverture from "./BouttonCouverture";
import contact from "../assets/icones/contact.png";

function PhotoCouverture({ profilCouverture, setProfilCouverture }) {
  const [affiche, setAffiche] = useState(false);
  const [enregistre, setEnregistre] = useState(false);
  const [photoCouverture, setPhotoCouverture] = useState(profilCouverture);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const divRef = useRef();
  const [cacher, setCacher] = useState(false);

  useEffect(() => {
    setPhotoCouverture(profilCouverture);
  }, [profilCouverture]);

  const handleChange = (e) => {
    const formData = new FormData();
    // Ajoute la photo sélectionnée à l'objet FormData
    formData.append("photoCouverture", e.target.files[0]);

    // Envoie la requête POST avec fetch
    fetch("http://www.localhost:8000/php/getPhotoCouverture.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data != "") {
          setPhotoCouverture(data);
          setEnregistre(true);
          setAffiche(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleClick = () => {
    fetch(
      "http://www.localhost:8000/php/getPhotoCouverture.php?id=" +
        currentUser[0] +
        "&photoCouverture=" +
        photoCouverture,

      { credentials: "include" }
    ).then(function (response) {
      response.text().then(function (reponse) {
        if (reponse == "success") {
          setProfilCouverture(photoCouverture);
          setEnregistre(false);
        }
      });
    });
  };

  const handleAnnule = () => {
    fetch(
      "http://www.localhost:8000/php/getPhotoCouverture.php?photoCouvertureAnnule=" +
        photoCouverture,

      { credentials: "include" }
    ).then(function (response) {
      response.text().then(function (reponse) {
        if (reponse == "reussis") {
          setPhotoCouverture(profilCouverture);
          setEnregistre(false);
        }
      });
    });
  };

  document.onclick = function (e) {
    if (divRef.current !== null) {
      !divRef.current.contains(e.target) && setCacher(false);
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "480px",
            borderRadius: "0 0 10px 10px",
            backgroundSize: "cover",
            backgroundPositionY: "50%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${require("../assets/upload/" +
              photoCouverture)}`,
          }}
        ></div>
        {id == currentUser[0] && (
          <div ref={divRef}>
            <button
              style={{
                position: "absolute",
                bottom: "5%",
                right: "3%",
                padding: "2px 10px",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "white",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => {
                setAffiche(true);
                setCacher(true);
              }}
            >
              <img
                style={{ width: "30px", paddingRight: "3px" }}
                src={camera}
              />{" "}
              Changer la photo de couverture
            </button>

            {cacher && (
              <>
                {enregistre && (
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      position: "fixed",
                      top: "60px",
                      padding: "15px 20px",
                      left: "0",
                      width: "100vw",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "white" }}>
                      Votre photo de couverture est publique.
                    </span>
                    <div style={{ marginRight: "40px" }}>
                      <button
                        style={{
                          cursor: "pointer",
                          fontSize: "16px",
                          marginRight: "10px",
                          width: "230px",
                          padding: "7px 0",
                          backgroundColor: "#232323",
                          border: "none",
                          color: "white",
                          borderRadius: "5px",
                        }}
                        onClick={handleAnnule}
                      >
                        Annuler
                      </button>
                      <button
                        style={{
                          cursor: "pointer",
                          fontSize: "16px",
                          width: "280px",
                          padding: "7px 0",
                          backgroundColor: "#2374E1",
                          border: "none",
                          color: "white",
                          borderRadius: "5px",
                        }}
                        onClick={handleClick}
                      >
                        Enregistre les modifications
                      </button>
                    </div>
                  </div>
                )}

                {affiche && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-33.43%",
                      right: "3%",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "white",
                      boxShadow:
                        "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                      width: "340px",
                      padding: "5px",
                    }}
                  >
                    <BouttonCouverture titre={"Sélectionner une photo"} />
                    <label
                      htmlFor="photo"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src={contact} />
                      <span style={{ fontSize: "15.5px" }}>
                        Importer une photo
                      </span>
                      <input
                        onChange={handleChange}
                        style={{ display: "none" }}
                        type="file"
                        id="photo"
                        name="photo"
                      />
                    </label>
                    <BouttonCouverture titre={"Repositionner"} />
                    <hr />
                    <BouttonCouverture titre={"Supprimer"} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoCouverture;
