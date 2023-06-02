import React, { useState, useEffect, useRef } from "react";
import emojiList from "emoji-datasource";

function EmojiList({ setModalEmojis, setValueText }) {
  const emojis = [];

  const divRef = useRef(null);

  for (let i = 0x1f600; i <= 0x1f64f; i++) {
    emojis.push(String.fromCodePoint(i));
  }

  document.onclick = function (e) {
    
    if (e.target.id !== "clicEmojis") {
      !divRef.current.contains(e.target) && setModalEmojis(false);
    }
  };

  const handleClick = (emoji) => {
    setValueText((prevstate) => prevstate + emoji);
    document.querySelector("#spanRef").textContent = "";
    document.querySelector("#textColor").textContent += emoji;
  };
  return (
    <div
      ref={divRef}
      style={{
        width: "300px",
        height: "250px",
        backgroundColor: "black",
        overflow: "scroll",
        position: "absolute",
        top: -290,
        right: -140,
        padding: "0 4px",
        borderRadius: "10px",
        filter: "drop-shadow(0 0 6px grey rgba(0,0,0,0.2)",
        boxShadow: "0 12px 28px 0 rgba(0,0,0,0.2),0 2px 4px 0 rgba(0,0,0,0.2)",
        backgroundColor: "white",
      }}
    >
      <h6 style={{ margin: "10px 0 10px 7px", color: "#97898b" }}>Emojis</h6>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          textDecoration: "none",
          listStyle: "none",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {emojis.map((emoji, index) => (
          <li
            key={index}
            onClick={() => handleClick(emoji)}
            style={{ fontSize: "27px" }}
          >
            {emoji}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmojiList;
