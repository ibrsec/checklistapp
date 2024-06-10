import useChekclistApi from '@/helpers/useChekclistApi';
import React from 'react'

const StartApiButton = () => {
    const {startDayApi} = useChekclistApi();


  return (
    <button onClick={startDayApi} className='py-2 px-5 bg-green-300 text-slate-600 hover:bg-green-200 active:bg-green-400 rounded-md transition-all'>Start Day</button>
  )
}

export default StartApiButton