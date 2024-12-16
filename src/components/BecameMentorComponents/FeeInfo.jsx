import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'

function FeeInfo() {
    return (
        <>
            <h1 className='text-center md:text-lg xl:text-xl font-cg-times mb-6 px-5'>These charges will take effect starting January 16, 2025. Until then, the service will remain free of charge.</h1> {/* remove this later */}
            <div className='w-full h-auto flex flex-col gap-3 justify-center md:flex-row xl:px-20 xl:my-10 xl:gap-10'>
                <div className='w-full h-auto flex flex-col px-5'>
                    <p className="py-1.5 border-l-2 px-3 md:text-lg font-semibold md:py-2 border-l-black text-[#000B26]">
                        Why We Charge?
                    </p>
                    <div className="w-full h-auto flex flex-col text-3xl font-bold mt-5 gap-2 md:gap-4 xl:text-5xl">
                        <h2>Why We Charge a</h2>
                        <h2>One-Time Application</h2>
                        <h2>Fee of ₹149?</h2>
                    </div>
                    <p className='mt-5'>This small fee reflects your commitment to making a difference. It enables us to build a community of dedicated mentors and allows you to quickly recoup the cost with just one session.</p>
                </div>
                <div className='w-full h-auto flex flex-col justify-center items-center px-5 gap-6 xl:gap-10'>
                    <div className='w-full h-auto flex justify-center items-center gap-4'>
                        <div className='w-auto h-full'>
                            <span className='p-3 rounded-full flex justify-center items-center shadow-md' style={{
                                background: "linear-gradient(180deg, #757575 0%, #000000 100%)",
                            }}><FaArrowRightLong size={20} className='text-white' /></span>
                        </div>
                        <div className='w-full h-auto flex flex-col text-[#000B26]'>
                            <span className='font-semibold text-2xl xl:text-4xl'>Quality & Commitment</span>
                            <span className='text-[#2C2C2C] xl:text-xl'>Ensures we bring in mentors who genuinely care.</span>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-center items-center gap-4'>
                        <div className='w-auto h-full'>
                            <span className='p-3 rounded-full flex justify-center items-center shadow-md' style={{
                                background: "linear-gradient(180deg, #757575 0%, #000000 100%)",
                            }}><FaArrowRightLong size={20} className='text-white' /></span>
                        </div>
                        <div className='w-full h-auto flex flex-col text-[#000B26]'>
                            <span className='font-semibold text-2xl xl:text-4xl'>Saves Time for Both</span>
                            <span className='text-[#2C2C2C] xl:text-xl'>Shows us your dedication and passion.</span>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-center items-center gap-4'>
                        <div className='w-auto h-full'>
                            <span className='p-3 rounded-full flex justify-center items-center shadow-md' style={{
                                background: "linear-gradient(180deg, #757575 0%, #000000 100%)",
                            }}><FaArrowRightLong size={20} className='text-white' /></span>
                        </div>
                        <div className='w-full h-auto flex flex-col text-[#000B26]'>
                            <span className='font-semibold text-2xl xl:text-4xl'>Quick Recovery</span>
                            <span className='text-[#2C2C2C] xl:text-xl'>Earn it back with your first impactful session.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-auto flex justify-center items-center'>
                <NavLink to='/signup' className='w-auto h-auto bg-blue-500 text-white font-semibold p-3 shadow-custom rounded-lg px-5'>Create Your Account Now</NavLink>
            </div>
        </>

    )
}

export default FeeInfo