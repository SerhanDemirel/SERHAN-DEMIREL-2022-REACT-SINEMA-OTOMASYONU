import React from "react";
import "./Koltuk.css";
const Koltuk = (props) => {
  const { onClick, koltuk } = props;

  return (
    <div
      style={{
        backgroundColor:
          koltuk.alinabilir === 1
            ? koltuk.secildi === 1
              ? "#4dd5ff"
              : "#d4d4d4"
            : "#ff4d4d",
      }}
      onClick={onClick}
      className="koltuk"
    >
      {koltuk.id} 
    </div>
  );
};

export default Koltuk;
// koltuk uzerinde yazicak sayiyi belirledik
