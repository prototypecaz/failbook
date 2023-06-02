import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErreurConfirmation from "./ErreurConfirmation";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import HeaderAccueil from "./HeaderAccueil";

function MotDePasseOublié(props) {
  const navigate = useNavigate();
  const [reponse, setReponse] = useState(false);
  const [modalErreur, setModalErreur] = useState(false);
  const [connexion, setConnexion] = useState(false);
  const input = useRef();
  const [email, setEmail] = useState("");

  const handleClickAnnule = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClickRecherche = async (e) => {
    setConnexion(true);

    if (input.current.value !== "") {
      input.current.style.border = "1px solid #ccd0d5";
      try {
        let response = await fetch("http://www.localhost:8000/php/forget.php", {
          method: "POST",
          credentials: "include",
          header: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });

        let result = await response.text();

        if (result !== "") {
          if (result == "nonConfirme") {
            navigate(
              "/confirmationEmail#" +
                window.btoa(unescape(encodeURIComponent(email))),
              {
                state: {
                  info: "Cette adresse e-mail existe deja mais n'est pas confirmé. Entrez le code qui apparaît dans l’e-mail envoyé à ",
                },
              }
            );
          } else {
            setModalErreur(true);
          }
        } else {
          setReponse(true);
        }
      } catch (err) {
        return { success: 0, message: "Server Error!" };
      }
    } else {
      input.current.style.border = "1px solid red";
    }

    setConnexion(false);
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
                  Trouvez votre compte
                </span>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "lightgrey",
                  }}
                ></div>
                <p style={{ fontSize: "15px", color: "#606770" }}>
                  Veuillez entrer votre adresse e-mail ou votre numéro de mobile
                  pour rechercher votre compte.
                </p>
                <input
                  ref={input}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "15px 0",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ccd0d5",
                  }}
                  placeholder="confirmer code"
                />

                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "lightgrey",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <button
                    disabled={connexion}
                    onClick={handleClickAnnule}
                    style={{
                      cursor: "pointer",
                      padding: "10px 50px",
                      fontSize: "1em",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    disabled={connexion}
                    onClick={handleClickRecherche}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#1877f2",
                      color: "white",
                      padding: "10px 50px",
                      fontSize: "1em",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {connexion ? (
                      <ReactLoading
                        type={"spin"}
                        color={"#ffffff"}
                        height={"23px"}
                        width={"23px"}
                      />
                    ) : (
                      "Rechercher"
                    )}
                  </button>
                </div>
              </div>

              {modalErreur && (
                <ErreurConfirmation
                  titre="Erreur dans la saisi de l'e-mail"
                  paragraphe="L'e-mail saisi n'existe pas ou n'est pas valide"
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
                Mot de passe envoyer
              </span>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "lightgrey",
                }}
              ></div>
              <p style={{ fontSize: "16px", color: "#606770" }}>
                Votre nouveau mot de passe a bien été envoyer Vous pouvez dés a
                présent vous connecter
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

export default MotDePasseOublié;
