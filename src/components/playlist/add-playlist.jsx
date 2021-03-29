import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as labefy from 'utils/apis/labefy'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Notification } from 'components/form-actions/notification'


export const CreatePlaylist = React.memo((props) => {
  const [input, setInput] = useState('')
  const [alert, setAlert] = useState(false)
  const [msg, setMsg] = useState('')
  
  const controlInput = e => {
    const {value, name} = e.target
    setInput({ [name]: value })
  }
  
  
  const criar = () => {
    input.add && labefy.createPlaylist(input.add)
    .then(r => {
      if (r === -1) setMsg('Erro brabu! Nao crie com o msm nome!')
      else setMsg('Criado com sucesso!')
      setAlert(true)
      console.log(r)
      setInput({add: ''})
    })
    .catch(r => {
      setAlert(true)
      setMsg('Erro brabu! Nao pode criar play com msm nome!')
    })
  }

  return (
    <AddContainer>
    {alert && <Notification {...{alert, setAlert, msg}} />}

      <Typography align='center' variant='h3'>Criar playlist</Typography>

      <TextField
        variant='filled'
        label='Nova Play'
        name='add'
        value={input.add}
        onChange={controlInput} 
        autoComplete='off'
      />

      <Button variant='contained' color='secondary' onClick={criar} >Criar</Button>
      <Link to='/'>

      <Button 
        variant='contained' 
        color='secondary' 
        // onClick={() => props.page()}
      >
        Volta
      </Button>
      </Link>

    </AddContainer>
  )
})

const AddContainer = styled.div`
  margin: 0 auto;
  width: 50%;
  min-width: 350px;
  height: 50vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: stretch;

  a {
    display: flex;
    width: 100%;
    justify-content: stretch;
  }
  a > * {
    flex-basis: 100%;

  }
`