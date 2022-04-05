import React, { useState, useEffect } from "react";
import AgregarNombre from "./components/AgregarNombre";
import Busqueda from "./components/Buscar";
import ImprimirBusqueda from "./components/ImprimirBusqueda";
import Actividad from "./Services/phonebook";
import "./indexx.css";
import Notification from "./components/Alerta";

const Alert = ({ message }) => {
  if (message === null) {
    return null;
  }
  const AlertStyle = {
    color: "red",
    background: "lightgray",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={AlertStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    Actividad.getAll()
      .then((respose) => {
        setPersons(respose);
      })
      .catch(() => {
        console.log("Error al obtener datos");
      });
  }, []);

  const listado = persons.filter((elem) => elem.name.includes(newSearch));

  const ImprimirNombres = (event) => {
    event.preventDefault();
    if (!Alerta()) {
      const newPerson = {
        id: "",
        name: newName,
        number: newPhone,
      };
      console.log("nueva per", newPerson);
      Actividad.create(newPerson)
        .then((respose) => {
          setErrorMessage(`${newName} has been addded`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          setNewName("");
          setNewPhone("");
          setPersons(persons.concat(respose));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setNewName("");
      setNewPhone("");
    }
  };

  const BorrarNombre = (event) => {
    event.preventDefault();
    const id = event.target.value;
    const borrarpersona = persons.find((pers) => pers.id == id);
    if (window.confirm(`Delete ${borrarpersona.name}?`)) {
      Actividad.borrar(id).then(() => {
        setPersons(persons.filter((pers) => pers.id != id));
      });
    }
  };

  const Alerta = () => {
    let sino = false;
    persons.map((indice) => {
      let nombres = [];
      nombres.push(indice.name);
      if (nombres.includes(newName)) {
        window.confirm(
          `${newName} is already in phonebook, replace the old number with a new one?`
        );
        let datos = persons.find((pers) => pers.name == newName);
        const newUpdate = {
          ...datos,
          number: newPhone,
        };
        Actividad.update(datos.id, newUpdate)
          .then((respose) => {
            setPersons(
              persons.map((elem) => (elem.id === respose.id ? respose : elem))
            );
            setErrorMessage(`${newName} has ben updated`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setAlertMessage(
              `Information of ${newName} has already been removed from the server`
            );
          });
        sino = true;
      } else {
        sino = false;
      }
      return sino;
    });
    return sino;
  };

  const CambiarNombre = (event) => {
    setNewName(event.target.value);
  };

  const CambiarTelefono = (event) => {
    setNewPhone(event.target.value);
  };

  const BuscarPersona = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Busqueda buscarPersona={BuscarPersona} newSearch={newSearch} />
      <Notification message={errorMessage} />
      <Alert message={alertMessage} />
      <h2>Add a new</h2>
      <AgregarNombre
        ImprimirNombres={ImprimirNombres}
        newName={newName}
        CambiarNombre={CambiarNombre}
        newPhone={newPhone}
        CambiarTelefono={CambiarTelefono}
      />
      <h2>Numbers</h2>
      <ImprimirBusqueda
        persons={listado}
        newSearch={newSearch}
        BorrarNombre={BorrarNombre}
      />
    </div>
  );
};

export default App;
