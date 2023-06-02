import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icones/logoFacebook.png";
import search from "../assets/icones/search.png";
import { AuthContext } from "../context/AuthContext";

function SearchUser(props) {
  const { currentUser } = useContext(AuthContext);
  const [usersFind, setUsersFind] = useState([]);
  const [usersFindSave, setUserFindSave] = useState([]);
  const divRef = useRef();

  const handleChange = (e) => {
    if (e.target.value == "") {
      setUsersFind(usersFindSave);
    } else {
      fetch(
        "http://www.localhost:8000/php/getAllUsersSearch.php?search=" +
          e.target.value,

        { credentials: "include" }
      ).then(function (response) {
        response.json().then(function (themes) {
          setUsersFind(themes);
        });
      });
    }
  };

  const handleClick = (x) => {
    fetch(
      "http://www.localhost:8000/php/getSearchUser.php?id=" +
        x.idProfil +
        "&idUser=" +
        currentUser[3],

      { credentials: "include" }
    );

    setUsersFind([]);
  };

  const handleFocus = () => {
    fetch(
      "http://www.localhost:8000/php/getSearchUser.php?id=" + currentUser[3],

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setUsersFind(themes);
        setUserFindSave(themes);
      });
    });
  };

  document.onclick = function (e) {
    if (divRef.current != null) {
      !divRef.current.contains(e.target) && setUsersFind([]);
    }
  };

  return (
    <div ref={divRef} style={{ position: "relative", padding: "0 15px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link to="/">
          <img src={logo} style={{ width: "40px" }} />
        </Link>
        <div
          style={{
            width: "240px",
            backgroundColor: "#F0F2F5",
            height: "40px",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            padding: " 0 13px",
            gap: "10px",
          }}
        >
          <img src={search} style={{ width: "18px" }} />
          <input
            placeholder="Search Failboot"
            onFocus={handleFocus}
            onChange={handleChange}
            style={{
              height: "50%",
              backgroundColor: "#F0F2F5",
              border: "none",
              fontSize: "16px",
              width: "90%",
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          position: "absolute",
          backgroundColor: "white",
          left: 0,
          top: "100%",
        }}
      >
        {usersFind.map((x, index) => {
          return (
            <Link
              key={index}
              to={"/profil/" + x.idProfil}
              onClick={() => handleClick(x)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
              }}
            >
              <img
                style={{ width: "36px", height: "36px", borderRadius: "100%" }}
                src={require("../assets/upload/" + x.profilPhoto)}
              />
              <span>{x.prenom + " " + x.nom}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchUser;
