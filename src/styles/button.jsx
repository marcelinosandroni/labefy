import Button from '@material-ui/core/Button'
import CircleAdd from '@material-ui/icons/CircleAdd'

export const AddButton = styled(Button).attrs({
  variant: 'contained', color: 'secondary', size: 'large',
  icon: CircleAdd
})`
  height: 150px;
`