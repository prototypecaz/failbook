import React, { useContext, useState } from "react";
import ImportPhoto from "./ImportPhoto";
import camera from "../assets/icones/camera-solid.png";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PhotoProfil({ profilPhoto, setProfilPhoto, setProfilPhotoUnique }) {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const [modalImport, setModalImport] = useState(false);

  const handleClick = () => {
    setModalImport(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", width: "200px", height: "200px" }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "100%",
            border: "5px solid white",
          }}
          src={require("../assets/upload/" + profilPhoto)}
        />

        {id == currentUser[0] && (
          <button
            style={{
              position: "absolute",
              borderRadius: "100%",
              border: "none",
              padding: "2px",
              bottom: "5%",
              right: "2%",
            }}
            onClick={handleClick}
          >
            <img style={{ width: "33px", height: "33px" }} src={camera} />
          </button>
        )}
      </div>
      {modalImport ? (
        <ImportPhoto
          setProfilPhotoUnique={setProfilPhotoUnique}
          setProfilPhoto={setProfilPhoto}
          setModalImport={setModalImport}
        />
      ) : null}
    </div>
  );
}

export default PhotoProfil;
