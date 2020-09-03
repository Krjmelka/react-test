import React from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { parseCookies } from 'nookies'

export const privateRoute = (WrappedComponent: any) => {
  const Wrapper: NextPage = (props) => {
    return <WrappedComponent {...props} />
  }
  Wrapper.getInitialProps = (context) => {
    const { token } = parseCookies(context)
    if (!token) {
      if (context.res) {
        context.res.writeHead(302, { Location: '/' })
        context.res.end()
      } else {
        Router.replace('/')
      }
    }
    return { isAuth: true }
  }
  return Wrapper
}
