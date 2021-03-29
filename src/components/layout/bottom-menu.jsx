import { useState, useContext } from 'react'
import { PlaylistContext } from 'context'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'


//icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import Grid from '@material-ui/core/Grid'



const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '0.5% 5%',
  },
  menu: {
    borderRadius: '8px',
    width: 300,
    
  }
})


export const BottomMenu = () => {
  const [option, setOption] = useState(true)
  const {playlist} = useContext(PlaylistContext)


  const changeOption = (event, value) => {
    setOption(!option)
  }
  
  const classes = useStyles()

  return (
    <Grid
    container
    spacing={1}
    className={classes.root}
    justifyContent='center'>

      
      
    <BottomNavigation
      // value={playlist.isPlaying}
      className={classes.menu}
      // onChange={changeOption}
    >
      <BottomNavigationAction
      label="Previous"
      value={'previous'}
      onClick={playlist.prev}
      icon={<SkipPreviousIcon/>} />

      <BottomNavigationAction
      label={playlist.isPlaying ? 'STOP' : 'PLAY'}
      value={playlist.isPlaying}
      onClick={playlist.play}
      icon={!playlist.isPlaying ? <PlayArrowIcon/> : <StopIcon/>} />


      <BottomNavigationAction
      label="Next"
      value={'next'}
      onClick={playlist.next}
      icon={<SkipNextIcon/>} />
      
    </BottomNavigation>

    </Grid>
  )
}