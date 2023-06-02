import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NombreAmi(props) {
  const [ami, setAmi] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      "http://www.localhost:8000/php/getContact.php?id=" + id,

      { credentials: "include" }
    ).then(function (response) {
      response.json().then(function (themes) {
        setAmi(themes);
        setLoading(false);
      });
    });
  }, [id]);

  return (
    <>
      {!loading && (
        <>
          <span style={{ color: "#65676b" }}>{ami.length} amis</span>

          <div style={{ position: "relative", width: "100%", height: "35px" }}>
            {ami.map((x, index) => (
              <img
                key={index}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "100%",
                  border: "2px solid white",
                  position: "absolute",
                  left: index + "0" + "%",
                  order: index,
                  zIndex: ami.length - index,
                }}
                src={require("../assets/upload/" + x.profilPhoto)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default NombreAmi;
