import React from 'react'
import laoding from './loading.gif'

const Spinner = () => {
    return (
        <div className='text-center'>
            <img className='my-3' src={laoding} alt='loading'></img>
        </div>
    )
}

export default Spinner
