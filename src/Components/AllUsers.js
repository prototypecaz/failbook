import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function AllUsers({ allUsers, setUserChoose }) {
  const { socket } = useContext(AuthContext);
  
  const handleClick = (user) => {
    setUserChoose(user);
  };

  return (
    <div>
      <div
        style={{
          padding: "0 13px",
          display: "flex",
          flexDirection: "column",
          gap: "13px",
        }}
      >
        {allUsers.map((x, index) => {
          return (
            x.identifiant !== socket["_opts"].query.userId && (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "10px",
                }}
              >
                <img
                  src={require("../assets/upload/" + x.profilPhoto)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "100%",
                  }}
                />
                <p
                  className="userChoose"
                  onClick={() => {
                    handleClick(x);
                  }}
                  id={x.id}
                >
                  {x.username}
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default AllUsers;
