import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ErreurConfirmation from "./ErreurConfirmation";
import ReactLoading from "react-loading";
function Login({ setModalRegister }) {
  const navigate = useNavigate();
  const { loginUser, loggedInCheck } = useContext(AuthContext);
  const [resultat, setResultat] = useState({
    value: false,
    erreur: "",
  });
  const [connexion, setConnexion] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConnexion(true);

    for (var i = 0; i < Array.from(e.target).length - 1; i++) {
      Array.from(e.target)[i].value !== ""
        ? (Array.from(e.target)[i].style.border = "1px solid #DDDFE2")
        : (Array.from(e.target)[i].style.border = "1px solid red");
    }

    if (login.email !== "" && login.password !== "") {
      const data = await loginUser(login.email, login.password);

      switch (data) {
        case "nonConfirme":
          navigate(
            "/confirmationEmail#" +
              window.btoa(unescape(encodeURIComponent(login.email))),
            {
              state: {
                info: "Cette adresse e-mail existe deja mais n'est pas confirmé. Entrez le code qui apparaît dans l’e-mail envoyé à ",
              },
            }
          );

          break;
        case "reussis":
          localStorage.setItem("loginToken", "data.token");
          e.target.reset();
          await loggedInCheck();
          break;
        case "emailInvalid":
          setResultat({
            value: true,
            erreur:
              "l'e-mail saisi est invalide. Inscrivez-vous ou changer d'e-mail.",
          });

          break;
        case "echoué":
          setResultat({ value: true, erreur: "La connexion à échoué." });

          break;
        case "passwordIncorect":
          setResultat({
            value: true,
            erreur:
              "L'e-mail saisi est valide mais le mot de passe saisi est incorect. Vous pouvez renvoyer votre mot de passe via le lien ",
          });

          break;

        default:
      }
    }

    setConnexion(false);
  };

  return (
    <>
      <div style={{ width: "410px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "370px",
            backgroundColor: "white",
            alignItems: "center",
            padding: "25px 20px",
            borderRadius: "6px",
            gap: "25px",
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: "17px",
            }}
          >
            <input
              id="email"
              onChange={handleChange}
              type="text"
              style={{
                fontSize: "1em",
                padding: "14px 16px",
                borderRadius: "6px",
                width: "90%",
                border: "1px solid #DDDFE2",
              }}
              placeholder="Adresse e-mail ou numéro de tel"
            />
            <input
              id="password"
              onChange={handleChange}
              type="text"
              style={{
                fontSize: "1em",
                padding: "14px 16px",
                borderRadius: "6px",
                width: "90%",
                border: "1px solid #DDDFE2",
              }}
              placeholder="Mot de passe"
            />
            <button
              disabled={connexion}
              style={{
                cursor: "pointer",
                width: "100%",
                padding: "12px 0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#166FE5",
                borderRadius: "6px",
                border: "none",
                display: "flex",
                justifyContent: "center",
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
                "Se connecter"
              )}
            </button>
          </form>
          <Link
            to="/forget"
            style={{ color: "#188EF8", textDecoration: "none" }}
          >
            Mot de passe oublié ?
          </Link>
          <div
            style={{ height: "1px", width: "100%", backgroundColor: "#DADDE1" }}
          ></div>
          <button
            onClick={() => setModalRegister(true)}
            style={{
              cursor: "pointer",
              backgroundColor: "#36a420",
              fontSize: "18.5px",
              border: "none",
              borderRadius: "6px",
              padding: "13px 16px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Créer nouveau compte
          </button>
        </div>

        <p style={{ textAlign: "center", margin: "30px 10px 0 10px" }}>
          <span style={{ fontWeight: "bold" }}>Créer une Page</span> pour une
          célébrité, une marque ou une entreprise
        </p>
      </div>
      {resultat.value && (
        <ErreurConfirmation
          setErreurModal={setResultat}
          titre="Connexion refusé"
          paragraphe={resultat.erreur}
        />
      )}
    </>
  );
}

export default Login;
