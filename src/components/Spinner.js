import React, { Component } from 'react'
import laoding from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={laoding} alt='loading'></img>
      </div>
    )
  }
}
