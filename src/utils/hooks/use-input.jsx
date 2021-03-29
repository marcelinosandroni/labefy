import { useState } from 'react'

export const useInput = (valorInicial, options) => {
  const [input, setInput] = useState(valorInicial)

  const controlInput = e => {
    const {name, value} = e.target
    const altControl = e.target[options.controlAtt]
    let inputName = name

    if (options.controlAtt) inputName = altControl
    setInput({...input, [inputName]: value})
  }
  
  return [input, setInput, controlInput]
}