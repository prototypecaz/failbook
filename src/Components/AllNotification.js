import React from "react";
import { Link } from "react-router-dom";

function AllNotification({ message, idPublication, fromUserInfo }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        style={{ width: "53px", height: "53px", borderRadius: "100%" }}
        src={require("../assets/upload/" + fromUserInfo.profilPhoto)}
      />
      <Link
        style={{ width: "65%", textDecoration: "none", color: "black" }}
        to={"/publicationLike/" + idPublication}
      >
        {message}
      </Link>
    </div>
  );
}

export default AllNotification;
