function ErreurConfirmation({ setErreurModal, titre, paragraphe }) {
  const handleClick = () => {
    setErreurModal(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "rgba(255,255,255,.8)",
        position: "fixed",
        top: "0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "-180px",
          borderRadius: "6px",
          padding: "22px",
          width: "565px",
          backgroundColor: "white",
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "21px" }}>{titre}</h3>
          <button
            onClick={handleClick}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "100%",
              padding: "7px 7px 5px 7px",
            }}
          >
            <img src={require("../assets/images/close.png")} />
          </button>
        </div>
        <p style={{ fontSize: "15px", color: "#606770", margin: "35px 0" }}>
          {paragraphe}
        </p>

        <button
          onClick={handleClick}
          style={{
            cursor: "pointer",
            float: "right",
            padding: "10px 40px",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#216fdb",
          }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default ErreurConfirmation;
