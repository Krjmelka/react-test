import DummyTable from '../components/DummyTable'
import { Grid } from '@material-ui/core'
import { privateRoute } from '../hocs/privateRoute'

const Table = (): JSX.Element => (
  <Grid container spacing={0} alignItems="center" justify="center">
    <DummyTable />
  </Grid>
)

export default privateRoute(Table)
