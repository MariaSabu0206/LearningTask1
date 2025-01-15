import React from 'react'
import '../CSS/Growth.css'
import bargraph from '../assets/bargraph.jpg'
import analytics from '../assets/analytics.jpg'

const Growth = () => {
    return (
        <>  
            <div>
                <h4 className='graphhead pt-4'>This Year Growth</h4>
                <img className='graphimg' src={bargraph} alt="" />
            </div>
            <div>
                <h4 className='graphhead pt-4'>Analytics</h4>
                <img className='graphimg' src={analytics} alt="" />
            </div>
        </>
    )
}

export default Growth