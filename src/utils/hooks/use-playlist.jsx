import { useReducer } from 'react'

const playReducer = (playState, action) => {
  switch (action.type) {
    case 'set': return action.play
    case 'add': return [...playState, action.play]
    case 'del': return playState.filter(p => p.id != action.play.id)
    
    case 'play':
    case 'stop':
    case 'pause': return [...playState, action.playlist]
    default: throw new Error('FUDEO, PASSO ERRADO!')
  }
}

export const usePlaylist = () => {
  const [playlist, dispatchPlay] = useReducer(playReducer, [])
}

// dispath({type: 'add', play: 1})
// dispath({type: 'set', play: [1, 2, 3]})
// dispath({type: 'delete', play: 1})