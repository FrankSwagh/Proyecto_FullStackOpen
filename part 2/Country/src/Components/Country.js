import axios from "axios";
import { useState, useEffect } from "react";

const ImprimirPaises = ({ paises, ReiniciarNombre, nombre }) => {

console.log('nuevo')
  const api_key = process.env.REACT_APP_API_KEY;
  const [clima, setClima] = useState([]);

  useEffect(() => {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${ api_key}&query=${ nombre }`
        )
        .then((response) => {
          console.log(response.data.current)
          const newElem = {
            temperature: response.data.current.temperature,
            imagen: response.data.current.weather_icons[0],
            wind: response.data.current.wind_speed,
            windDir: response.data.current.wind_dir,
          };
          setClima(newElem);
        });
    
  }, [paises]);

  let nomb = [];
  paises.map((v) => nomb.push(v.name.common));
  if (paises.length < 10 && paises.length > 1) {
    return (
      <div>
        <ul>
          {nomb.map((elem) => (
            <li key={elem}>
              {elem}{" "}
              <input
                type="button"
                value="show"
                onClick={() => ReiniciarNombre(elem)}
              />
            </li>
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
        <div>
          <h2>Weather in {paises[0].capital}</h2>
          <div>
            <p>
              <b>Temperature: {clima.temperature} Celsius</b>
            </p>
            <img src={clima.imagen}></img>
            <p>
              <b>Wind:</b> {clima.wind} mph direction {clima.windDir}
            </p>
          </div>
        </div>
      </div>
    );
  } else if (paises.length >= 10 || paises.length == 0) {
    return <p>Too many matches, specify filter</p>;
  }
};

export default ImprimirPaises;
