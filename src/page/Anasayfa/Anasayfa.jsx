import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilmListItem from "../../components/FilmListItem/FilmListItem";
import "./Anasayfa.css";

const Anasayfa = () => {
  const cinemaList = useSelector((state) => state.cinema.cinemaData);
  let navigate = useNavigate();
  const [selectedSalon, setselectedSalon] = useState(1);



  return (
    <div className="Anaekran">
      
      <div className="admin-btn-div">
        <button className="admin-btn" onClick={() => navigate("/admin")}>
          Admin Panel
        </button>
      </div>

      <select 
        defaultValue={1}
        className="select-input"
        onChange={(e) => setselectedSalon(Number(e.target.value))}
      >
        <option value={1}>Salon 1</option>
        <option value={2}>Salon 2</option>
        <option value={3}>Salon 3</option>
        <option value={4}>Salon 4</option>
      </select>

      {
        cinemaList
          .filter((x) => x.salon === selectedSalon)
          ?.map((cinema ) => { // doncegi her elemani cinema olarak ariyor.Index olarak da siraliyor.
            return <FilmListItem key={cinema.id} cinema={cinema} />;
          })}
      
    </div>
  );
};

export default Anasayfa;
