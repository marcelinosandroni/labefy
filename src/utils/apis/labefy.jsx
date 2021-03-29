import axios from 'axios'
import interceptor from './interceptor'

const baseURL = 'https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists'
const headers = { Authorization: 'marcelino-sandroni-cruz' }
const labefy = axios.create({baseURL, headers})

// Sempre aparecer o que esta solicitando para debugar melhor ta blz?
// const msg = text => console.log(`%c${text}`, 'color: tomato; font-size: 18px;')

// if (process.env.NODE_ENV === 'development') {
//   labefy.interceptors.request.use(request => {
//     msg('SOLICITANDO DADOS LABEFY API')
//     console.log(request)
//     return request
//   })
//   labefy.interceptors.response.use(response => {
//     msg('RECEBEU O RETORNO DA LABEFY API')
//     console.log(response)
//     return response
//   })
// }

// Separei o interceptor em outro arquivo pra facilitar, manda instance + name
interceptor(labefy, 'LABEFY')

const verifyStatus = r => {
  if (r.status >= 100 && r.status <= 201) {
    return r
  } else {
    console.warn(`Algo de certo deu errado: ${r.status} - ${r.statusText}`)
    return -1
  }
}

const base = ({method = 'get', url = '', params = '', data = ''}) => {
  return async () => {
    try {
    const r = await labefy.request({method, url, params, data})
    return verifyStatus(r)
    } catch(e) {
      console.log('DEU BO')
      console.error(e)
      return -1
    }
  }
}
export const getPlaylists = base({})
export const searchPlaylist = name => base({url: 'search?', params: {name}})()
export const getPlaylistsTracks = id => base({url: `${id}/tracks`})()
export const createPlaylist = name => base({method: 'post', data: {name}})()
export const addTrackPlaylist = (id,data) =>
  base({method: 'post', url:`${id}/tracks`, data})() 
export const deletePlaylist = id => base({method: 'delete', url: id})()
export const removeTrack = (id, track) =>
  base({method: 'delete', url: `${id}/tracks/${track}`})()