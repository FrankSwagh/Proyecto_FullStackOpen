import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const reset = {
      value: () => {
        setValue('')
      }
    }

    console.log(type)
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange,
      reset
    }
  }