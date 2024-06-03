import React, { useContext } from 'react'
import { UserContext } from '../../context/context'


export const MyRides = () => {
  // const {myRides} =useContext(UserContext);
  return (
    <div className='text-2xl h-screen flex justify-center items-center'>
        This page is only shown if user is logged-in
    </div>
  )
}
