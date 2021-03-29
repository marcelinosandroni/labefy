import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import * as labefy from 'utils/apis/labefy'
import { PlaylistContext } from 'context'
import { ConfirmDialog } from 'components/form-actions/confirm-dialog'
import { Notification } from 'components/form-actions/notification'

import { Link, NavLink, Redirect } from 'react-router-dom'

//material-ui
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress'

import { FloatAdd } from 'components/ui-actions/floating-button'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '80%',
    overflow: 'auto'
  },
  cardHeight: {
    height: '20%',
    border: '2px solid tomato',
  },
  paper: {
    minHeight: '30%',
    cursor: 'pointer',
    padding: '20px',
    position: 'relative'
  },
  paperIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  progressContainer: {
    height: '60vh',

  },
  progress: {
    display: 'flex',
    margin: '0 auto'
  },

  add: {
    position: 'fixed',
    bottom: 80,
    right: 50
  },
  link: {
    textDecoration: 'none'
  }
}))

export const ListPlaylist = React.memo((props) => {
  const [listOfPlaylists, setListOfPlaylists] = useState([])
  const {playlist, setPlaylist} = useContext(PlaylistContext)
  const [reload, setReload] = useState(true)
  const [confirm, setConfirm] = useState({
    open: false, 
    resp: false,
    clickPlayId: null,
    clickPlayName: null
  })
  const [alert, setAlert] = useState(false)
  const [msg, setMsg] = useState()
  const [redirect, setRedirect] = useState()
  const classes = useStyles()
  
  console.log(props)
  
  useEffect(() => {
    if (reload) {
      labefy.getPlaylists().then(r =>
        r.data && setListOfPlaylists(r.data.result.list)
      )
      setReload(false)
    }
  }, [reload])
  
  useEffect(() => {
    if (confirm.resp && confirm.clickPlayId) {
      labefy.deletePlaylist(confirm.clickPlayId)
      .then(r => {
        setReload(true)
        setAlert(true)
        setMsg('Deletadu!!!')
      })
      .catch(r => console.error(r))

    }

  }, [confirm.resp])

  return (

    <Grid 
    className={classes.container} 
    container 
    direction='row' 
    spacing={2} 
    justifyContent='center'>
    
    {redirect && <Redirect to={redirect} /> }
    
    <ConfirmDialog info={confirm} set={setConfirm}/>
    <Notification alert={alert} setAlert={setAlert} msg={msg}/>


    
      <div className={classes.add}>
        <FloatAdd action={() => setRedirect('/create')}/>
      </div>
      <Grid container item xs={12} justifyContent='center'>
        <Typography align='center' variant='h3'>Lista das playlist</Typography>
      </Grid>
      <Grid
      container item 
      spacing={2} 
      justifyContent='center'
      >

        {!listOfPlaylists.length && (
          <Grid container item 
          justifyContent='center' 
          alignItems='center' 
          xs={12}
          className={classes.progressContainer}
          >
            <CircularProgress
              color='secondary'
              size={350}
              className={classes.progress}
            />
        </Grid>)}
      
        {listOfPlaylists.map(play => 
          <Grid key={play.id} 
          container item 
          xs
          direction='row' 
          wrap='wrap'
          justifyContent='center'
          >
          <NavLink className={classes.link} to={'playlist/' + play.name.replace(/\s/g, '-')}
            onClick={() => {
                const {id, name} = play
                console.log(id, name)
                setPlaylist({...playlist, id, name})
              }
            }
          >
            <Paper className={classes.paper} >
            <Typography variant='h4'>
              {play.name}
            </Typography>
            <CancelIcon className={classes.paperIcon}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setConfirm({
                open: true, 
                resp: false, 
                clickPlayId: play.id,
                clickPlayName: play.name
              })

              }} />
          </Paper>
          </NavLink>
          </Grid>
        )}
      </Grid>

      <Grid container item xs={12}
      direction='row' justifyContent='center' alignItems='center'
      >
        <Link to={{ pathname: 'create'}}>
          <Button variant="contained" color="secondary" >
            Nova Playlist
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
})