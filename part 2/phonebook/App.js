import React, { useState } from "react";
import AgregarNombre from "./components/AgregarNombre";
import Busqueda from "./components/Buscar";
import ImprimirBusqueda from "./components/ImprimirBusqueda";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setSearch] = useState("");

  const ImprimirNombres = (event) => {
    event.preventDefault();
    console.log("algo?");
    if (Alerta()) {
      const newPerson = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
    } else {
      setNewName("");
      setNewPhone("");
    }
    setNewName("");
      setNewPhone("");
  };

  const Alerta = () => {
    let sino = false;
    persons.map((indice) => {
      let nombres = [];
      nombres.push(indice.name);
      if (nombres.includes(newName)) {
        window.alert(`${newName} is already in phonebook`);
        sino = false;
      } else {
        sino = true;
      }
      return sino;
    });
    return sino;
  };

  const CambiarNombre = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const CambiarTelefono = (event) => {
    setNewPhone(event.target.value);
    console.log(event.target.value);
  };

  const BuscarPersona = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Busqueda buscarPersona={BuscarPersona} newSearch={newSearch} />
      <h2>Add a new</h2>
      <AgregarNombre
        ImprimirNombres={ImprimirNombres}
        newName={newName}
        CambiarNombre={CambiarNombre}
        newPhone={newPhone}
        CambiarTelefono={CambiarTelefono}
      />
      <h2>Numbers</h2>
      <ImprimirBusqueda persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;