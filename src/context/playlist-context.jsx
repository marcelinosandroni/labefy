import React, { useState, createContext } from 'react'


const defaultValues = {
  id: '',
  name: '',
  quantity: 0,
  tracks: [{id: '', name: '', url: ''}],
  isPlaying: false,
  currentTrack: 0,
  buttonClick: false,
}

export const PlaylistContext = createContext(defaultValues)

export const PlaylistContextProvider = React.memo((props) => {
  const [playlist, setPlaylist] = useState(defaultValues)
  
  const play = () => {
    setPlaylist({...playlist, isPlaying: !playlist.isPlaying})
  }

  const start = () => {
    setPlaylist({...playlist, isPlaying: true})
  }

  const stop = () => {
    setPlaylist({...playlist, isPlaying: false})
  }

  const next = () => {
      let next = playlist.currentTrack + 1

      if (playlist.currentTrack + 1 === playlist.quantity) {
        next = 0
      }

    setPlaylist({ ...playlist, currentTrack: next })
  }
  
  const goToTrack = number => {
    setPlaylist({...playlist, currentTrack: number})
  }
  
  const prev = () => {
    let prev = playlist.currentTrack - 1
    if (!playlist.currentTrack) {
      prev = playlist.quantity - 1
    }

    setPlaylist({...playlist, currentTrack: prev})
  }
  
  console.log(playlist)
  console.log(playlist.currentTrack)
  
  return (
    <PlaylistContext.Provider value={{
      playlist: {...playlist, play, start, stop, next, prev, goToTrack}, setPlaylist}
      }>
      {props.children}
    </PlaylistContext.Provider>
  )
})