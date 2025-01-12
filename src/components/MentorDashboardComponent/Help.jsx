import React, { useState } from 'react'
import Header from './Header'

function Help() {
    const [localSidebarState, setLocalSidebarState] = useState(false)

    function handleStateChange() {
        setLocalSidebarState((prev) => !prev)
    }

    return (
        <>
            <div className='w-full h-auto flex flex-col bg-[#F4F4F4] lg:w-[70%] xl:w-[75%] 2xl:w-[80%]'>
                <Header handleStateChange={handleStateChange} />
                <div className={`${localSidebarState ? 'hidden' : 'flex'} w-[95%] h-auto mx-auto px-2 rounded-2xl my-8 flex-col py-6 bg-white xl:px-5 md:w-[80%] font-cg-times `}>
                    <h1 className='text-lg md:text-xl font-bold'>Need Assistance? We’re Here to Support You!</h1>
                    <p className='md:text-lg my-5'>At NexMentor, we understand that our mentors may have questions or need help at times. To ensure you receive the assistance you need, we offer multiple contact options. Whether it’s a technical query, account issue, or general question, our team is ready to assist you.</p>
                    <h2 className='text-lg md:text-xl font-bold'>Contact Methods:</h2>
                    <ul className='my-5 list-inside list-disc md:text-lg'>
                        <li><span className='font-bold'>WhatsApp/Call: </span>For immediate support, contact us at +91 9103902768. This is the fastest way to get in touch and receive prompt responses.</li>
                        <li><span className='font-bold'>Email Support: </span>For non-urgent inquiries or detailed questions, reach out to us at <a href="mailto:" className='text-blue-500'>mentorsupport@nexmentor.com</a> . Our team will respond to your email as quickly as possible.</li>
                    </ul>
                    <h2 className='text-lg md:text-xl font-bold'>What to Include in Your Message for Quick Assistance:</h2>
                    <p className='md:text-lg my-5'>To help us better assist you, please ensure your message includes the following information:</p>
                    <ul className='mb-5 list-inside list-disc md:text-lg'>
                        <li><span className='font-bold'>Subject Line: </span> “NexMentor Mentor”</li>
                        <li><span className='font-bold'>Full Name: </span>So we can identify you as one of our mentors.</li>
                        <li><span className='font-bold'>Email Address: </span>To verify your account and contact you if needed.</li>
                        <li><span className='font-bold'>Detailed Query: </span>Describe your question or issue clearly.</li>
                        <li><span className='font-bold'>Any Relevant Attachments: </span>If applicable, include screenshots or documents to help us understand your situation better.</li>
                    </ul>
                    <h2 className='text-lg md:text-xl font-bold'>Why Contact Us?</h2>
                    <ul className='my-5 list-inside list-disc md:text-lg'>
                        <li><span className='font-bold'>Technical Assistance: </span> Issues with the mentor dashboard, platform navigation, or session-related problems.</li>
                        <li><span className='font-bold'>Account Support: </span>Help with profile updates, verification, and login issues.</li>
                        <li><span className='font-bold'>General Inquiries: </span>Questions regarding platform policies, session scheduling, and payment details.</li>
                    </ul>
                    <p className='md:text-lg my-5'>Your success and smooth experience as a mentor on NexMentor are our top priorities. Don’t hesitate to reach out — we’re here to make sure you have all the support you need to excel!</p>
                </div>
            </div>
        </>
    )
}

export default Help