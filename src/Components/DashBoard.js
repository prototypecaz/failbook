import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";
import Main from "./Main";
import Profil from "./Profil";
import UniquePhotoUser from "./UniquePhotoUser";
import AncreLikePublication from "./AncreLikePublication";

function DashBoard(props) {
  const [profilPhotoUnique, setProfilPhotoUnique] = useState();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getProfil.php?id=" + currentUser[0],

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        
        setProfilPhotoUnique(themes[0]["profilPhoto"]);
        setLoading(true);
      });
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {loading && !location.pathname.includes("photoUser") ? (
        <Header profilPhotoUnique={profilPhotoUnique} />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={loading && <Main profilPhotoUnique={profilPhotoUnique} />}
        ></Route>
        <Route
          path="/profil/:id"
          element={
            <Profil
              profilPhotoUnique={profilPhotoUnique}
              setProfilPhotoUnique={setProfilPhotoUnique}
            />
          }
        ></Route>
        <Route
          path="/photoUser/:idPhoto/user/:idUser"
          element={<UniquePhotoUser />}
        ></Route>
        <Route
          path="/publicationLike/:idPublicationParams"
          element={
            <AncreLikePublication profilPhotoUnique={profilPhotoUnique} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default DashBoard;
