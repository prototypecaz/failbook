import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AllPhotosProfil() {
  
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getPublication.php?idUserPhoto=" + id,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAllPhotos(themes);
        setLoading(false);
      });
    });
  }, [id]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Photos</span>
        <span style={{ color: "#1F7ADC" }}>Toutes les photos</span>
      </div>

      {!loading && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            overflow: "hidden",
            justifyContent: "start",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {allPhotos.map((x, index) => (
            <Link key={index} to={"/photoUser/" + x.id + "/user/" + id}>
              <img
                src={require("../assets/upload/" + x.photoPublication)}
                style={{ width: "148px", height: "148px" }}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default AllPhotosProfil;
