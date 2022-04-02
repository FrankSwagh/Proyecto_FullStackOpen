import { useState, useEffect } from "react";
import axios from "axios";

const dir = "https://restcountries.com/v3.1/name";

const App = () => {
  const [nombre, newNombre] = useState("");
  const [arreglo, setArreglo] = useState([]);
  const [paises, setPaises] = useState([]);
  

  useEffect(() => {
    axios.get(`${dir}/${nombre}`).then((respose) => {
      //for (let a = 0; paises.length > 0; a--) paises.pop();
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

  const ImprimirPaises = () => {
    console.log(paises);
    //console.log("var",paises[0].languages);
    let nomb = [];
    let fin = [];
    paises.map((v) => nomb.push(v.name.common));
    if (paises.length < 10 && paises.length > 1) {
      return (
        <div>
          <ul>
            {nomb.map((elem) => (
              <li key={elem}>{elem}</li>
            ))}
          </ul>
        </div>
      );
    } else if (paises.length === 1) {
      let idioma = [];
      let lengua = [];
      idioma.push(paises[0].languages);
      lengua = Object.values(idioma[0]);
      return (
        <div>
          <h2>{nomb}</h2>
          <div>
            <p>
              <b>Capital:</b> {paises[0].capital}
            </p>
            <p>
              <b>Population</b> {paises[0].population}
            </p>
          </div>
          <div>
            <h2>Languajes</h2>
            <div>
              <ul>
                {lengua.map((elem) => (
                  <li key={elem}>{elem}</li>
                ))}
              </ul>
            </div>
            <img src={paises[0].flags.png} width="180" height="120"></img>
          </div>
        </div>
      );
    } else if (paises.length >= 10 || paises.length == 0) {
      return <p>Too many matches, specify filter</p>;
    }
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
        <ImprimirPaises />
      </div>
    </div>
  );
};

export default App;
