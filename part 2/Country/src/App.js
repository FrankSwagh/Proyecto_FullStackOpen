import { useState, useEffect } from "react";
import axios from "axios";
import ImprimirPaises from "./Components/Country";

const dir = "https://restcountries.com/v3.1/name";

const App = () => {
  const [nombre, newNombre] = useState("");
  const [arreglo, setArreglo] = useState([]);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    axios.get(`${dir}/${nombre}`).then((respose) => {
      paises.length = 0;
      setPaises(respose.data);
    });
  }, [nombre]);

  const BuscarNombre = (event) => {
    event.preventDefault();
    if (paises.length >= 10) {
      setArreglo("");
    } else if (paises.length === 1) {
      setArreglo(paises);
    } else if (paises.length < 10) {
      setArreglo(paises);
    }
  };

  const ReiniciarNombre = (nom) => {
    newNombre(nom);
  };

  const CambiarNombre = (event) => {
    newNombre(event.target.value);
  };

  return (
    <div>
      <form onChange={BuscarNombre}>
        <div>
          find countries <input value={nombre} onChange={CambiarNombre} />
        </div>
      </form>
      <div>
        <ImprimirPaises
          paises={paises}
          ReiniciarNombre={ReiniciarNombre}
          nombre={nombre}
        />
      </div>
    </div>
  );
};

export default App;
