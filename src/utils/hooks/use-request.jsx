import { useReduce } from 'react'

const requestReduce = (curRequest, action) => {
  switch(action.type) {
    case 'SEND': return {load: true, error: false}
    case 'RESP': return {load: false, error: false, data: action.data}
    case 'ERR': return {load: false, error: true}
    default: throw new Error('Used incorrect action')
  }
}


export const useRequest = api => {

  const defaultValues = {
    isLoading: false,
    error: false,
    data: null,
    send: api,
    api: api.name
  }

  const [request, dispatch] = useReduce(requestReduce, defaultValues)
  
  const sendRequest = (option, ...args) => {
    option(...args).then(r => r && dispatch({type: 'RESP', data: r.data}))
  }
  
  return {
    isLoading: request.isLoading,
    error: request.error,
    send: sendRequest,
    data: request.data
  }
}