const API_URL = import.meta.env.VITE_API_URL;
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { FaCopy, } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords= async () => {
      let req=await fetch(`${API_URL}/`)
      let passwords = await req.json(); 
          setpasswordArray(passwords)
    }
    

    useEffect(() => {

        getPasswords()
    }, [])


    const showPassword = () => {

        if (ref.current.src.includes("Icon/eyecross.png")) {
            ref.current.src = "Icon/eye.png"
            passref.current.type = "password"
        } else {
            passref.current.type = "text"
            ref.current.src = "Icon/eyecross.png"
        }
    }

    const savePassword =async () => {
        await fetch(`${API_URL}/`, {
            method: "DELETE", headers: {  "Content-Type": "application/json" },
            body: JSON.stringify({ id:form.id })})
        setpasswordArray([...passwordArray, {...form, id: uuidv4() }])
        let req=await fetch(`${API_URL}/`, {
            method: "POST", headers: {  "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, id: uuidv4() })})
       
        setform({ site: "", username: "", password: "" })
    }
    const deletePassword =async (id) => {
        setpasswordArray(passwordArray.filter(item=>item.id!=id))
        let req=await fetch(`${API_URL}/`, {
            method: "DELETE", headers: {  "Content-Type": "application/json" },
            body: JSON.stringify({ id })})
    }
    const editPassword = (id) => {
        setform({...passwordArray.filter(item=>item.id==id)[0],id: id})
        setpasswordArray(passwordArray.filter(item=>item.id!=id))
        
    }
    
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text); () => {
        }
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>
            <div className="container mx-auto w-full sm:w-3/4 md:w-1/2 bg-slate-50">
                <h1 className="text-4xl text-center font-bold">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OP</span>
                    <span className="text-green-700">/&gt;</span>
                </h1 >
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 gap-3 items-center">
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter Website URL' className='border border-green-500 rounded-full p-4 py-1.5 w-full' type="text" />
                    <div className="flex gap-3 w-full">
                        <input value={form.username} onChange={handleChange} name='username' placeholder='Enter Username' className='border px-4 py-2 border-green-500 rounded-full w-full' type="text" />
                        <div className="relative w-full">
                            <input ref={passref} value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' className='border px-4 py-2 border-green-500 rounded-full w-full' type="password" />
                            <span className='absolute right-[10px] py-2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={25} src="Icon/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:cursor-pointer hover:bg-green-400 rounded-full w-fit px-3 py-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="password">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((items, index) => {
                                    return <tr key={index}>
                                        <td className=' py-2 border border-white text-center min-w-32'>
                                            <div className='flex justify-center items-center gap-2'>
                                                {items.site}
                                                <FaCopy className='cursor-pointer' onClick={() => { copyText(items.site) }} />
                                            </div>

                                        </td>
                                        <td className='py-2 border border-white text-center min-w-32'>
                                            <div className='flex justify-center items-center gap-2'>
                                                {items.username}
                                                <FaCopy className='cursor-pointer' onClick={() => { copyText(items.username) }} />
                                            </div>

                                        </td>
                                        <td className='py-2 border border-white text-center min-w-32'>
                                            <div className='flex justify-center items-center gap-2'>
                                                {items.password}
                                                <FaCopy className='cursor-pointer' onClick={() => { copyText(items.password) }} />
                                            </div>

                                        </td>
                                        <td className=' py-2 border border-white text-center min-w-32'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <span><FaEdit className='cursor-pointer ' onClick={() => { editPassword(items.id) }} /></span>
                                                <span><lord-icon className='cursor-pointer' onClick={() => { deletePassword(items.id) }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{width:18,height:16.22}}>
                                                </lord-icon></span>
                                            </div>

                                        </td>
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div >
        </>
    )
}

export default Manager
