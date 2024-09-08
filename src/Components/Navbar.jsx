import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/finalProject assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/AuthContext'
import useQueryCart from '../Hooks/useQueryCart'
import { getCartApi } from '../Apis/cartApi'
export default function Navbar() {

    let { data } = useQueryCart('cart', getCartApi)
    let { isLogin, setLogin } = useContext(auth)
    let [open, setOpen] = useState(false)
    let navigate = useNavigate()
    function toggle() {
        setOpen(!open)
    }

    function logout() {
        localStorage.removeItem('userToken')
        // console.log(localStorage.getItem('userToken'));
        // console.log(isLogin)
        setLogin(null)

        // console.log(isLogin)
        navigate('/login')
    }
    return (
        <nav className='py-5 bg-main-light px-10 md:px-15 '>
            <div className="container  flex justify-between items-center relative">
                <div className='lg:flex gap-2'>
                    <img src={logo} alt="fresh-cart-logo" width={130} />
                    {isLogin ? <ul className={`lg:flex gap-4  ${open ? 'block' : 'hidden'}`}>
                        <li>
                            <NavLink to={'/'}>Home</NavLink>
                        </li>
                       
                        <li>
                            <NavLink to={'/brand'}>Brand</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/categories'}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/products'}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/allorders'}>orders</NavLink>
                        </li>
                    </ul> : ''}

                </div>
                <div>
                    <ul className={`lg:flex gap-2 ${open ? 'block' : 'hidden'}`}>

                        {isLogin ? <>
                            <li onClick={logout} className='cursor-pointer mb-3 lg:mb-0'>LogOut
                                {isLogin ? <span className='mx-3 text-green-600'><b>hi {isLogin.name} </b></span> : ''}
                            </li>
                            <li className='relative mb-2 lg:mb-0'>
                                <Link  to={'/cart'}>
                                    <i className='fas fa-cart-shopping'></i>
                                    <span className='w-[20px] h-[20px] absolute bottom-3 left-3 bg-green-700 rounded-full flex justify-center items-center text-white'>{data?.numOfCartItems?data?.numOfCartItems:0}</span>
                                </Link>
                            </li>
                            <li>
                               <Link to={'/heart'}>
                            <i className='fas fa-heart text-red-700 lg:mx-2 fa-xl '  ></i >
                            </Link>
                            </li>
                        </>
                            :
                            <>
                                <li><NavLink to={'/login'}>Login</NavLink></li>
                                <li><NavLink to={'/register'}>Register</NavLink></li>
                                <li className='flex gap-4'>
                                    <a href="">  <i className='fab fa-facebook-f'></i></a>
                                    <a href="">  <i className='fab fa-twitter'></i></a>
                                    <a href="">  <i className='fab fa-google'></i></a>
                                    <a href="">  <i className='fab fa-youtube'></i></a>
                                </li>
                            </>}

                    </ul>
                </div>
                <i onClick={toggle} className={`lg:hidden block  fas  fa-2x absolute top-0 right-4 cursor-pointer  ${open ? 'fa-close' : 'fa-bars'}`}></i>
            </div>
        </nav>
    )
}
