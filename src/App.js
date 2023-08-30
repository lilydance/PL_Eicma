import Header from "./compTransporte/Header";
import Vehiculo from "./compTransporte/Vehiculo";
import PlanMantenimiento from "./compTransporte/PlanMantenimiento";
import Anexo1 from './compTransporte/Anexo1';
import Anexo2 from './compTransporte/Anexo2';
import Combustible from './compCombustible/Combustible';
import Tarjetas from './compCombustible/Tarjetas';
import Tickets from './compCombustible/Tickets';
import Equipo from './compTransporte/EquipoEquipo';
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Outlet } from "react-router-dom";
import { Component } from "react";
import './index.css';

export default function App() {
  return (
    <Header>
      <Routes>
        <Route path="/combustible" element={<Combustible />} />
        <Route path="/vehiculo" element={<Vehiculo />} />
        <Route path="/tarjetas" element={<Tarjetas />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/planMant" element={<PlanMantenimiento />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/tarjeDudosas" element={<Anexo1 />} />
        <Route path="/anexo2" element={<Anexo2 />} />

      </Routes>
    </Header>

  );
}
