import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setToggleSidebar } from '../store/SidebarSlice';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const backend = import.meta.env.VITE_BACKEND_URL;

function Header({ handleStateChange, getData }) {
    const [sideBar, setSideBar] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleSidebar() {
        setSideBar((prevSideBar) => !prevSideBar);
        handleStateChange()
    }

    async function fetchUser(id) {
        try {
            const response = await axios.post(`${backend}/api/v1/mentors/mentor-details`, { id })
            if (response.data.statusCode === 200) {
                setUserDetails(response.data.data)
                if (getData) {
                    getData(response.data.data);
                }
            }
        } catch (error) {
            console.log("Error while fetching user details", error);
        }
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("auth"))
        const userId = JSON.parse(localStorage.getItem("userId"))
        const user = JSON.parse(localStorage.getItem("userType"))
        if (token && userId && user === 'Mentor') {
            const decodedToken = jwtDecode(token);
            if (decodedToken.id === userId) {
                fetchUser(decodedToken.id)
            }
        }
        else {
            navigate('/')
            localStorage.removeItem("userId")
            localStorage.removeItem("auth")
            localStorage.removeItem("userType")
        }
    }, [])

    useEffect(() => {
        dispatch(setToggleSidebar(sideBar));
    }, [sideBar, dispatch]);
    
    return (
        <div className='w-full h-auto flex justify-between items-center p-5 bg-white'>
            <div className='flex w-auto h-auto gap-2 items-center sm:gap-4'>
                {
                    sideBar ? <IoClose onClick={handleSidebar} size={25} className='lg:hidden cursor-pointer' /> : <FaBars onClick={handleSidebar} size={25} className='lg:hidden cursor-pointer' />
                }
                <span className='font-[inter] font-semibold text-xl lg:text-3xl'>Dashboard</span>
            </div>
            <div className='flex w-auto h-auto gap-4 items-center lg:gap-8'>
                <NavLink to='/mentor-dashboard/notifications'><IoNotificationsOutline size={25} /></NavLink>
                <NavLink to='/mentor-dashboard/chat'><IoMailOutline size={25} /></NavLink>
                <span className=''><img src={userDetails?.profilePicture} alt="profile Picture" className='h-9 w-9 bg-gray-200 rounded-full border-[1px] object-cover border-blue-500 xl:w-12 xl:h-12' /></span>
            </div>
        </div>
    )
}

export default Header