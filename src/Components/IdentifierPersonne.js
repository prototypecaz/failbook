import React, { useEffect, useState } from "react";
import SearchUser from "./SearchUser";
import Humeur from "./Humeur";
import search from "../assets/icones/search.png";

function IdentifierPersonne({ usersChoose, setUsersChoose, setValueModal }) {
  const [allUsersOrigin, setAllUsersOrigin] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getContact.php",

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAllUsersOrigin(themes);
        setAllUsers(themes);
        setLoading(false);
      });
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.value == "") {
      setAllUsers(allUsersOrigin);
    } else {
      fetch(
        "http://www.localhost:8000/php/getAllUsersSearch.php?identifierPersonne=" +
          e.target.value,

        { credentials: "include" }
      ).then(function (response) {
        response.json().then(function (themes) {
          setAllUsers(themes);
        });
      });
    }
  };

  const handleChooseUser = (id) => {
    setUsersChoose([...usersChoose, id]);
  };

  return (
    !loading && (
      <div style={{ padding: "0 15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
            borderBottom: "1px solid #e5e5e5",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#e4e6eb",
              display: "flex",
              alignItems: "center",
              borderRadius: "100%",
              padding: "9px",
            }}
            onClick={() => setValueModal("")}
          >
            <i
              style={{
                backgroundImage:
                  "url('https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/rQp6okZNzWW.png')",
                backgroundPosition: "-25px -59px",
                backgroundSize: "auto",
                width: "20px",
                height: "20px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            />
          </div>
          <h3 style={{ textAlign: "center" }}>Identifier des personne</h3>
          <aside></aside>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: "80%",
              backgroundColor: "#F0F2F5",
              height: "35px",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              padding: " 0 13px",
              gap: "10px",
            }}
          >
            <img src={search} style={{ width: "18px" }} />
            <input
              placeholder="Rechercher des amis"
              onChange={handleChange}
              style={{
                height: "50%",
                backgroundColor: "#F0F2F5",
                border: "none",
                fontSize: "16px",
                width: "100%",
              }}
            />
          </div>

          <button
            style={{
              backgroundColor: "white",
              border: "none",
              color: "#216fdb",
              fontWeight: "bold",
            }}
            onClick={() => setValueModal("")}
          >
            Terminer
          </button>
        </div>
        {usersChoose.length > 0 && (
          <div>
            {usersChoose.map((x, index) => (
              <span key={index}>{x.username}</span>
            ))}
          </div>
        )}
        <div>
          <h5 style={{ color: "#6e7074", marginTop: "22px" }}>SUGGESTIONS</h5>
          {allUsers.map((x, index) => (
            <div
              key={index}
              onClick={() => handleChooseUser(x)}
              style={{
                display: "flex",
                marginBottom: "5px",
                alignItems: "center",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              <img
                style={{ width: "40px", height: "40px", borderRadius: "100%" }}
                src={require("../assets/upload/" + x.profilPhoto)}
              />
              <div>
                <span>{x.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default IdentifierPersonne;
