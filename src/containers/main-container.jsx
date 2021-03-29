import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

const dark = createMuiTheme({
  palette: {
    type: 'dark',
    mode: 'dark', //material ui v5 new prop
    background: {
      default: '#222',
    }
  }
})

const useStyles = makeStyles({
  root: {
    paddingTop: '80px',
  }
})

export const MainContainer = (props) => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <Container maxWidth='false' className={classes.root}>
        <Grid container direction='column'>
          {props.children}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

