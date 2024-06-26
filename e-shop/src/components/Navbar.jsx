import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "./Context/AuthContext.js";
import supabase from "../utils/supabase.js";
import toast from "react-hot-toast";
import {useCart} from "./Context/CartContext";

import { IoCart } from "react-icons/io5";
import logo from '../images/Logo.png';

const Navbar = () => {
    const session = useContext(AuthContext);
    const isLoggedIn = session.session !== null;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useCart();
    const cartItems = cart.length;

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    }

    const handleLogout = () => {
        supabase.auth.signOut();
        toast.success('Logged out successfully', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        });
    }

    return (
        <nav className="bg-zinc-300 dark:bg-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                src={logo}
                                alt={"LOGO"}
                                className="h-16 rounded"
                            />
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleNavbar} className="text-black dark:text-white focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/products" className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 px-3 py-2 rounded-md text-2xl font-medium">
                                Clothes
                            </Link>
                            {isLoggedIn ? (
                                <div className="flex space-x-4">
                                    <p onClick={handleLogout} className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 px-3 py-2 rounded-md text-2xl font-medium select-none hover:cursor-pointer">
                                        Logout
                                    </p>

                                    <Link to="/profile">
                                        <p className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 px-3 py-2 rounded-md text-2xl font-medium select-none hover:cursor-pointer">
                                            Profile
                                        </p>
                                    </Link>
                                    <Link to="/cart">
                                        {cartItems > 0 && (
                                            <span className="bg-red-500 text-white text rounded-full px-2 py-1 text-xs absolute -mt-1 ml-4">
                                                {cartItems}
                                            </span>
                                        )}
                                        <IoCart className="text-white text-4xl mt-1"/>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex space-x-4">
                                    <Link to="/login" className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 px-3 py-2 rounded-md text-2xl font-medium select-none hover:cursor-pointer">
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden" style={{
                maxHeight: navbarOpen ? '100vh' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.5s ease-in-out'
            }}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/products" className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 block px-3 py-2 rounded-md text-2xl font-medium">
                        Clothes
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 block px-3 py-2 rounded-md text-2xl font-medium">
                                Profile
                            </Link>
                            <Link to="/cart" className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 block px-3 py-2 rounded-md text-2xl font-medium">
                                Cart
                                <span className="bg-red-500 text-white text rounded-full px-2 py-1 text-xs ml-4">
                                    {cartItems}
                                </span>
                            </Link>
                            <p onClick={handleLogout} className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 block px-3 py-2 rounded-md text-2xl font-medium select-none hover:cursor-pointer">
                                Logout
                            </p>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-700 block px-3 py-2 rounded-md text-2xl font-medium select-none hover:cursor-pointer">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
