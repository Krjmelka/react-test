import { Paper, Grid, TextField, Button, Snackbar } from '@material-ui/core'
import React, { useState } from 'react'
import { AxiosResponse } from 'axios'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router'

import { login } from '../utils/apiCall'

interface LoginResponse {
  token: string
}

const Home = (): JSX.Element => {
  const [username, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const res: AxiosResponse<LoginResponse> = await login(username, password)
      setCookie(null, 'token', res.data.token, {
        // i use cookies because we use next.js and localstorage is not awailable on server rendering
        path: '/',
      })
      router.push('/table')
    } catch (error) {
      if (error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError('Whoops, something went wrong')
      }
    }
  }

  const userNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
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
      <Paper style={{ padding: 30 }}>
        <Grid container>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Username"
                type="text"
                fullWidth
                autoFocus
                required
                onChange={userNameChangeHandler}
                value={username}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth
                required
                onChange={passwordChangeHandler}
                value={password}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Home
