import "./App.css";
import Anasayfa from "./page/Anasayfa/Anasayfa";
import BiletEkrani from "./page/BiletEkrani/BiletEkrani";
import { Route, Routes } from "react-router-dom";
import Admin from "./page/Admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Anasayfa />} />
      <Route path="/bilet/:id" element={<BiletEkrani />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
