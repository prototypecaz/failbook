import React, { useEffect, useState } from "react";
import BarreLimite from "./BarreLimite";
import ChatGroup from "./ChatGroup";
import ChatUser from "./ChatUser";
import PageProfilDash from "./PageProfilDash";
import SponsorDash from "./SponsorDash";

function BlocEnd(props) {
  return (
    <div
      style={{
        flexBasis: "9%",
        flexGrow: 1,
        flexShrink: 1,
        padding: "0 20px",
        position: "sticky",
        top: "60px",
        maxHeight: 0,
      }}
    >
      <SponsorDash />

      <BarreLimite />

      <PageProfilDash />

      <BarreLimite />

      <ChatUser />

      <BarreLimite />

      <ChatGroup />
    </div>
  );
}

export default BlocEnd;
