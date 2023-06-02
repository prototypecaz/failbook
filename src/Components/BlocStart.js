import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EndHeaderIcone from "./EndHeaderIcone";
import { AuthContext } from "../context/AuthContext";

function BlocStart({ profilPhotoUnique }) {
  const { currentUser } = useContext(AuthContext);
  const profilLink = `/profil/${currentUser[0]}`;

  return (
    <div
      style={{
        flexBasis: "12%",
        height: "100vh",
        flexGrow: 1,
        flexShrink: 1,
        fontSize: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        position: "sticky",
        top: "60px",
        paddingTop: "20px",
        maxHeight: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "0 17px",
        }}
      >
        <div style={{ width: "24px" }}>
          <i
            style={{
              backgroundImage:
                "url('https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/z3SSF-GKTJj.png')",
              backgroundPosition: "0 -21px",
              backgroundSize: "auto",
              width: "20px",
              height: "20px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
              filter:
                "invert(39%) sepia(57%) saturate(200%) saturate(200%) saturate(200%) saturate(200%) saturate(200%) saturate(147.75%) hue-rotate(202deg) brightness(97%) contrast(96%)",
            }}
          />
        </div>

        <span>Accueil</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "0 17px",
        }}
      >
        <div style={{ width: "24px" }}>
          <Link to={profilLink}>
            <EndHeaderIcone width="24px" icone={profilPhotoUnique} />
          </Link>
        </div>

        <span>{currentUser[1][0].prenom + " " + currentUser[1][0].nom}</span>
      </div>

      <div style={{ padding: "0 17px" }}>
        <hr
          style={{
            height: "1px",
            backgroundColor: "#dadde1",
            color: "#dadde1",
            border: "none",
            width: "55%",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "0 17px",
        }}
      >
        <div style={{ width: "24px" }}>
          {" "}
          <i
            style={{
              backgroundImage:
                "url('https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/pFMzRgJZxnt.png')",
              backgroundPosition: "0 -25px",
              backgroundSize: "auto",
              width: "24px",
              height: "24px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          />
        </div>
        <span>Watch</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "0 17px",
        }}
      >
        <div style={{ width: "24px" }}>
          <i
            style={{
              backgroundImage:
                "url('https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/IDuJShpKhav.png')",
              backgroundPosition: "0 0",
              backgroundSize: "auto",
              width: "24px",
              height: "24px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          />
        </div>
        <span>Amis</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "0 17px",
        }}
      >
        <div style={{ width: "24px" }}>
          <i
            style={{
              backgroundImage:
                "url('https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/pFMzRgJZxnt.png')",
              backgroundPosition: "0 0",
              backgroundSize: "auto",
              width: "24px",
              height: "24px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          />
        </div>
        <span>MarketPlace</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "0 17px",
        }}
      >
        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/_qIV15fkAgk.png" />
        <span>Gaming</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          padding: "0 17px",
        }}
      >
        <i
          style={{
            backgroundImage:
              "url('https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/pK4bB6p7OS2.png')",
            backgroundPosition: "0 -168px",
            backgroundSize: "auto",
            width: "16px",
            height: "16px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
          }}
        />
        <span>Voir tout</span>
      </div>

      <div style={{ padding: "0 17px" }}>
        <hr
          style={{
            height: "1px",
            backgroundColor: "#dadde1",
            color: "#dadde1",
            border: "none",
            width: "55%",
          }}
        />
      </div>
    </div>
  );
}

export default BlocStart;
