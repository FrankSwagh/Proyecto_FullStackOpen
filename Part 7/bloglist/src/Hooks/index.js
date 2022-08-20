/*eslint linebreak-style: ["error", "windows"]*/
import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const reset = {
        value: () => {
            setValue('')
        }
    }

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
