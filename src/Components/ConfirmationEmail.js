import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErreurConfirmation from "./ErreurConfirmation";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import HeaderAccueil from "./HeaderAccueil";

function ConfirmationEmail(props) {
  const [uniqueCode, setUniqueCode] = useState("");
  const navigate = useNavigate();
  const [reponse, setReponse] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [modalErreur, setModalErreur] = useState(false);
  const [connexion, setConnexion] = useState(false);
  const [texteEnvoieEmail, setTexteEnvoieEmail] = useState("Renvoyer l'e-mail");
  const pointerEvent = useRef();
  const location = useLocation();

  const handleClick = () => {
    
    fetch(
      "http://www.localhost:8000/php/confirmEmail.php?uniqueCode=" + uniqueCode,
      {
        credentials: "include",
      }
    ).then(function (response) {
      response.text().then(function (reponse) {
        if (reponse == "success") {
          setReponse(true);
        } else {
          setModalErreur(true);
        }
      });
    });
  };

  useEffect(() => {
    reponse &&
      setTimeout(() => {
        navigate("/");
      }, 8000);
  }, [reponse]);

  useEffect(() => {
    var email = document.location.hash.slice(1);

    function b64_to_utf8(str) {
      return decodeURIComponent(escape(window.atob(str)));
    }
    setEmailUser(b64_to_utf8(email));
  }, []);

  useEffect(() => {
    uniqueCode !== "" ? setDisabled(false) : setDisabled(true);
  }, [uniqueCode]);

  const handleChange = (e) => {
    setUniqueCode(e.target.value);
  };

  const handleRenvoieEmail = () => {
    setConnexion(true);
    pointerEvent.current.style.pointerEvents = "none";
    pointerEvent.current.style.color = "rgb(96, 103, 112)";
    fetch(
      "http://www.localhost:8000/php/register.php?renvoieEmail=" + emailUser,
      { credentials: "include" }
    );

    setTexteEnvoieEmail("L'e-mail à était envoyer avec succes");
    setConnexion(false);

    setTimeout(() => {
      setTexteEnvoieEmail("Renvoyer l'e-mail");
      pointerEvent.current.style.pointerEvents = "initial";
      pointerEvent.current.style.color = "#1877f2";
    }, 5000);
  };

  return (
    <>
      <HeaderAccueil />
      <div style={{ position: "relative" }}>
        <div style={{ height: "80vh", display: "flex" }}>
          {!reponse ? (
            <>
              <div
                style={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto",
                  width: "500px",
                  gap: "18px",
                  padding: "18px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Entrez le code de votre e-mail
                </span>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "lightgrey",
                  }}
                ></div>
                <p style={{ fontSize: "15px", color: "#606770" }}>
                  {location.state.info}
                  <span style={{ fontWeight: "bold" }}>{emailUser}</span>.
                </p>
                <input
                  maxLength={"6"}
                  style={{
                    width: "150px",
                    padding: "15px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ccd0d5",
                  }}
                  onChange={handleChange}
                  placeholder="confirmer code"
                />
                <span
                  ref={pointerEvent}
                  onClick={handleRenvoieEmail}
                  style={{ cursor: "pointer", color: "#1877f2" }}
                >
                  {connexion ? (
                    <div style={{ paddingLeft: "10px" }}>
                      <ReactLoading
                        type={"spin"}
                        color={"black"}
                        height={"20px"}
                        width={"20px"}
                      />
                    </div>
                  ) : (
                    texteEnvoieEmail
                  )}
                </span>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "lightgrey",
                  }}
                ></div>
                <div>
                  <button
                    disabled={disabled}
                    style={{
                      cursor: "pointer",
                      backgroundColor: !disabled && "#1877f2",
                      color: !disabled && "white",
                      padding: "10px 50px",
                      float: "right",
                      fontSize: "1em",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                    }}
                    onClick={handleClick}
                  >
                    Continuer
                  </button>
                </div>
              </div>

              {modalErreur && (
                <ErreurConfirmation
                  titre="Erreur de confirmation"
                  paragraphe="Le code de confirmation saisis n'est pas valide ou a expiré. Veuillez vous assurer que vous avez entré le bon code."
                  setErreurModal={setModalErreur}
                />
              )}
            </>
          ) : (
            <div
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                width: "500px",
                gap: "25px",
                padding: "18px",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Inscription valider
              </span>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "lightgrey",
                }}
              ></div>
              <p style={{ fontSize: "16px", color: "#606770" }}>
                Votre inscription a bien était valider, vous pouvez dés à
                présent vous connectez avec{" "}
                <span style={{ fontWeight: "bold" }}>{emailUser}</span>. Vous
                aller etre rediriger sur la page de connexion.
              </p>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "lightgrey",
                }}
              ></div>
              <div>
                <Link
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#1877f2",
                    color: "white",
                    padding: "10px 50px",
                    float: "right",
                    fontSize: "1em",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                  to={"/"}
                >
                  Continuer
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ConfirmationEmail;
