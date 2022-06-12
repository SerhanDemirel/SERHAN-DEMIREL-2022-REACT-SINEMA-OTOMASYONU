import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { satinAl } from "../../store/cinema";
import "./SatinAlma.css";

export const SatinAlma = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [btc, setBtc] = useState("");
  const [eposta, setEposta] = useState("");
  const [kredikart, setKredikart] = useState("");


  const { seciliKoltuklar, cinema } = props; 

  let dispatch = useDispatch(); 
  let navigate = useNavigate(); 

  const satinAlClick = () => {
    if (name !== "" && surname !== "" && btc !== "" && eposta !== "") {
      const userDetails = { name, surname, btc, eposta };

      dispatch(
        satinAl({
          filmId: cinema.id,
          koltuklar: seciliKoltuklar,
          userDetails: userDetails,
        })
      );
      alert(
        "isim : " +
          name +
          "\nsoyisim : " +
          surname +
          "\nsecilen koltuklar : " +
          seciliKoltuklar.map((x) => x.id).join(",") +
          "\nfiyatlar : " +
          seciliKoltuklar.length * cinema.fiyat
      );

      alert(eposta + " adli mail adresine bilet detaylariniz iletilmistir!");

      navigate("/"); 
    } else {
      alert("Bos Alan Birakilamaz!");
    }
  };

  return (
    <div className="SatinAlma">
      <input
        className="inputBox"
        type="text"
        placeholder="isim"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="soyisim"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="btc"
        value={btc}
        onChange={(e) => setBtc(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Kredi Karti"
        value={eposta}
        onChange={(e) => setEposta(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="eposta"
        value={kredikart}
        onChange={(e) => setKredikart(e.target.value)}
        
      />





      <button className="butonAl" onClick={() => satinAlClick()}>
        Satin Al
      </button>
    </div>
  );
};
