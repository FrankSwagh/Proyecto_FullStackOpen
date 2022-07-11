import axios from "axios"
import { useState, useEffect } from 'react'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  console.log(name)
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(respose => {
                setCountry(respose.data)
            })
    }, [name])
    console.log(country)
    return country
  }