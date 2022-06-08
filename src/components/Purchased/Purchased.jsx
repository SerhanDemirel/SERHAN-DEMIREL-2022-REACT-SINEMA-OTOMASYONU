import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PurchasedItem from "./PurchasedItem";
import "./Purchased.css";
export const Purchased = () => {
  const satinAlinanlar = useSelector((state) => state.cinema.purchased);

  const [selectedSalon, setSelectedSalon] = useState(1);
  const [selectedFilm, setSelectedFilm] = useState();

  const getFilms = () => {
    let arr = [];
    satinAlinanlar.forEach((element) => {
      if (arr.indexOf(element.film.filmAdi) === -1) { // index of lisetedeki adresi -1 dondururse yok demek.yoksa array push ekliyoruz.
        arr.push(element.film.filmAdi);
      }
    });
    return arr;
  };

  useEffect(() => {  // icindeki durum degisirse o zaman calisiyor.Component render olunca use effect calisiyor.koseli paranteze bisi yazinca o calisiyor
    setSelectedFilm(getFilms()[0]);
  }, []); // her halukarda bu fonksiyon bi kere calissin

  return (
    <div className="purchase">
      <select
        className="select-input"
        defaultValue={1} // 1 otomatik secilmis
        onChange={(e) => setSelectedSalon(e.target.value)}
      >
        <option value={1}>Salon 1</option>
        <option value={2}>Salon 2</option>
        <option value={3}>Salon 3</option>
        <option value={4}>Salon 4</option>
      </select>

      <select
        className="select-input"
        defaultValue={selectedFilm}
        onChange={(e) => setSelectedFilm(e.target.value)}
      >
        {getFilms().map((x) => {
          return ( // her x kadar option ekliyoruz.Map icindeki eleman kadar donuyor.
            <option key={x} value={x}>
              {x}
            </option>
          );
        })}
      </select>

      {satinAlinanlar
        .filter(
          (x) => x.film.salon === selectedSalon && x.film.filmAdi === selectedFilm
        )
        .map((y, index) => {
          return <PurchasedItem key={index} data={y} />;
        })}
    </div>
  );
};
