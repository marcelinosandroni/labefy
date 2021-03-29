import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import * as labefy from 'utils/apis/labefy'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useInput } from 'utils/hooks/use-input'
import { PlaylistContext } from 'context'
import { AddCircle, DeleteForever, Add} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress'
import ReactPlayer from 'react-player/youtube'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Notification } from 'components/form-actions/notification'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'
import {getVideo} from 'utils/apis/scrape'
import * as youtube from 'utils/apis/youtube'



import quePena from 'assets/que-pena.webm'

import { Link, Redirect } from 'react-router-dom'
import { IconButton, FormControl, FormHelperText, FormLabel, Fab } from '@material-ui/core'
// import { SettingsInputSvideoTwoTone } from '@material-ui/icons'

//tentando botar os campos aleatorios para n ter o autofill do browser
const random = Math.floor( Math.random() * 100 + 1)
const nameField = `name${random}`
const artistField = `artist${random}`
const urlField = `url${random}`
const inputDefaults = {
  name: '',
  artist: '',
  url: '',
  auto: false,
  autoText: 'De boa, eu pego no youtue pra tu...'
}

const useStyles = makeStyles({
  container: {
    height: '85vh',
    maxHeight: '85vh',
    // overflow: 'hidden',
  },
  tracks: {
    height: '100%',

  },
  media: {
    heigth: '100%',
    maxHeight: '100%',

  },
  lyrics: {
    overflow: 'auto',
  },
  grow: {
    flex: 1
  }
})

