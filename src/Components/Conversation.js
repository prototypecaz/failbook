import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Conversation({
  username,
  socket,
  idSocket,
  conversation,
  idIdentifiant,
  typing,
  userChoose,
  setUserChoose,
  profilPhoto,
}) {
  const [open, setOpen] = useState(false);
  const { nombreMessengerVu, setNombreMessengerVu, currentUser } =
    useContext(AuthContext);

  useEffect(() => {
    if (userChoose.identifiant == idIdentifiant) {
      setOpen(true);
    }
  }, [userChoose]);

  const messageBody = useRef();
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    const copyNombreMessengerVu = [...nombreMessengerVu];

    setNombreMessengerVu(
      copyNombreMessengerVu.filter((x) => {
        if (x.fromIdentifiantUser != idIdentifiant) {
          return x;
        }
      })
    );

    const local = JSON.parse(localStorage.getItem("messengerVu"));
    const newLocal = local.filter((x) => {
      if (x.fromIdentifiantUser != idIdentifiant) {
        return x;
      }
    });
    localStorage.setItem("messengerVu", JSON.stringify(newLocal));

    fetch(
      "http://www.localhost:8000/php/getNombreMessengerVu.php?toIdentifiantUserFocus=" +
        currentUser[0] +
        "&fromIdentifiantUserFocus=" +
        idIdentifiant,

      { credentials: "include" }
    );
  };

  const handleClick = () => {
    if (inputValue !== "") {
      setMessage([...message, inputValue]);
      socket.emit("newMessageForServer", {
        text: inputValue,
        to: idSocket,
        from: socket["_opts"].query.userId,
        toIdBdd: idIdentifiant,
      });
      
      setInputValue("");
    }
  };

  let isTyping = false;
  let typingTimeout;

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleClick();
    }

    if (!isTyping) {
      isTyping = true;
      socket.emit("typing", {
        to: idSocket,
        message: true,
        from: socket["_opts"].query.userId,
      });
    }

    clearTimeout(typingTimeout);
  };

  const handleKeyUp = () => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      isTyping = false;
      socket.emit("typing", {
        to: idSocket,
        message: false,
        from: socket["_opts"].query.userId,
      });
    }, 3000);
  };

  const scrollToBottom = () => {
    if (open) {
      messageBody.current.scrollTop =
        messageBody.current.scrollHeight - messageBody.current.clientHeight;
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserChoose([]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, open]);

  return (
    <>
      {open && (
        <div
          style={{
            width: "320px",
            boxShadow:
              "0 12px 28px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1)",
            borderRadius: "8px 8px 0 0 ",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: " 8px",
              backgroundColor: "white",
              borderRadius: "8px 8px 0 0 ",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.1),0 -1px rgba(0,0,0,0.1) inset, 0 2px 1px -1px rgba(255,255,255,0.5) inset ",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "100%",
                  }}
                  src={require("../assets/upload/" + profilPhoto)}
                />
              </div>
              <div style={{ color: "#050505" }}>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {username}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "#686a6e",
                  }}
                >
                  En ligne
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                width: "100px",
              }}
            >
              <svg viewBox="-5 -5 30 30">
                <path
                  d="M10.952 14.044c.074.044.147.086.22.125a.842.842 0 001.161-.367c.096-.195.167-.185.337-.42.204-.283.552-.689.91-.772.341-.078.686-.105.92-.11.435-.01 1.118.174 1.926.648a15.9 15.9 0 011.713 1.147c.224.175.37.43.393.711.042.494-.034 1.318-.754 2.137-1.135 1.291-2.859 1.772-4.942 1.088a17.47 17.47 0 01-6.855-4.212 17.485 17.485 0 01-4.213-6.855c-.683-2.083-.202-3.808 1.09-4.942.818-.72 1.642-.796 2.136-.754.282.023.536.17.711.392.25.32.663.89 1.146 1.714.475.808.681 1.491.65 1.926-.024.31-.026.647-.112.921-.11.35-.488.705-.77.91-.236.17-.226.24-.42.336a.841.841 0 00-.368 1.161c.04.072.081.146.125.22a14.012 14.012 0 004.996 4.996z"
                  fill="#0084ff"
                ></path>
                <path
                  d="M10.952 14.044c.074.044.147.086.22.125a.842.842 0 001.161-.367c.096-.195.167-.185.337-.42.204-.283.552-.689.91-.772.341-.078.686-.105.92-.11.435-.01 1.118.174 1.926.648.824.484 1.394.898 1.713 1.147.224.175.37.43.393.711.042.494-.034 1.318-.754 2.137-1.135 1.291-2.859 1.772-4.942 1.088a17.47 17.47 0 01-6.855-4.212 17.485 17.485 0 01-4.213-6.855c-.683-2.083-.202-3.808 1.09-4.942.818-.72 1.642-.796 2.136-.754.282.023.536.17.711.392.25.32.663.89 1.146 1.714.475.808.681 1.491.65 1.926-.024.31-.026.647-.112.921-.11.35-.488.705-.77.91-.236.17-.226.24-.42.336a.841.841 0 00-.368 1.161c.04.072.081.146.125.22a14.012 14.012 0 004.996 4.996z"
                  fill="none"
                  stroke="#0084ff"
                ></path>
              </svg>

              <svg role="presentation" viewBox="-5 -5 30 30">
                <path
                  d="M19.492 4.112a.972.972 0 00-1.01.063l-3.052 2.12a.998.998 0 00-.43.822v5.766a1 1 0 00.43.823l3.051 2.12a.978.978 0 001.011.063.936.936 0 00.508-.829V4.94a.936.936 0 00-.508-.828zM10.996 18A3.008 3.008 0 0014 14.996V5.004A3.008 3.008 0 0010.996 2H3.004A3.008 3.008 0 000 5.004v9.992A3.008 3.008 0 003.004 18h7.992z"
                  fill="#0084ff"
                ></path>
              </svg>
              <svg viewBox="-4 -4 24 24">
                <line
                  stroke="#0084ff"
                  strokeLinecap="round"
                  strokeWidth="2"
                  x1="2"
                  x2="14"
                  y1="8"
                  y2="8"
                ></line>
              </svg>
              <svg
                onClick={handleClose}
                style={{ cursor: "pointer" }}
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <g stroke="#0084ff" strokeLinecap="round" strokeWidth="2">
                  <line x1="6" x2="18" y1="6" y2="18"></line>
                  <line x1="6" x2="18" y1="18" y2="6"></line>
                </g>
              </svg>
            </div>
          </div>

          <div
            ref={messageBody}
            className="scrollConverse"
            style={{
              height: "348px",
              backgroundColor: "white",
              fontSize: "15px",
              overflowY: "scroll",
              padding: "5px 20px 5px 5px",
            }}
          >
            {conversation.map((x, index) => {
              if (idIdentifiant == x.from || idIdentifiant == x.fromToken) {
                return (
                  <div
                    key={index}
                    style={{
                      margin: "3px 0",
                      display: "flex",
                      alignItems: "end",
                      gap: "8px",
                    }}
                  >
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "100%",
                      }}
                      src={require("../assets/upload/" + profilPhoto)}
                    />
                    <p
                      className="userChoose"
                      style={{
                        color: "black",
                        backgroundColor: "#e4e6eb",
                        display: "inline-block",
                        padding: "10px",
                        borderRadius: "18px",
                      }}
                    >
                      {x.message}
                    </p>
                  </div>
                );
              } else if (
                idSocket == x.to ||
                idIdentifiant == x.toToken ||
                idIdentifiant == x.to
              ) {
                return (
                  <div
                    key={index}
                    style={{ textAlign: "right", margin: "3px 0 " }}
                  >
                    <p
                      className="userChoose"
                      style={{
                        color: "white",
                        backgroundColor: "#0084ff",
                        display: "inline-block",
                        padding: "10px",
                        borderRadius: "18px",
                        maxWidth: "90%",
                        wordWrap: "break-word",
                        textAlign: "left",
                      }}
                    >
                      {x.message}
                    </p>
                  </div>
                );
              }
            })}

            {typing.message && (
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  backgroundColor: "#e4e6eb",
                  padding: "14px 12px",
                  borderRadius: "18px",
                  width: "20px",
                }}
              >
                <div className="rond rond1"></div>
                <div className="rond rond2"></div>
                <div className="rond rond3"></div>
              </div>
            )}
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "13px 7px",
              display: "flex",
              gap: "10px",
              backgroundColor: "white",
              alignItems: "center",
            }}
          >
            <svg viewBox="0 0 24 24" width="20px" height="20px">
              <g fillRule="evenodd">
                <polygon
                  fill="none"
                  points="-6,30 30,30 30,-6 -6,-6 "
                ></polygon>
                <path
                  fill="#0084ff"
                  d="m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12"
                ></path>
              </g>
            </svg>
            <svg
              className={inputValue !== "" ? "blocSvg" : null}
              viewBox="0 -1 17 17"
              width="20px"
              height="20px"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="#0084ff"
                  d="M2.882 13.13C3.476 4.743 3.773.48 3.773.348L2.195.516c-.7.1-1.478.647-1.478 1.647l1.092 11.419c0 .5.2.9.4 1.3.4.2.7.4.9.4h.4c-.6-.6-.727-.951-.627-2.151z"
                ></path>
                <circle cx="8.5" cy="4.5" r="1.5"></circle>
                <path
                  fill="white"
                  d="M14 6.2c-.2-.2-.6-.3-.8-.1l-2.8 2.4c-.2.1-.2.4 0 .6l.6.7c.2.2.2.6-.1.8-.1.1-.2.1-.4.1s-.3-.1-.4-.2L8.3 8.3c-.2-.2-.6-.3-.8-.1l-2.6 2-.4 3.1c0 .5.2 1.6.7 1.7l8.8.6c.2 0 .5 0 .7-.2.2-.2.5-.7.6-.9l.6-5.9L14 6.2z"
                ></path>
                <path
                  fill="#0084ff"
                  d="M13.9 15.5l-8.2-.7c-.7-.1-1.3-.8-1.3-1.6l1-11.4C5.5 1 6.2.5 7 .5l8.2.7c.8.1 1.3.8 1.3 1.6l-1 11.4c-.1.8-.8 1.4-1.6 1.3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <svg
              className={inputValue !== "" ? "blocSvg" : null}
              height="20px"
              viewBox="0 0 17 16"
              width="20px"
              x="0px"
              y="0px"
            >
              <g fillRule="evenodd">
                <circle cx="5.5" cy="5.5" fill="none" r="1"></circle>
                <circle cx="11.5" cy="4.5" fill="none" r="1"></circle>
                <path
                  fill="none"
                  d="M5.3 9c-.2.1-.4.4-.3.7.4 1.1 1.2 1.9 2.3 2.3h.2c.2 0 .4-.1.5-.3.1-.3 0-.5-.3-.6-.8-.4-1.4-1-1.7-1.8-.1-.2-.4-.4-.7-.3z"
                ></path>
                <path
                  fill="#0084ff"
                  d="M10.4 13.1c0 .9-.4 1.6-.9 2.2 4.1-1.1 6.8-5.1 6.5-9.3-.4.6-1 1.1-1.8 1.5-2 1-3.7 3.6-3.8 5.6z"
                ></path>
                <path
                  fill="#0084ff"
                  d="M2.5 13.4c.1.8.6 1.6 1.3 2 .5.4 1.2.6 1.8.6h.6l.4-.1c1.6-.4 2.6-1.5 2.7-2.9.1-2.4 2.1-5.4 4.5-6.6 1.3-.7 1.9-1.6 1.9-2.8l-.2-.9c-.1-.8-.6-1.6-1.3-2-.7-.5-1.5-.7-2.4-.5L3.6 1.5C1.9 1.8.7 3.4 1 5.2l1.5 8.2zm9-8.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3.57 6.662c.3.1.4.4.3.6-.1.3-.3.4-.5.4h-.2c-1-.4-1.9-1.3-2.3-2.3-.1-.3.1-.6.3-.7.3-.1.5 0 .6.3.4.8 1 1.4 1.8 1.7zM5.5 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
                  fillRule="nonzero"
                ></path>
              </g>
            </svg>
            <svg
              className={inputValue !== "" ? "blocSvg" : null}
              height="20px"
              viewBox="0 0 16 16"
              width="20px"
              x="0px"
              y="0px"
            >
              <path
                fill="#0084ff"
                d="M.783 12.705c.4.8 1.017 1.206 1.817 1.606 0 0 1.3.594 2.5.694 1 .1 1.9.1 2.9.1s1.9 0 2.9-.1 1.679-.294 2.479-.694c.8-.4 1.157-.906 1.557-1.706.018 0 .4-1.405.5-2.505.1-1.2.1-3 0-4.3-.1-1.1-.073-1.976-.473-2.676-.4-.8-.863-1.408-1.763-1.808-.6-.3-1.2-.3-2.4-.4-1.8-.1-3.8-.1-5.7 0-1 .1-1.7.1-2.5.5s-1.417 1.1-1.817 1.9c0 0-.4 1.484-.5 2.584-.1 1.2-.1 3 0 4.3.1 1 .2 1.705.5 2.505zm10.498-8.274h2.3c.4 0 .769.196.769.696 0 .5-.247.68-.747.68l-1.793.02.022 1.412 1.252-.02c.4 0 .835.204.835.704s-.442.696-.842.696H11.82l-.045 2.139c0 .4-.194.8-.694.8-.5 0-.7-.3-.7-.8l-.031-5.631c0-.4.43-.696.93-.696zm-3.285.771c0-.5.3-.8.8-.8s.8.3.8.8l-.037 5.579c0 .4-.3.8-.8.8s-.8-.4-.8-.8l.037-5.579zm-3.192-.825c.7 0 1.307.183 1.807.683.3.3.4.7.1 1-.2.4-.7.4-1 .1-.2-.1-.5-.3-.9-.3-1 0-2.011.84-2.011 2.14 0 1.3.795 2.227 1.695 2.227.4 0 .805.073 1.105-.127V8.6c0-.4.3-.8.8-.8s.8.3.8.8v1.8c0 .2.037.071-.063.271-.7.7-1.57.991-2.47.991C2.868 11.662 1.3 10.2 1.3 8s1.704-3.623 3.504-3.623z"
                fillRule="nonzero"
              ></path>
            </svg>
            <div
              className={inputValue !== "" ? "blocInput" : null}
              style={{
                width: "44%",
                backgroundColor: "#f0f2f5",
                padding: "10px",
                display: "flex",
                borderRadius: "18px",
                height: "15px",
                maxHeight: "100px",
              }}
            >
              <textarea
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                value={inputValue}
                type="text"
                placeholder="Aa"
                style={{
                  width: "80%",
                  border: "none",
                  backgroundColor: "#f0f2f5",
                }}
              />
            </div>
            <svg
              aria-hidden="true"
              height="20px"
              viewBox="0 0 16 16"
              width="20px"
            >
              <path
                fill="#0084ff"
                d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z"
              ></path>
              <path
                fill="#0084ff"
                d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

export default Conversation;
