import React from "react";

const Busqueda = ({ buscarPersona, newSearch }) => {
  return (
    <div>
      filter shown with <input value={newSearch} onChange={buscarPersona} />
    </div>
  );
};
export default Busqueda;