export const OpenPlaylist = React.memo((props) => {
  //const [playlist, setPlaylist] = useState()
  const [input, setInput, inputControl] = useInput(
    inputDefaults, {controlAtt: 'id'}
  )
  const [reload, plsReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const audioQuePena = useRef()
  const [lyric, setLyric] = useState()
  
  const {playlist, setPlaylist, play} = useContext(PlaylistContext)
  const [redirect, setRedirect] = useState()
  const [alert, setAlert] = useState(false)
  const [msg, setMsg] = useState('')
  
  const classes = useStyles()
  
  useEffect(() => {
    console.log(`AUTO: ${input.auto}`)
    // if (input.auto) {
    //   setInput({...input, [urlField]: 'De boa eu pego pra tu no youtube'})
    // } else {
    //   setInput({...input, [urlField]: ''})
      
    // }

  }, [input.auto])
  
  useEffect(() => {
    if (reload) {
      labefy.getPlaylistsTracks(playlist.id).then(r => {
        plsReload(false)
        setPlaylist({...playlist, ...r.data.result})
      })
    }
  }, [reload])
  
  useEffect(() => {
    if (playlist.id) {
      labefy.getPlaylistsTracks(playlist.id)
      .then(r => {
        setPlaylist({...playlist, ...r.data.result})
        setLoading(false)
        !r.data.result.quantity && setLyric('sem tracks')
      })
    } else {
      const playlistName = props.match.params.name.replace(/-/g, ' ')
      labefy.searchPlaylist(playlistName).then(r => {
        console.log(r)
        if (r?.data?.result?.playlist.length) {
          const {id, name} = r?.data?.result?.playlist[0]
          if (r.data.result.quantity) {
            labefy.getPlaylistsTracks(id)
            .then(r => {
              setPlaylist({...playlist, ...r.data.result, id, name})
              setLoading(false)
              !r.data.result.quantity && setLyric('sem tracks')
            })
          }
        } else {
          setRedirect(true)
        }
      })
    }
  },[])
  
  useEffect(() => {
    //Se tu gosta de funk, tenho pena, meus pesames...
    playlist?.name === 'funk' && audioQuePena.current.play()

    const {name = '', artist = ''} = playlist.tracks.length && playlist.tracks[playlist.currentTrack]

    // const cancel = axios.CancelToken.source()

    if (playlist?.quantity && name && artist) {
      //pegar letrinhas
      console.log(`${artist}/${name}`)
      axios.get(
        `https://api.lyrics.ovh/v1/${artist}/${name}`,
        {
          timeout: 20000,
          // cancelToken: cancel.token
        })
      .then(r => {
        setLyric(r.data.lyrics)
      }).catch(e => {
        setLyric('none')
        if (axios.isCancel(e)) {
          console.log(`CANCELEI O REQUEST DA LYRIC!`)
        } else {
          console.warn(`Deu BO`)
          console.error(e)
        }
      })
    }
    
    // return cancel.cancel('Cancela ai pow')
    //pegar video primeira musica
    // getVideo(name+artist).then(r => {
    //   console.log(r)
    //   const link = r && r.data.results[0].video.url
    //   link && setVideo(link)
    //   console.log(`ACHEI: ${link}`)
      
    // })

  },[playlist])
  
  const addTrack = useCallback(() => {
    // getVideo(`${input.artist} ${input.name}`)
    // .then(r => {
    //   console.log(r)
    //   const {url} = r.data.results[0].video
    //   setInput({...input, url})
    
    if (!input.name && !input.artist) {
      setAlert(true)
      setMsg('favor insira NOME e ARISTA!')
      return
    }
    
    if (input.auto) {


    youtube.getVideo(`${input.artist} ${input.name}`)
    .then(r => {
      const watch = 'https://www.youtube.com/watch?v='
      console.log(r)
      const url = watch + r.data.items[0].id.videoId
      setInput({...input, url})
      
      
      labefy.addTrackPlaylist(playlist.id, {...input, url})
      .then(r => {
        console.log(r)
        console.table(input)
        if (r?.status === 200) {
          plsReload(true)
          setInput({ ...inputDefaults, auto: input.auto})
        }
      })
    })

    } else {
      labefy.addTrackPlaylist(playlist.id, {...input})
      .then(r => {
        console.table(input)
        if (r?.status === 200) {
          plsReload(true)
          setInput({ ...inputDefaults, auto: input.auto})
        }
      })
      
    }

  })
  
  const removeTrack = trackId => {
    labefy.removeTrack(playlist.id, trackId)
    .then(r => {
      playlist.prev()
      if (!playlist.currentTrack) {
        console.log('primeira')
        playlist.goToTrack(0)
      } else{
        console.log('anterior')
        playlist.prev()
        // playlist.start()
      }
      plsReload(true)
      // setTimeout(() => plsReload(true), 1000)
    })
  }
  
  console.log(playlist)
  const cur = playlist.currentTrack
  
  return (
    <Grid item container xs={12} direction='row' className={classes.container}>
      {redirect && <Redirect to='/404' />}
      {alert && <Notification {...{alert, setAlert, msg}} />}

      <Grid item xs={12}>
        {loading && <CircularProgress />}
      </Grid>

      <Grid container item xs={6} direction='column' spacing={2} justifyContent='space-between' wrap='nowrap' className={classes.tracks}>

        <Grid item container xs={playlist.tracks.length ? 1 : 4} direction='row' justifyContent='center'
        wrao='wrap'
        >
        <Typography variant='h2'>{playlist?.name}</Typography>
        {!playlist.tracks.length && (
          <Grid container item xs={8} wrap='nowrap' alignItems='flex-end'>
          <Typography variant='h3' align='center'> Sem musiquinhas, add ai...</Typography>
          </Grid>
        )}
        </Grid>
        

        
        <Grid item container xs={8} direction='row' justifyContent='flex-start'
        wrao='wrap' alignItems='flex-start'
        >
        <ul>
        {playlist && playlist.tracks.map(p => {
          return (
            <div key={p.id}>
            <p>{`${p.name} - ${p.artist} - ${p.url}`}<DeleteForever onClick={() => removeTrack(p.id)} /></p>
            </div>
        )})}
        </ul>
        </Grid>
    
    
        <Grid container item xs={2} justifyContent='flex-start' alignItems='stretch'>

        
        <Grid container item xs={10} justifiContent='space-between'
        direction='row'
        >

        <Grid container item direction='row' xs={12} 
        justifyContent='stretch' alignItems='flex-end' spacing={1}>
            
          <TextField
            name={nameField}
            id='name'
            label='Nome'
            value={input[nameField]}
            onChange={inputControl}
            autoComplete='off'
            className={classes.grow}
          />

          <TextField
            name={artistField}
            id='artist'
            // variant='filled'
            label='Artista'
            value={input[artistField]}
            onChange={inputControl}
            autoComplete='off'
            className={classes.grow}
            />
        </Grid>
        
        <Grid item container direction='row' xs={12} alignItems='flex-end'
        spacing={1}>
        <TextField 
          disabled={input.auto ? true : false}
          name={urlField}
          id='url'
          // variant='filled' 
          label={!input.auto ? 'Link da Musica' : 'De boa, eu pago no youtube pra tu...'}
          value={input[urlField]}
          onChange={inputControl}
          autoComplete='off'
          className={classes.grow}
        />
        
        <FormControlLabel
        control={<Checkbox
            checked={input.auto}
            onChange={() => {setInput({...input, auto: !input.auto})}}
            name="auto"
            color="secondary"
        />} 
            label='Link Automatico'
        />
        </Grid>
        
        </Grid>
        
        <Grid container item xs={2} justifyContent='center'
        alignItems='center' >
          <Fab color="secondary" aria-label="" onClick={addTrack}>
            <Add />
          </Fab>
        </Grid>

        {/* <Button
          variant='contained' 
          color='secondary'
        >
          Adicionar
        </Button> */}
        {/* <Link to='/'>
        <Button variant='contained' color='secondary'
          // onClick={() => props.page()}
        >
          Voltar
        </Button>
        </Link> */}
        </Grid>
        
      </Grid>

      <Grid item container xs={6} spacing={1} direction='column'
        justifyContent='flex-start' alignItems='flex-start' wrap='nowrap'
     className={classes.media}
    
      >
       <Grid container item xs={1} direction='row' justifyContent='center' alignItems='center'>
      <Typography variant='h6' align='center'>
        {playlist.tracks.length ? 
        `${playlist.tracks[cur].name} - ${playlist.tracks[cur].artist}` : ''
      }
      </Typography>
      </Grid> 
      <Grid item container xs={4} justifyContent='center'>
        <ReactPlayer
        url={playlist.tracks.length ? 
          playlist.tracks[cur].url : ''
        }
        playing={playlist.isPlaying}
        onStart={playlist.start}
        onPause={playlist.stop}
        onEnded={playlist.next}
          width='60%' height='320px'
        />
        <audio src={quePena} ref={audioQuePena} />
      </Grid>
    
      <Grid container item xs={7} className={classes.lyrics} justifyContent='center' wrap='nowrap'>
    
       {lyric === 'none' ?
       (<Typography variant='h4'>Nao achei a letra...</Typography>) :
       lyric === 'sem tracks' ? '' : <pre>{lyric}</pre> }
    
    
        { !lyric && (<Grid container item direction='column'
        xs={6} justifyContent='space-evenly' spacing={2}
        alignItems='center'
        >
    
          <Typography variant='h4'>Pegando a letrinha</Typography>
          <CircularProgress />
        </Grid>)}
    
        </Grid>
    
      </Grid>
    
    </Grid>
  )

})