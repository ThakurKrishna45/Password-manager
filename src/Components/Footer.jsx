import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-purple-200 flex justify-between items-center px-4 h-14'>
    <div className='font-bold'>
      <span className="text-green-700">&lt;</span>
      Pass
      <span className="text-green-700">OP</span>
      <span className="text-green-700">/&gt;</span>
      </div>
    <div className='flex'>
      Created with &nbsp;<img className='w-7' src="Icon/heart.png" alt="" />&nbsp;by Krishna Pratap Singh
    </div>
   </footer>
  )
}

export default Footer
