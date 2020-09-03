import { TableRow, TableCell, Button } from '@material-ui/core'
import React, { FC } from 'react'
import { RowI } from './types'

type RowProps = {
  row: RowI
  onRemove: (id: string) => void
}

const Row: FC<RowProps> = ({ row, onRemove }): JSX.Element => (
  <TableRow>
    <TableCell component="th" scope="row">
      {row.id}
    </TableCell>
    <TableCell align="center">{row.title}</TableCell>
    <TableCell align="right">
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        style={{ textTransform: 'none' }}
        onClick={() => onRemove(row.id)}
      >
        Delete
      </Button>
    </TableCell>
  </TableRow>
)

export default Row
