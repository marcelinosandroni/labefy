import React, { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: ''}
  
  static getDerivedStateFromError(error) {

  }
  
  componentDidCatch(a,b,c) {
    console.log('DEU RUIM')
    console.log(a,b,c)
    this.setState({ hasError: true })
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h1>Sorry, some error here xd</h1>
          <h2>Dev is trying to fix this bug</h2>
        </React.Fragment>
      )
    }

    return this.props.children
  }
}