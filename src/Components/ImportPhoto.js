import React, { useEffect, useRef, useState } from "react";
import ReceptionPhoto from "./ReceptionPhoto";

function ImportPhoto({ setModalImport, setProfilPhoto, setProfilPhotoUnique }) {
  const divRef = useRef();
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    document.onclick = function (e) {
      if (e.target == divRef.current) {
        setModalImport(false);
      }
    };
  }, []);

  const handleChange = (e) => {
    const formData = new FormData();
    // Ajoute la photo sélectionnée à l'objet FormData
    formData.append("photo", e.target.files[0]);

    // Envoie la requête POST avec fetch
    fetch("http://www.localhost:8000/php/getPhotoProfil.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data != "") {
          setLoading(false);
          setPhoto(data);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      ref={divRef}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,.8)",
        top: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        zIndex: "2",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          minHeight: "400px",
          width: "700px",
          boxShadow:
            "0 12px 28px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        {loading ? (
          <div style={{ padding: "0 10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 10px",
              }}
            >
              <div></div>
              <h2 style={{ fontSize: "19px", color: "#050505" }}>
                Mettre à jour la photo de profil
              </h2>
              <div
                onClick={() => setModalImport(false)}
                style={{
                  backgroundColor: "#D8DADF",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "100%",
                }}
              >
                <i
                  style={{
                    textAlign: "center",
                    width: "20px",
                    height: "20px",
                    backgroundImage:
                      'url("https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/fU_qyUls-jF.png")',
                    backgroundPosition: "0 -105px",
                    display: "inline-block",
                  }}
                ></i>
              </div>
            </div>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#dadde1",
                color: "#dadde1",
                border: "none",
                width: "100%",
                marginBottom: "14px",
              }}
            />

            <label
              htmlFor="photo"
              style={{
                backgroundColor: "#E7F3FF",
                display: "block",
                textAlign: "center",
                padding: "8px 0",
                borderRadius: "5px",
              }}
            >
              <span
                style={{
                  color: "#1877f2",
                  fontWeight: "bold",
                  fontSize: "13.5px",
                }}
              >
                <span style={{ fontSize: "17px" }}>+</span> Importer une photo
              </span>
              <input
                onChange={handleChange}
                style={{ display: "none" }}
                type="file"
                id="photo"
                name="photo"
              />
            </label>
          </div>
        ) : (
          <ReceptionPhoto
            setProfilPhotoUnique={setProfilPhotoUnique}
            setProfilPhoto={setProfilPhoto}
            setModalImport={setModalImport}
            photo={photo}
          />
        )}
      </div>
    </div>
  );
}

export default ImportPhoto;
