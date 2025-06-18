import React from 'react'
import logo from '../assets/logo-D73hmps3.png';
import restaurant from '../assets/restaurant.png';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <div className='bg-[#FF5200] text-white w-[100%] h-[100vh]'>
                {/* Navbar idhar hai */}
                <nav className='flex justify-between p-20 items-center h-[100px]'>
                    <div className='w-[170px]'>
                        <img src={logo} />
                    </div>

                    <div className='flex gap-7'>
                        <button>Swiggy Corporate</button>
                        <button>Partner with us</button>
                        <button className='flex items-center gap-2 border border-white px-6 py-3 rounded'>
                            <p>Get the App</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 25 25"
                                className="w-5 h-5 fill-current mt-[5px] font-bold"
                            >

                                <g id="Right">
                                    <polygon
                                        points="17.5 5.999 16.793 6.706 22.086 11.999 1 11.999 1 12.999 22.086 12.999 16.792 18.294 17.499 19.001 24 12.499 17.5 5.999"
                                        fill="#ffffff"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                    />
                                </g>
                            </svg>
                        </button>

                        <button className='bg-black px-5 py-2 rounded'>Sign In</button>
                    </div>
                </nav>

                {/* Section Idhar hai */}
                <section className='w-[100%] border flex flex-col justify-center items-center'>
                    <p className='text-[50px] '>Order food & groceries. Discover</p>
                    <p className='text-[50px] leading-none'>best restaurants. Swiggy it!</p>

                    <div className='mt-[50px] text-black relative'>
                        <input className='border-none bg-white rounded h-[50px] w-[400px] placeholder-gray-400 px-2 focus:outline-none focus:border-none' placeholder='Search for restaurant, item or more' />
                        <svg className='w-[20px] fill-black absolute right-[25px] top-1/3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path stroke="black"
                            strokeWidth="1" d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" data-name="49-Search" /></svg>
                    </div>

                    <div>
                        {/* For restaurants */}
                        <Link to={'/restaurants'}>
                            <div className='border flex flex-col justify-start items-start pl-2 bg-white rounded-[5px]'>
                                <h1 className='font-bold text-black leading-3'>FOOD DELIVERY</h1>
                                <p className='text-gray-400 text-[13px]  tracking-tight' >FROM RESTAURANT</p>
                                <p className='px-2 bg-red-300 text-[10px] rounded-[10px] font-bold'>UPTO 60% OFF</p>
                                <div className='flex items-center'>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 25 25"
                                        className="w-8 h-8 border bg-[#FF5200] rounded-full p-2 fill-current mt-[5px] font-bold"
                                    >

                                        <g id="Right">
                                            <polygon
                                                points="17.5 5.999 16.793 6.706 22.086 11.999 1 11.999 1 12.999 22.086 12.999 16.792 18.294 17.499 19.001 24 12.499 17.5 5.999"
                                                fill="#ffffff"
                                                stroke="#ffffff"
                                                strokeWidth="2"
                                            />
                                        </g>
                                    </svg>
                                        <div className='w-[100px] h-[60px] overflow-hidden relative ml-4'>
                                    <img src={restaurant} className='w-[200px] relative  left-[20px]' />

                                        </div>
                                </div>

                            </div></Link>



                        <Link to={'/grocery'}>Grocery</Link>
                        <Link to={'/dineout'}>Dineout</Link>
                        <Link to={'/genie'}>Genie</Link>
                    </div>
                </section>


            </div>
        </>
    )
}

export default Home