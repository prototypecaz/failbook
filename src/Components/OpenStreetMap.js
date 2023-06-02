import { useEffect, useRef, useState } from "react";
import search from "../assets/icones/search.png";

const OpenStreetMap = ({ setCitiesChoose, setValueModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (inputValue !== "") {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&type=city&limit=10&apiKey=84464df404f2411483689382e48a0bdf`,
        { signal }
      )
        .then((response) => response.json())
        .then((data) => {
          setCities(data.features);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setCities([]);
    }

    return () => {
      controller.abort();
    };
  }, [inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 20px",
          borderBottom: "1px solid #e5e5e5",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#e4e6eb",
            display: "flex",
            alignItems: "center",
            borderRadius: "100%",
            padding: "9px",
          }}
          onClick={() => setValueModal("")}
        >
          <i
            style={{
              backgroundImage:
                "url('https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/rQp6okZNzWW.png')",
              backgroundPosition: "-25px -59px",
              backgroundSize: "auto",
              width: "20px",
              height: "20px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          />
        </div>
        <h3 style={{ textAlign: "center" }}>Rechercher un lieu</h3>
        <aside></aside>
      </div>

      <div
        style={{
          width: "80%",
          backgroundColor: "#e4e6eb",
          height: "35px",
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          padding: " 0 13px",
          gap: "10px",
          margin: "10px auto",
        }}
      >
        <img src={search} style={{ width: "18px" }} />
        <input
          placeholder="Ou etes-vous ?"
          value={inputValue}
          onChange={handleChange}
          style={{
            height: "50%",
            backgroundColor: "#e4e6eb",
            border: "none",
            fontSize: "16px",
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        {cities.map((city) => (
          <div
            onClick={() => {
              setCitiesChoose([city]);
              setValueModal("");
            }}
            key={city.properties.osm_id}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  backgroundColor: "#838488",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  padding: "0 5px",
                }}
              >
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/5AmCdexsMi-.png"
                  alt=""
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {city.properties.city}
                </span>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  {city.properties.postcode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenStreetMap;

