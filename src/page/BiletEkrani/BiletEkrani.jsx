import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Koltuk from "../../components/Koltuk/Koltuk";
import { SatinAlma } from "../../components/SatinAlma/SatinAlma";
import { click } from "../../store/cinema";
import "./BiletEkrani.css";

const BiletEkrani = () => {
  let params = useParams(); //url deki paramatreleri alabilmek icin  param.id sadece yani

  let dispatch = useDispatch(); //reduxtaki reducerlara erismek icin.

  const cinema = useSelector(
    (
      state // use selecctor global degiskene erisebilmek icin
    ) => state.cinema.cinemaData.find((i) => i.id === Number(params.id)) /// bilet erkaninda olan cinamaya erismek icin sadece
  );

  const seciliKoltuklar = cinema.koltuklar.filter((x) => {
    return x.secildi === 1; // x dedigimiz koltuklar lisetinde bir adet koltuk.filter o koltuklari foreach gibi ariyor.x.secildi 1 e esit olanlari  filtreleyip getir diyoruz.
  });

  const onKoltukClick = (koltuk) => {
    dispatch(click({ filmId: Number(params.id), koltuk: koltuk }));// verdigimiz paramtre
  };

  return (
    <div className="BiletEkran">
      <h1 className="Baslik">Cinema ID: {params.id}</h1>
      <h1 className="Baslik">Cinema Film Adi: {cinema.film}</h1>
      <h1 className="Baslik">Bilet Fiyati: {cinema.fiyat}</h1>
      <h1 className="Baslik">Fiyat: {seciliKoltuklar.length * cinema.fiyat}</h1>
      <div className="bilet-koltuk">
        {cinema.koltuklar.map((x, index) => {
          // map ile tekrar dondurdugumuz icin kul
          return (
            <Koltuk
              classname="koltuklar"
              onClick={() => onKoltukClick(x)}
              key={x.id}
              koltuk={x}
            />
          );
        })}
      </div>
      {seciliKoltuklar.length > 0 ? (
        <div>
          <SatinAlma cinema={cinema} seciliKoltuklar={seciliKoltuklar} />
        </div>
      ) : null}
    </div>
  );
};

export default BiletEkrani;
