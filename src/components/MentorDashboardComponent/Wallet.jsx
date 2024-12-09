import React, { useEffect, useState } from 'react'
import Header from './Header'
import { LuIndianRupee } from "react-icons/lu";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const backend = import.meta.env.VITE_BACKEND_URL;

function Wallet() {
  const [localSidebarState, setLocalSidebarState] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Bank')
  const [info, setInfo] = useState('')
  const [paymentHistory, setPaymentHistory] = useState([])
  const [mentorId, setMentorId] = useState('')
  const [mentorCategory, setMentorCategory] = useState('')
  const [accountDetails, setAccountDetails] = useState({
    accountHolderName: '',
    ifscCode: ''
  })
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentHistory.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);

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


  const paymentMethods = ["Bank", "Google Pay", "Paytm", "PhonePe"]

  function getUserData(data) {
    if (data.neetScore <= 599) {
      setMentorCategory('M1')
    }
    else if (data.neetScore >= 600 && data.neetScore <= 640) {
      setMentorCategory('M2')
    }
    else if (data.neetScore >= 641 && data.neetScore <= 680) {
      setMentorCategory('M3')
    } else {
      setMentorCategory('M4')
    }
    setUserData(data)
  }

  function handlePayment(item) {
    setSelectedPaymentMethod(item)
    setInfo('')
  }

  function handleStateChange() {
    setLocalSidebarState((prev) => !prev)
  }

  async function getPaymentHistory(id) {
    try {
      const response = await axios.post(`${backend}/api/v1/admin/get-payment-history`)
      if (response.data.statusCode === 200) {
        const totalPaymentHistory = response.data.data.filter(item => item.id === id)
        setPaymentHistory(totalPaymentHistory)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

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

  async function updateDetails() {
    try {
      const response = await axios.post(`${backend}/api/v1/mentors/update-payment-details`, { paymentMethod: selectedPaymentMethod, paymentInfo: info, accountHolderName: accountDetails.accountHolderName, ifscCode: accountDetails.ifscCode, mentorId })
      if (response.data.statusCode === 200) {
        alert("Payment details updated successfully")
        setInfo('')
        setAccountDetails({ accountHolderName: '', ifscCode: '' })
      }
    } catch (error) {
      console.log("Error while updating details", error);
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"))
    const userId = JSON.parse(localStorage.getItem("userId"))
    const user = JSON.parse(localStorage.getItem("userType"))
    if (token && userId && user === 'Mentor') {
      const decodedToken = jwtDecode(token);
      if (decodedToken.id === userId) {
        setMentorId(decodedToken.id)
        getPaymentHistory(decodedToken.id)
      }
    }
    else {
      navigate('/')
      localStorage.removeItem("userId")
      localStorage.removeItem("auth")
      localStorage.removeItem("userType")
    }
  }, [])

  return (
    <div className='w-full h-auto flex flex-col bg-[#F4F4F4] lg:w-[70%] xl:w-[75%] 2xl:w-[80%]'>
      <Header getData={getUserData} handleStateChange={handleStateChange} />
      <div className={`${localSidebarState ? 'hidden' : 'flex flex-col'} w-[95%] h-auto mx-auto px-4 rounded-2xl my-8 py-6 bg-white xl:px-5 md:w-[85%]`}>
        <h1 className='w-full h-auto font-cg-times text-xl font-semibold lg:text-2xl'>Wallet</h1>
        <div className='w-full h-auto flex justify-end items-center font-cg-times'>
          <div className='flex gap-2 items-center px-6 py-2 bg-yellow-200 rounded-2xl lg:py-3 lg:gap-4'>
            <span className='p-1 bg-yellow-500 rounded-full'><LuIndianRupee size={20} /></span>
            <span className=''>Wallet : ₹ {userData?.wallet}</span>
          </div>
        </div>
        <div className='w-full h-auto flex flex-col font-cg-times'>
          <p className='font-semibold'>Note :</p>
          <p className='w-full h-auto mt-4 text-sm md:text-base'>1. You have earned a total of ₹ {userData?.wallet} in your wallet.</p>
          <p className='w-full h-auto mt-3 text-sm md:text-base'>2. To transfer your earnings, please provide your payment details. We support the following methods: Bank Account Number, Paytm, Google Pay, PhonePe</p>
          <p className='w-full h-auto mt-3 text-sm md:text-base'>3. Your wallet funds will be transferred to your chosen payment method on every month 5th.</p>
          <p className='w-full h-auto mt-3 text-sm md:text-base'>4. Once the transfer is complete, you will receive a notification confirming the transaction.</p>
          <p className='w-full h-auto mt-3 text-sm md:text-base'>5. If you have any questions or issues, feel free to contact our support team.</p>
          <p className='w-full h-auto mt-3 text-sm md:text-base'>6. If you have already updated your payment details, you can skip this step and if you still do that then your previous payment details will be overridden.</p>
        </div>
        <div className='w-[95%] p-4 my-10 h-auto mx-auto flex flex-col gap-3 rounded-lg shadow-custom border text-xs md:text-base font-semibold'>
          <p>"You come under the {mentorCategory} category (NEET score up to {mentorCategory === 'M1' ? '599' : mentorCategory === 'M2' ? '600-640' : mentorCategory === 'M3' ? '641-680' : '681-720'}). You will earn ₹{mentorCategory === 'M1' ? '120' : mentorCategory === 'M2' ? '150' : mentorCategory === 'M3' ? '180' : '210'} for each session completed. If you refer a student, you will receive an additional ₹50. This brings your total earning to ₹{mentorCategory === 'M1' ? '120' : mentorCategory === 'M2' ? '150' : mentorCategory === 'M3' ? '180' : '210'} + ₹50 = ₹{mentorCategory === 'M1' ? 120 + 50 : mentorCategory === 'M2' ? 150 + 50 : mentorCategory === 'M3' ? 180 + 50 : 210 + 50} per session."</p>
        </div>
        <div className='w-full h-auto flex flex-col'>
          <div className='w-full h-auto flex flex-wrap justify-center items-center gap-2 xl:gap-4'>
            {
              paymentMethods.map((item, index) => (
                <span key={index} onClick={() => handlePayment(item)} className={`${selectedPaymentMethod === item ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-5 py-2  rounded-xl text-sm xl:text-base cursor-pointer font-cg-times `}>{item}</span>
              ))
            }
          </div>
          <div className='w-full h-auto flex flex-col mt-10 gap-3 mb-7'>
            {
              selectedPaymentMethod === 'Bank' && (<div className='w-full h-auto flex flex-col items-center gap-3 md:flex-row'>
                <div className='w-full h-auto flex flex-col gap-3 md:w-[48%]'>
                  <label htmlFor="holderName" className='font-cg-times xl:text-lg'>Account Name</label>
                  <input type="text" value={accountDetails.accountHolderName} onChange={(e) => setAccountDetails({ ...accountDetails, accountHolderName: e.target.value })} placeholder='Account Holder Name' id='holderName' className='outline-none px-2 py-2 border-[1px] border-gray-200' />
                </div>
                <div className='w-full h-auto flex flex-col gap-3 md:w-[48%]'>
                  <label htmlFor="ifsc" className='font-cg-times xl:text-lg'>IFSC Code</label>
                  <input type="text" value={accountDetails.ifscCode} onChange={(e) => setAccountDetails({ ...accountDetails, ifscCode: e.target.value })} placeholder='Enter IFSC Code' id='ifsc' className='outline-none px-2 py-2 border-[1px] border-gray-200' />
                </div>
              </div>)
            }
            <div className='w-full h-auto flex flex-col gap-3'>
              <label htmlFor="bank" className='font-cg-times xl:text-lg'>
                {
                  selectedPaymentMethod === 'Bank'
                    ? 'Account Number'
                    : selectedPaymentMethod === 'Google Pay'
                      ? 'Google Pay'
                      : selectedPaymentMethod === 'Paytm'
                        ? 'Paytm'
                        : selectedPaymentMethod === 'PhonePe'
                          ? 'PhonePe'
                          : null
                }
              </label>
              <input type="text"
                placeholder={
                  selectedPaymentMethod === 'Bank'
                    ? 'XXXX XXXX XXXX XXXX'
                    : selectedPaymentMethod === 'Google Pay'
                      ? 'mobile_number@upi'
                      : selectedPaymentMethod === 'Paytm'
                        ? 'mobile_number@paytm'
                        : selectedPaymentMethod === 'PhonePe'
                          ? 'mobile_number@ybl'
                          : null
                }
                id='bank'
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className='outline-none px-2 py-2 border-[1px] border-gray-200' />
            </div>
            <div className='w-full h-auto flex justify-center items-center mt-4'>
              <button onClick={updateDetails} className='px-5 py-2 bg-blue-500 text-white font-semibold font-cg-times rounded-md'>Update Details</button>
            </div>
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
          paymentHistory.length > 5 && (
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
  )
}

export default Wallet