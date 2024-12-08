import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'

const backend = import.meta.env.VITE_BACKEND_URL;

function Notifications() {
  const [localSidebarState, setLocalSidebarState] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [mentorId, setMentorId] = useState('')

  function handleStateChange() {
    setLocalSidebarState((prev) => !prev)
  }

  function getUserData(data) {
    setMentorId(data._id)
    setNotifications(data.notifications.reverse())
  }

  async function readNotifications() {
    try {
      const response = await axios.post(`${backend}/api/v1/mentors/read-notifications`, { mentorId });
    } catch (error) {
      console.log("Error while reading notifications", error);
    }
  }

  useEffect(() => {
    readNotifications()
  }, [mentorId])


  return (
    <div className='w-full h-auto flex flex-col bg-[#F4F4F4] lg:w-[70%] xl:w-[75%] 2xl:w-[80%]'>
      <Header getData={getUserData} handleStateChange={handleStateChange} />
      <div className={`${localSidebarState ? 'hidden' : 'flex'} w-[95%] h-[80vh] mx-auto px-2 rounded-2xl my-8 max-h-[90vh] flex-col py-6 bg-white xl:px-5 md:w-[40%] `}>
        <h1 className='w-full h-auto font-cg-times text-xl font-semibold lg:text-2xl'>Notifications</h1>
        <div className='disable-scrollbar w-full h-auto flex flex-col max-h-full overflow-y-scroll mt-3'>
          {
            notifications?.map((item, index) => (
              <p key={index} className='text-sm md:text-base font-cg-times border-b-2 py-4 '>
                {item.message}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Notifications