import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErreurConfirmation from "./ErreurConfirmation";
import ReactLoading from "react-loading";

function Register({ setModalRegister }) {
  const inputRadio = useRef([]);
  const [formValid, setFormValid] = useState(true);
  const navigate = useNavigate();
  const [compteExistant, setCompteExistant] = useState(false);
  const [connexion, setConnexion] = useState(false);

  const [valueFormValid, setValueFormValid] = useState({
    prenom: "",
    nom: "",
    emailOrPhone: "",
    password: "",
    jour: "1",
    mois: "1",
    annee: "1990",
    genre: "homme",
  });

  function colorBorder(e, color) {
    for (var i = 4; i < 7; i++) {
      e.target[i].style.border = "1px solid " + color;
    }
  }

  const handleChange = (e) => {
    setValueFormValid({ ...valueFormValid, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setConnexion(true);

    e.preventDefault();

    const dateToday = new Date().getFullYear();

    let baliseValue = [
      { balise: e.target[0], value: e.target[0].value },
      { balise: e.target[1], value: e.target[1].value },
      { balise: e.target[2], value: e.target[2].value },
      { balise: e.target[3], value: e.target[3].value },
      { balise: e.target[6], value: e.target[6].value },
    ];

    baliseValue.map((x, index) => {
      x.value == ""
        ? (x.balise.style.border = "1px solid red")
        : (x.balise.style.border = "1px solid #ccd0d5");
      index == 4 && dateToday - x.value > 18
        ? colorBorder(e, "#ccd0d5")
        : colorBorder(e, "red");
    });

    let radioTrueOrFalse = inputRadio.current.find((y) => y.checked);

    const verif = radioTrueOrFalse
      ? inputRadio.current.map(
          (x) => (x.parentElement.style.border = "1px solid #ccd0d5")
        )
      : inputRadio.current.map(
          (x) => (x.parentElement.style.border = "1px solid red")
        );

    let formIsValid = Array.from(e.target).find((x) => {
      return (
        x.style.border.includes("red") ||
        x.parentElement.style.border.includes("red")
      );
    });

    const validation = formIsValid
      ? (setFormValid(false), setConnexion(false))
      : setFormValid(true);

    setFormValid((state) => {
      state &&
        fetch(
          "http://www.localhost:8000/php/register.php?users=" +
            JSON.stringify(valueFormValid),

          { credentials: "include" }
        ).then(function (response) {
          response.text().then(function (themes) {
            if (JSON.parse(themes)[1] == "compteExistant") {
              setCompteExistant(true);
            } else if (JSON.parse(themes)[1] == "compteNonconfirmer") {
              navigate("/confirmationEmail#" + JSON.parse(themes)[0], {
                state: {
                  info: "Cette adresse e-mail existe deja mais n'est pas confirmé. Entrez le code qui apparaît dans l’e-mail envoyé à ",
                },
              });
            } else {
              navigate("/confirmationEmail#" + JSON.parse(themes)[0], {
                state: {
                  info: "Confirmez que cette adresse e-mail vous appartient. Entrez le code qui apparaît dans l’e-mail envoyé à ",
                },
              });
            }

            setConnexion(false);
          });
        });
    });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(255,255,255,.8)",
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "0 0 8px 8px",
            backgroundColor: "white",
            width: "432px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "17px",
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 style={{ fontSize: "32px" }}>S'inscrire</h1>
              <button
                onClick={() => setModalRegister(false)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  border: "none",
                }}
              >
                <img
                  style={{ height: "23px" }}
                  src={require("../assets/images/close.png")}
                />
              </button>
            </div>
            <span
              style={{
                fontSize: "15px",
                marginTop: "5px",
                display: "block",
                color: "#606770",
              }}
            >
              C'est rapide et facile.
            </span>
          </div>
          <div
            style={{ backgroundColor: "#ccd0d5", height: "1px", width: "100%" }}
          ></div>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
            action="http://www.localhost:8000/php/register.php"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <input
                onChange={handleChange}
                id="prenom"
                type="text"
                style={{
                  border: "1px solid #ccd0d5",
                  backgroundColor: "#f5f6f7",
                  borderRadius: "5px",
                  fontSize: "15px",
                  padding: "10px",
                  width: "190px",
                }}
                placeholder="Prenom"
              />
              <input
                onChange={handleChange}
                id="nom"
                type="text"
                style={{
                  border: "1px solid #ccd0d5",
                  backgroundColor: "#f5f6f7",
                  borderRadius: "5px",
                  fontSize: "15px",
                  padding: "10px",
                  width: "190px",
                }}
                placeholder="Nom de famille"
              />
            </div>
            <input
              onChange={handleChange}
              id="emailOrPhone"
              type="text"
              style={{
                border: "1px solid #ccd0d5",
                backgroundColor: "#f5f6f7",
                borderRadius: "5px",
                fontSize: "15px",
                padding: "10px",
                width: "95%",
              }}
              placeholder="Numero de mobile ou e-mail"
            />
            <input
              onChange={handleChange}
              id="password"
              type="text"
              style={{
                border: "1px solid #ccd0d5",
                backgroundColor: "#f5f6f7",
                borderRadius: "5px",
                fontSize: "15px",
                padding: "10px",
                width: "95%",
              }}
              placeholder="Nouveau mot de passe"
            />

            <div style={{ width: "100%" }}>
              <span style={{ fontSize: "12px", color: "#606770" }}>
                Date de naissance
              </span>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <select
                  onChange={handleChange}
                  id="jour"
                  name=""
                  style={{
                    width: "135px",
                    fontSize: "15px",
                    padding: "8px",
                    backgroundColor: "white",
                    border: "1px solid #ccd0d5",
                    borderRadius: "5px",
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select
                  onChange={handleChange}
                  name=""
                  id="mois"
                  style={{
                    width: "135px",
                    fontSize: "15px",
                    padding: "8px",
                    backgroundColor: "white",
                    border: "1px solid #ccd0d5",
                    borderRadius: "5px",
                  }}
                >
                  <option value="1">Janvier</option>
                  <option value="2">Février</option>
                  <option value="3">Mars</option>
                  <option value="4">Avril</option>
                  <option value="5">Mai</option>
                  <option value="6">Juin</option>
                  <option value="7">Juillet</option>
                  <option value="8">Aout</option>
                  <option value="9">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
                <select
                  onChange={handleChange}
                  name=""
                  id="annee"
                  style={{
                    width: "135px",
                    fontSize: "15px",
                    padding: "8px",
                    backgroundColor: "white",
                    border: "1px solid #ccd0d5",
                    borderRadius: "5px",
                  }}
                >
                  <option value="1990">1990</option>
                  <option value="1991">1991</option>
                  <option value="1992">1992</option>
                  <option value="1993">1993</option>
                  <option value="1994">1994</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <span style={{ fontSize: "12px", color: "#606770" }}>Genre</span>
              <div style={{ display: "flex", gap: "15px" }}>
                <div
                  style={{
                    flexBasis: "23%",
                    border: "1px solid #ccd0d5",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                >
                  <label>Femme</label>
                  <input
                    onChange={handleChange}
                    id="genre"
                    value="Femme"
                    ref={(e) => (inputRadio.current[0] = e)}
                    type="radio"
                    name="genre"
                  />
                </div>

                <div
                  style={{
                    flexBasis: "23%",
                    border: "1px solid #ccd0d5",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                >
                  <label>Homme</label>
                  <input
                    onChange={handleChange}
                    id="genre"
                    value="Homme"
                    ref={(e) => (inputRadio.current[1] = e)}
                    type="radio"
                    name="genre"
                  />
                </div>
                <div
                  style={{
                    flexBasis: "35%",
                    border: "1px solid #ccd0d5",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                >
                  <label>Personnalisé</label>
                  <input
                    onChange={handleChange}
                    id="genre"
                    value="Personnalisé"
                    ref={(e) => (inputRadio.current[2] = e)}
                    type="radio"
                    name="genre"
                  />
                </div>
              </div>
            </div>

            <p style={{ fontSize: "11px", color: "#777" }}>
              Les personnes qui utilisent notre service ont pu importer vos
              coordonnées sur Facebook. En savoir plus.
            </p>
            <p style={{ fontSize: "11px", color: "#777" }}>
              En cliquant sur S’inscrire, vous acceptez nos Conditions
              générales. Découvrez comment nous recueillons, utilisons et
              partageons vos données en lisant notre Politique de
              confidentialité et comment nous utilisons les cookies et autres
              technologies similaires en consultant notre Politique
              d’utilisation des cookies. Vous recevrez peut-être des
              notifications par texto de notre part et vous pouvez à tout moment
              vous désabonner.
            </p>
            <button
              disabled={connexion}
              style={{
                cursor: "pointer",
                borderRadius: "6px",
                fontSize: "20px",
                color: "#fff",
                backgroundColor: "#00a400",
                fontWeight: "bold",
                padding: "10px 65px",
                border: "none",
                margin: "20px 0",
                width: "218px",
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
                "S'inscrire"
              )}
            </button>
          </form>
        </div>
      </div>

      {compteExistant && (
        <ErreurConfirmation
          titre="Ce compte existe deja"
          paragraphe="L'e-mail envoyer existe déja vous pouvez dès à présent vous connectez !"
          setErreurModal={setCompteExistant}
        />
      )}
    </>
  );
}

export default Register;
