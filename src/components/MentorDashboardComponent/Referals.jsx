import React, { useState } from 'react'
import Header from './Header'


function Referals() {
  const [localSidebarState, setLocalSidebarState] = useState(false)
  const [userData, setUserData] = useState({})

  function getUserData(data) {
    setUserData(data)
  }

  function handleStateChange() {
    setLocalSidebarState((prev) => !prev)
  }

  function copyContent() {
    const referralCode = userData?.referralsCode || "your-referral-code";
    const referralLink = `https://www.nexmentor.com/signup`;
    const content = `
Unlock Your NEET Success with Guidance from Recent NEET Toppers with NEXMENTOR!

• Choose your mentor based on state, score, gender, attempts, or NEET exam year.
• Receive one-on-one guidance from recent NEET toppers now pursuing MBBS.
• Get personalized study plans, detailed test analysis, and real-time support.
• Gain exclusive access to free weekly webinars every Sunday.

Referral Code: ${referralCode}

How to Get Started:

1. Visit the NEXMENTOR Registration Link: ${referralLink}
2. Enter my referral code and book your first session.
3. Limited Time Offer: Free Webinars Every Sunday!
    `;

    navigator.clipboard.writeText(content);
    alert("Content copied to clipboard!");
  }

  return (
    <div className='w-full h-auto flex flex-col bg-[#F4F4F4] lg:w-[70%] xl:w-[75%] 2xl:w-[80%]'>
      <Header getData={getUserData} handleStateChange={handleStateChange} />
      <div className={`${localSidebarState ? 'hidden' : 'flex flex-col'} w-[95%] h-auto mx-auto px-2 rounded-2xl my-8 py-6 bg-white xl:px-8 md:w-[80%] `}>
        <h1 className='w-full h-auto font-cg-times text-xl font-semibold lg:text-3xl'>Referals</h1>
        <div className='w-full h-auto flex flex-col mt-5 font-cg-times'>
          <h1 className='text-base sm:text-xl font-semibold lg:text-2xl'>NexMentor Refer and Earn Program</h1>
          <p className='text-sm lg:text-base my-3'>Dear Mentor,</p>
          <p className='text-sm lg:text-base'>We're excited to introduce the <span className='font-semibold'>NexMentor Refer and Earn Program</span>, where you can earn <span className='font-semibold'>₹30</span> for every successful student referral.</p>
          <h2 className='font-semibold lg:text-lg mt-6 mb-8'>How It Works:</h2>
          <h3 className='font-semibold lg:text-lg mb-3 pl-8'>1. Share Your Unique Referral Code:</h3>
          <p className='pl-8 text-sm lg:text-base'>You will receive a unique referral code <span className='font-semibold'>below</span> . share this code with students who could benefit from mentorship.</p>
          <h3 className='font-semibold lg:text-lg my-3 pl-8'>2. Student Sign Up:</h3>
          <p className='pl-8 text-sm lg:text-base'>Students must use your referral code during sign-up</p>
          <h3 className='font-semibold lg:text-lg my-3 pl-8'>3. Earn Rewards:</h3>
          <p className='pl-8 text-sm lg:text-base'>You will earn <span className='font-semibold'>₹30</span> when a referral student:</p>
          <ul className='my-3 list-disc list-inside pl-8 mb-8 text-sm lg:text-base'>
            <li>Signs up using your referral code.</li>
            <li>Books and completes their first session.</li>
          </ul>
          <h2 className='font-semibold lg:text-lg my-3'>Track Your Referrals:</h2>
          <p className='text-sm lg:text-base'>Monitor your referrals, successful sessions, and earned rewards through your <span className='font-semibold'>Mentor Dashboard</span>.</p>
          <h2 className='font-semibold lg:text-lg my-3'>Important Notes:</h2>
          <ul className='mb-3 list-disc list-inside text-sm lg:text-base'>
            <li>Referrals codes are only valid for <span>students sign-ups</span>.</li>
            <li>You'll be notified once your reward is credited after the student completes their first session.</li>
          </ul>
          <p className='text-sm lg:text-base my-3'>Start Referring students today and earn rewards !</p>
          <p className='text-sm lg:text-base'>If you have any questions, feel free to reach out</p>
        </div>
        {/* <div className='w-full h-auto flex flex-col bg-gray-100 p-3 lg:p-5 rounded-lg mt-5'>
          <div className='w-full h-auto flex flex-col mt-5 font-cg-times'>
            <h1 className='text-base lg:text-xl font-semibold'>
              Unlock Your NEET Success with Guidance from Recent NEET Toppers with NEXMENTOR!
            </h1>
            <p className='text-sm lg:text-base mt-3'>
            • Choose your mentor based on state, score, gender, attempts, or NEET exam year.
            </p>
            <p className='text-sm lg:text-base'>
            • Receive one-on-one guidance from recent NEET toppers now pursuing MBBS.
            </p>
            <p className='text-sm lg:text-base'>
            • Get personalized study plans, detailed test analysis, and real-time support.
            </p>
            <p className='text-sm lg:text-base'>
            • Gain exclusive access to free weekly webinars every Sunday.
            </p>
            <p className='text-sm lg:text-base font-bold my-3'>
              Referral Code: <span className='text-blue-500'>{userData?.referralsCode || 'your-referral-code'}</span>
            </p>
            <h2 className='font-semibold lg:text-lg mb-3'>How to Get Started:</h2>
            <ul className='list-disc list-inside text-sm lg:text-base'>
              <li>Visit <span className='text-blue-500 underline cursor-pointer underline-offset-4'>NEXMENTOR Registration Link</span>.</li>
              <li>Enter my referral code and book your first session.</li>
            </ul>
            <p className='text-sm lg:text-base my-3 font-semibold'>
              Limited Time Offer: Free Demo Sessions!
            </p>
          </div>
          <div className='w-full h-auto flex items-center mt-7 justify-center'>
            <button
              onClick={copyContent}
              className='p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold'
            >
              Copy and Share Referral Link
            </button>
          </div>
        </div> */}
        <div className='w-full h-auto flex flex-col bg-gray-100 p-3 lg:p-5 rounded-lg mt-5 relative select-none'>
          <div className='absolute inset-0 bg-white opacity-70 flex items-center justify-center'>
            <p className='text-xl font-semibold'>Referral system will be available from May</p>
          </div>
          <div className='w-full h-auto flex flex-col mt-5 font-cg-times blur-sm'>
            <h1 className='text-base lg:text-xl font-semibold'>
              Unlock Your NEET Success with Guidance from Recent NEET Toppers with NEXMENTOR!
            </h1>
            <p className='text-sm lg:text-base mt-3'>
            • Choose your mentor based on state, score, gender, attempts, or NEET exam year.
            </p>
            <p className='text-sm lg:text-base'>
            • Receive one-on-one guidance from recent NEET toppers now pursuing MBBS.
            </p>
            <p className='text-sm lg:text-base'>
            • Get personalized study plans, detailed test analysis, and real-time support.
            </p>
            <p className='text-sm lg:text-base'>
            • Gain exclusive access to free weekly webinars every Sunday.
            </p>
            <p className='text-sm lg:text-base font-bold my-3'>
              Referral Code: <span className='text-blue-500'>{userData?.referralsCode || 'your-referral-code'}</span>
            </p>
            <h2 className='font-semibold lg:text-lg mb-3'>How to Get Started:</h2>
            <ul className='list-disc list-inside text-sm lg:text-base'>
              <li>Visit <span className='text-blue-500 underline cursor-pointer underline-offset-4'>NEXMENTOR Registration Link</span>.</li>
              <li>Enter my referral code and book your first session.</li>
            </ul>
            <p className='text-sm lg:text-base my-3 font-semibold'>
              Limited Time Offer: Free Demo Sessions!
            </p>
          </div>
          <div className='w-full h-auto flex items-center mt-7 justify-center'>
            <button
              onClick={copyContent}
              className='p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold'
            >
              Copy and Share Referral Link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Referals