import React, { useEffect, useState } from 'react'
import Header from './Header'
import { IoSearch } from "react-icons/io5";
import Loading from '../utils/Loading';

function ClearedPayment() {
    const [localSidebarState, setLocalSidebarState] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clearedAmountMentors, setClearedAmountMentors] = useState([])
    const [originalClearedAmountMentors, setOriginalClearedAmountMentors] = useState([])
    const [searchedMentor, setSearchedMentor] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = clearedAmountMentors.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(clearedAmountMentors.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleViewImage = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    function getData(e) {
        setClearedAmountMentors(e.clearedAmount)
        setOriginalClearedAmountMentors(e.clearedAmount)
    }

    function handleStateChange() {
        setLocalSidebarState((prev) => !prev)
    }

    function searchMentors(mentorId) {
        if (mentorId.length > 3) {
            const filteredClearedAmount = originalClearedAmountMentors.filter(
                (mentor) => mentor.mentorId === mentorId
            );
            setClearedAmountMentors(filteredClearedAmount);
        } else if (mentorId === '') {
            setClearedAmountMentors(originalClearedAmountMentors);
        }
    }

    function handlekeyDown(event) {
        if (event.key === "Enter") {
            searchMentors(searchedMentor);
        }
    }

    function convertToIST(isoDateString) {
        const date = new Date(isoDateString);
        return date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    }

    useEffect(() => {
        if (searchedMentor === '') {
            setClearedAmountMentors(originalClearedAmountMentors);
        }
    }, [searchedMentor, originalClearedAmountMentors]);


    return (
        <>
            {
                loading && <Loading />
            }
            <div className='w-full h-auto flex flex-col bg-[#F4F4F4] lg:w-[70%] xl:w-[75%] 2xl:w-[80%]'>
                <Header getData={getData} handleStateChange={handleStateChange} />
                <div className={`${localSidebarState ? 'hidden' : 'flex'} w-[95%] mx-auto px-2 rounded-2xl my-8 min-h-[90vh] max-h-auto flex flex-col py-6 bg-white xl:px-5`}>
                    <div className='w-full h-auto flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
                        <span className='text-2xl font-[poppins] font-semibold xl:text-3xl'>Total Payout Mentors</span>
                        <div className='border-[1px] border-[#979797] w-auto h-auto px-3 flex items-center gap-3 rounded-xl'>
                            <IoSearch onClick={() => searchMentors(searchedMentor)} size={20} />
                            <input type="text" value={searchedMentor} onKeyDown={handlekeyDown} onChange={(e) => setSearchedMentor(e.target.value)} placeholder='Search by MentorID' className='outline-none h-auto w-full py-2' />
                        </div>
                    </div>
                    <table className="min-w-full overflow-x-scroll mt-4">
                        <thead className="bg-[#9EDFFF63] border-b border-gray-300">
                            <tr>
                                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    MentorId
                                </th>
                                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount Cleared
                                </th>
                                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image of Proof
                                </th>
                                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Clear Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((item, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                                        {item?.mentorId}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                                        {item?.email}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                                        ₹{item?.amountCleared}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                                        <span onClick={() => handleViewImage(item?.imageOfProof)} className='text-blue-500 underline cursor-pointer'>View</span>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                                        {convertToIST(item?.clearDate)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        clearedAmountMentors.length > 15 && (
                            <div className="flex items-center justify-center space-x-4 mt-6">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium 
            ${currentPage === 1
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"}`}
                                >
                                    Previous
                                </button>
                                <span className="text-sm font-medium text-gray-700">
                                    Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium 
            ${currentPage === totalPages
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"}`}
                                >
                                    Next
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ClearedPayment