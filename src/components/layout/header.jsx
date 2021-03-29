import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import {Menu, Search, MoreHoriz, MusicNote} from '@material-ui/icons'
import { Link, NavLink, Redirect } from 'react-router-dom'
import { TextField, Input, FormControl, FormHelperText, FormLabel, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '0 50px'
  },
  container: {
    justifyContent: 'space-between'

  },
  labTitle: {
    // flexGrow: 1,
    textAlign: 'center'
  },
  option: {
    flex: '1 0 20%'

  },
  search: {
    flexBasis: '50%',
  },
  routerLink: {
    // flex: '1 0 20%',
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
  }
}))

export const HeaderMenu = () => {
  const [redirect, setRedirect] = useState()
  const c = useStyles()

  return (
    <AppBar position="fixed" color="primary" className={c.root}>
      {redirect && <Redirect to={redirect} /> }
      <Toolbar className={c.container}>

        <NavLink to='/' className={c.routerLink}>
          <IconButton color='inherit' 
          onClick={() => setRedirect('/')}>
            <MusicNote />
          </IconButton>

          <Typography variant="h5" className={c.labTitle}>
            Labefy
          </Typography>
        </NavLink>

    <Grid container item spacing={1} className={c.search}
    alignItems='center' direction='row'
    
    >
      {/* <FormLabel></FormLabel> */}
      
    <Grid container item xs={2} justifyContent='flex-end'>
        <Search />
    </Grid>
    <Grid item xs={10} justifyContent='center' alignItems='center'>
          <Input
            id='search'
            placeholder="Pesquisar musiquinhas..."
            fullWidth
          />
    </Grid>

    </Grid>
          {/* <Search />
        <IconButton aria-label="search" color="inherit" className={c.search}>
        </IconButton> */}

        <IconButton aria-label="display more actions" edge="end" color="inherit" className={c.option}>
          <MoreHoriz />
        </IconButton>
          
      </Toolbar>
    </AppBar>
  )
}