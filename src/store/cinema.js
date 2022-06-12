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
       
        let tmp = { ...element }; 
        tmp.secildi = 0; 
        tmp.alinabilir = 0; 
        return tmp;
      });

      const newPurchase = {
        user: action.payload.userDetails,
        satinAlinanKoltuklar: satinAlinanKoltuklar,
        film: film,
      };

      
      state.purchased.push(newPurchase);

      let newKoltuklar = film.koltuklar.map((item) => {
        
        let item2 = tmpKoltuklar.find((i2) => i2.id === item.id); 
        return item2 ? { ...item, ...item2 } : item; 
      });

      film.koltuklar = newKoltuklar; 

      let guncellenmisFilmler = state.cinemaData.map((x) => {
       
        if (x.id === film.id) {
          let tmp = { ...film };
          return tmp;
        }
        return x;
      });

      state.cinemaData = guncellenmisFilmler;
    },

    click: (state, action) => {
      
    
      

      let filmId = action.payload.filmId; 
      let film = state.cinemaData.find((x) => x.id === filmId); 
      let koltuk = { ...action.payload.koltuk }; 

      const koltukEskiHali = film.koltuklar.find((x) => x.id === koltuk.id);

      if (koltukEskiHali.alinabilir === 1) {
        koltuk.secildi = koltukEskiHali.secildi === 0 ? 1 : 0;

        let newKoltukListesi = film.koltuklar.map((x) => {
          if (x.id === koltuk.id) {
            
            let tmp = { ...x, secildi: koltuk.secildi }; 
            return tmp; 
          }
          return x; 
        });

        film.koltuklar = newKoltukListesi;

        let guncellenmisFilmler = state.cinemaData.map((x) => {
          if (x.id === film.id) {
            let tmp = { ...film };
            return tmp;
          }
          return x; 
        });

        state.cinemaData = guncellenmisFilmler;
      }
    },
  },
});

export const { click, satinAl } = userSlice.actions; 
export default userSlice.reducer;


