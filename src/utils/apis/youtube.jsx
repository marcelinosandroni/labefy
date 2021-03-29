// Youtube mardito! So deixa fazer 100 pesquisar por dia
// Usando outra api q faz parser das pages e fica ilimitado

import axios from 'axios'
import interceptor from './interceptor'
const baseURL = "https://youtube.googleapis.com/youtube/v3/search"
const part = 'id'
const maxResults = '1'
const key = process.env.REACT_APP_YOUTUBE_KEY

const baseParams = {
  part, maxResults, key
}

const youtube = axios.create({baseURL})

interceptor(youtube, 'youtube')

export const getVideo = async q => {
  try {
    const r = await youtube.get('', {
      params: {...baseParams, q}
    })
    return r
  } catch(e) {
    console.error(e)
  }
}


// Tentando procurar video pelo HTML msm na baguncinha pra burlar o limite do YT
const parserBaseURL = 'https://www.youtube.com/results'

export const baguncinha = async search_query => {
  try {
    const r = await axios.get(
      parserBaseURL, 
      {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        params: {search_query}}
      )
    console.log(r)
    getVideoID(r.data)
    return r
  } catch(e) {
    console.error(e)
  }
}

export const getVideoID = html => {
  const videoID = new RegExp(/(?<="videoId":")\w+/i)
  console.log(html.match(videoID))
}