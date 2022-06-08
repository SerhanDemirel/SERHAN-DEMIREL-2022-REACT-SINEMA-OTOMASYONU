import React from "react";
import "./Purchased.css";
const PurchasedItem = (props) => {
  const { user, film, satinAlinanKoltuklar } = props.data;
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <div className="purchase-item">
      <div>
        <h1>
          {film.filmAdi}-{film.tarih.toLocaleDateString("tr-TR", options)}
        </h1>
        <h3>
          Salon: {film.salon}- Fiyat: {film.fiyat}
        </h3>
        <h2>
          {user.name} {user.surname}
        </h2>
        <h2>
          {user.btc}
          {user.eposta}
        </h2>
      </div>
      <div>
        {satinAlinanKoltuklar.map((x) => {
          return <h2 key={x.id}>Koltuk No:{x.id}</h2>;
        })}
      </div>
    </div>
  );
};

export default PurchasedItem;
