// Salvando aqui a funcao de interceptar o axios para
// Usar em varias apis para facilitar a debugagem


// Sempre aparecer o que esta solicitando para debugar melhor ta blz?
const msg = text => console.log(`%c${text}`, 'color: tomato; font-size: 18px;')

const interceptor = (instance, nominho) => {
  //So rodamos no mode DEV
  if (process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_INTERCEPTOR === 'ON') {
    instance.interceptors.request.use(request => {
      msg(`SOLICITANDO DADOS ${nominho.toUpperCase()} API`)
      console.log(request)
      return request
    })

    instance.interceptors.response.use(response => {
      msg(`RECEBEU O RETORNO DA ${nominho.toUpperCase()} API`)
      console.log(response)
      return response
    })
  }
}

export default interceptor