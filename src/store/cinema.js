import { createSlice } from "@reduxjs/toolkit";
import { cinemaData } from "../data";

export const userSlice = createSlice({
  name: "cinema",
  initialState: { cinemaData: cinemaData, purchased: [] },
  reducers: {
    satinAl: (state, action) => {
      let filmId = action.payload.filmId;
      let film = state.cinemaData.find((x) => x.id === filmId);
      let satinAlinanKoltuklar = [...action.payload.koltuklar];

      let tmpKoltuklar = satinAlinanKoltuklar.map((element) => {
        // satinalinankoltuklar liste element foreach gibi.
        let tmp = { ...element }; //elementin icindeki seyleri tmp e atiyoruz
        tmp.secildi = 0; //satin alindiysa  secildi 0 olmasi gerekmekte.
        tmp.alinabilir = 0; // ayni sekilde
        return tmp;
      });

      const newPurchase = {
        user: action.payload.userDetails,
        satinAlinanKoltuklar: satinAlinanKoltuklar,
        film: film,
      };

      //satin alinanlara ekledik
      state.purchased.push(newPurchase);

      let newKoltuklar = film.koltuklar.map((item) => {
        // satin alinan koltuklar tek bi koltuk olmayabilir film koltuklari dolasiyoruz eger uyusuyorsa guncelliyoz
        // tum koltuklari dolasiyoruz
        let item2 = tmpKoltuklar.find((i2) => i2.id === item.id); //eger temp koltuklarda var ise onu update et.
        return item2 ? { ...item, ...item2 } : item; // item2 bulunuyosa o zaman item ve item 2 getiriliyor.DEgilse item geliyor.
      });

      film.koltuklar = newKoltuklar; // koltuklar guncelendi

      let guncellenmisFilmler = state.cinemaData.map((x) => {
        //son olarak da butun filmler guncellenmeli
        if (x.id === film.id) {
          let tmp = { ...film };// icindeki objeler olsun diye.
          return tmp;
        }
        return x;
      });

      state.cinemaData = guncellenmisFilmler; //global degiskene state i esitliyoruz.
    },

    click: (state, action) => {
      //state suanki kisim,action cagirinca gelicek kisim payload action icindeki objeler
      //film id
      // koltuk id

      let filmId = action.payload.filmId; //once film id sini alcaz
      let film = state.cinemaData.find((x) => x.id === filmId); // filmi buluyoruz ,xx lambda ifadesi
      let koltuk = { ...action.payload.koltuk }; // bir koltuga erisiyoruz

      const koltukEskiHali = film.koltuklar.find((x) => x.id === koltuk.id);

      if (koltukEskiHali.alinabilir === 1) {
        koltuk.secildi = koltukEskiHali.secildi === 0 ? 1 : 0;

        let newKoltukListesi = film.koltuklar.map((x) => {
          if (x.id === koltuk.id) {
            // tikladigim kisim koltuga esit ise
            let tmp = { ...x, secildi: koltuk.secildi }; //secildi fieldini koltuk.secildi olrak degistir 0 sa 1 1 se 0
            return tmp; //guncel halini dondur
          }
          return x; // secilmiyosa direk x i dondur
        });

        film.koltuklar = newKoltukListesi;

        let guncellenmisFilmler = state.cinemaData.map((x) => {
          if (x.id === film.id) {
            let tmp = { ...film };
            return tmp;
          }
          return x; // tekrar guncelle kismi
        });

        state.cinemaData = guncellenmisFilmler;
      }
    },
  },
});

export const { click, satinAl } = userSlice.actions; // reducerlari disari export etmeliyiz. YAzip bisi eklemezsek erisemeyiz
export default userSlice.reducer;


//map metodu dizideki butun elemanlari islemden gecirmemizi sagliyor . 
// find metodu filteri benzer.Dizi icindeki  kosula uygun olan ilk elemani seciyoruz.
// filter metodu filtreler.10 dan buyuk olanalr gelsin diyoz mesela onlar gelir.Ama find da 10 dan buyuk dersek ilk 10 dan buyuk deger gelir.