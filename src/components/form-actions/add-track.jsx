import { useState, useContext }
import { TextField, Grid } from '@material-ui/core'

export const AddTrack = () => {

  return (
    <Grid container item>
      <TextField
        name={nameField}
        id='name'
        label='Nome'
        value={input[nameField]}
        onChange={inputControl}
        autoComplete='off'
      />

      <TextField
        name={artistField}
        id='artist'
        variant='filled'
        label='Artista'
        value={input[artistField]}
        onChange={inputControl}
        autoComplete='off'
      />

      <TextField 
        name={urlField}
        id='url'
        variant='filled' 
        label='Link da Musica'
        value={input[urlField]}
        onChange={inputControl}
        autoComplete='off'
      />

      <Button
        variant='contained' 
        color='secondary'
        onClick={addTrack}
      >
        Adicionar
      </Button>
      <Link to='/'>
      <Button variant='contained' color='secondary'
        // onClick={() => props.page()}
      >
        Voltar
      </Button>
      </Link>
    </Grid>
  )
}