import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import { MainContainer } from 'containers'
import { ListPlaylist, CreatePlaylist, OpenPlaylist } from 'components/playlist'
import { Title } from 'styles/text'
import { BottomMenu } from 'components/layout/bottom-menu'
import { HeaderMenu } from 'components/layout/header'
import Grid from '@material-ui/core/Grid'

import * as youtube from 'utils/apis/youtube'

import { PlaylistContextProvider } from 'context'
import Typography from '@material-ui/core/Typography'

const Home = () => {

  return (
    <BrowserRouter>
    <MainContainer>
      <HeaderMenu />
    
      <PlaylistContextProvider>
        <Switch>
          <Route path='/' exact component={ListPlaylist} />
          <Route path='/create' exact component={CreatePlaylist} />
          <Route path='/edit' exact component={OpenPlaylist} />
          <Route path='/playlist/:name' exact component={OpenPlaylist} />
          {/* <Route path='/:name' render={() => <h1>SOmething something error 404</h1>} /> */}
          <Route render={() => (
          <Typography variant="h1" >
            Isso ai que tu esta procurando no ecxiste!
          </Typography>)} />
        </Switch>


        <BottomMenu />
      </PlaylistContextProvider>
        
    </MainContainer>
    </BrowserRouter>
  )
}

export default Home;