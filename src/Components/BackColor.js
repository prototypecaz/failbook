import React, { useEffect, useRef, useState } from "react";

function BackColor({ colorChoose, setValueText }) {
  const divRef = useRef();
  const spanRef = useRef();

  const handleKey = (event) => {
    const maxLength = 200;
    if (event.target.textContent.length >= maxLength && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  const handleInput = (e) => {
    setValueText(e.target.textContent);
    spanRef.current.textContent = "";

    if (e.target.textContent == "") {
      spanRef.current.textContent = "Que voulez-vous dire ?";
    }
  };

  useEffect(() => {
    divRef.current.focus();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        backgroundColor: colorChoose,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        id="spanRef"
        ref={spanRef}
        style={{
          position: "absolute",
          mixBlendMode: "difference",
          color: "grey",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Que voulez vous dire ?
      </span>
      <div
        ref={divRef}
        id="textColor"
        aria-label=""
        style={{
          userSelect: "text",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "rgb(255, 255, 255)",
          fontSize: "30px",
          width: "100%",
          padding: "15px",
          textAlign: "center",
          mixBlendMode: "difference",
          color: "grey",
          fontWeight: "bold",
        }}
        contentEditable={true}
        maxLength={10}
        onKeyDown={handleKey}
        onInput={handleInput}
      >
        <p
          maxLength={30}
          style={{
            textAlign: "center",
            mixBlendMode: "difference",
            color: "grey",
            fontWeight: "bold",
          }}
        >
          <br />
        </p>
      </div>
    </div>
  );
}

export default BackColor;
