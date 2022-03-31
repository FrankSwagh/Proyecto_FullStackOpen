import React from "react";

const ImprimirBusqueda = ({ persons, newSearch }) => {
  let minus = newSearch.toLowerCase();
  let mayus = newSearch.toString().toLowerCase();
  let primeraLetra = mayus.slice(0, 1);
  let Letras = mayus.replace(primeraLetra, primeraLetra.toUpperCase());
  let buscado = [];
  let nombres = [];
  let arreglo = [];
  let temp;
  persons.map((indice) => nombres.push(indice.name));

  nombres.map((indi) => {
    if (indi.indexOf(Letras) !== -1 || indi.indexOf(minus) !== -1)
      buscado.push(indi);
    return buscado;
  });
  buscado.map((nombs) => {
    temp = persons.find((elem) => elem.name === nombs);
    arreglo.push(temp);
    return arreglo;
  });

  return (
    <div>
      {arreglo.map((persona) => (
        <li key={persona.id}>
          {persona.name}
          {persona.number}
        </li>
      ))}
    </div>
  );
};

export default ImprimirBusqueda;
