import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-purple-200 flex justify-between items-center px-4 h-14'>
    <div className='font-bold'>
      <span className="text-green-700">&lt;</span>
      Pass
      <span className="text-green-700">OP</span>
      <span className="text-green-700">/&gt;</span>
      </div>
    <ul>
      {/* <li className='flex gap-4'>
        <a className='hover:font-bold' href="/">Home</a>
        <a className='hover:font-bold' href="/">About</a>
        <a className='hover:font-bold' href="/">Contact</a>
      </li> */}
    </ul>
    <button className='flex gap-2 items-center bg-green-300 px-3 py-1 rounded-full'>
      <img className='w-10 h-8'src="Icon/github.svg" alt="github" />
      <span>GitHub</span>
    </button>
   </nav>
  )
}

export default Navbar
