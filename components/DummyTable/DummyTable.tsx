import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Paper } from '@material-ui/core'
import { getTableData } from '../../utils/apiCall'
import { AxiosResponse } from 'axios'
import { RowI } from './types'
import Row from './Row'

interface TableResponse {
  rows: RowI[]
}

const DummyTable = (): JSX.Element => {
  const [error, setError] = useState<string>('')
  const [tableData, setTableData] = useState<RowI[]>([])

  const getData = async () => {
    try {
      const res: AxiosResponse<TableResponse> = await getTableData()
      setTableData(res.data.rows)
    } catch (error) {
      if (error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError('Whoops, something went wrong')
      }
    }
  }

  const removeHandler = (id: string) => {
    setTableData((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    // make an api request for an http://localhost:3000/api/table endpoint
    getData()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError('')}
        message={error}
      />

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item: RowI) => (
            <Row row={item} onRemove={removeHandler} key={item.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DummyTable
