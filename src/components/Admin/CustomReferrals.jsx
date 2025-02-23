import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import Loading from '../utils/Loading';
import { MdDelete } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const backend = import.meta.env.VITE_BACKEND_URL;

function CustomReferrals() {
    const [localSidebarState, setLocalSidebarState] = useState(false)
    const [loading, setLoading] = useState(false)
    const [adminId, setAdminId] = useState('')
    const [referrals, setReferrals] = useState([])
    const [referralsDetails, setReferralsDetails] = useState({
        name: '',
        code: ''
    })
    const navigate = useNavigate()

    function handleStateChange() {
        setLocalSidebarState((prev) => !prev)
    }

    async function getReferrals() {
        try {
            const response = await axios.get(`${backend}/api/v1/referred/all`)
            if (response.data.statusCode === 200) {
                console.log(response.data.data)
                setReferrals(response.data.data)
            }
        } catch (error) {
            console.log("Error while getting referrals", error);
        }
    }

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`${backend}/api/v1/referred/delete/${id}`)
            if (response.data.statusCode === 200) {
                alert('Referral deleted successfully')
                getReferrals()
            }
        } catch (error) {
            console.log("Error while deleting referrals", error);
        }
    }

    async function createReferrals() {
        try {
            const response = await axios.post(`${backend}/api/v1/referred/create`, referralsDetails)
            if (response.data.statusCode === 200) {
                alert('Referral created successfully')
                getReferrals()
                setReferralsDetails({
                    name: '',
                    code: ''
                })
            }
        } catch (error) {
            console.log("Error while creating referrals", error);
        }
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("auth"))
        const adminId = JSON.parse(localStorage.getItem("adminId"))
        if (token && adminId) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.id === adminId) {
                setAdminId(decodedToken.id)
                getReferrals()
            }
        }
        else {
            navigate('/')
            localStorage.removeItem("adminId")
            localStorage.removeItem("auth")
        }
    }, [])

    return (
        <>
            {
                loading && <Loading />
            }
            <div className='w-full h-auto flex flex-col bg-[#F4F4F4] lg:w-[70%] xl:w-[75%] 2xl:w-[80%]'>
                <Header handleStateChange={handleStateChange} />
                <div className={`${localSidebarState ? 'hidden' : 'flex'} w-[95%] mx-auto px-2 rounded-2xl my-8 min-h-[90vh] max-h-auto flex flex-col py-6 bg-white xl:px-5`}>
                    <div className='w-full h-auto flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
                        <span className='text-2xl font-[poppins] font-semibold xl:text-3xl'>All Custom Referrals</span>
                    </div>
                    <div className='w-full h-auto flex flex-col mt-10 lg:border-[1px] rounded-lg lg:border-gray-300 lg:shadow-custom gap-5 p-5'>
                        <form onSubmit={(e) => { e.preventDefault(); createReferrals() }} className='flex flex-col gap-4'>
                            <label className='flex flex-col'>
                                <span className='text-gray-700 font-medium'>Name</span>
                                <input
                                    type='text'
                                    onChange={(e) => setReferralsDetails({ ...referralsDetails, name: e.target.value })}
                                    value={referralsDetails.name}
                                    placeholder='Enter Organisation Name'
                                    className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </label>

                            <label className='flex flex-col'>
                                <span className='text-gray-700 font-medium'>Code</span>
                                <input
                                    type='text'
                                    onChange={(e) => setReferralsDetails({ ...referralsDetails, code: e.target.value })}
                                    placeholder='Enter code'
                                    value={referralsDetails.code}
                                    className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </label>

                            <button
                                type='submit'
                                className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition'
                            >
                                Create Referral
                            </button>
                        </form>
                    </div>
                    <div className='w-full overflow-x-auto mt-10 lg:border-[1px] rounded-lg lg:border-gray-300 lg:shadow-custom p-5' style={{
                        scrollbarWidth: 'none',
                    }}>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-gray-200 text-gray-700 text-left'>
                                    <th className='p-3 border'>Name</th>
                                    <th className='p-3 border'>Code</th>
                                    <th className='p-3 border'>Students Registered</th>
                                    <th className='p-3 border'>Sessions Completed</th>
                                    <th className='p-3 border'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referrals.map((referral) => (
                                    <tr key={referral._id} className='text-gray-800 text-left hover:bg-gray-100'>
                                        <td className='p-3 border'>{referral.name}</td>
                                        <td className='p-3 border'>{referral.code}</td>
                                        <td className='p-3 border'>{referral.studentsRegistered}</td>
                                        <td className='p-3 border'>{referral.studentsCompletedSessions}</td>
                                        <td className='p-3 border'>
                                            <button
                                                onClick={() => handleDelete(referral._id)}
                                                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomReferrals