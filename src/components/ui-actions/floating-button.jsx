import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

export const FloatAdd = ({action}) => {

  return (
    <Fab color='secondary'>
      <Add onClick={action} />
    </Fab>
  )
}