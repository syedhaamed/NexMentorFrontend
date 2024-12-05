import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import io from "socket.io-client";
import { BsArrowRight } from "react-icons/bs";
import { FcGallery } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import Loading from './utils/Loading';
import { jwtDecode } from "jwt-decode";

const backend = import.meta.env.VITE_BACKEND_URL;

function ChatSingle() {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const messageDivRef = useRef(null);
    const [studentId, setStudentId] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({
        mentorId: '',
        profilePicture: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("userId"));
    const participantType = JSON.parse(localStorage.getItem("userType"))

    function handleBack() {
        navigate('/student-profile')
    }

    async function handleSubmitMessage() {
        try {
            const response = await axios.post(`${backend}/api/v1/message/send/${id}`, { message, participantType, senderId: studentId });
            setMessage('');
            setMessages((prevMessages) => [...prevMessages, response.data.data]);
            setTimeout(() => {
                messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
            }, 200);
        } catch (error) {
            console.error('Error while sending message', error);
        }
    }

    async function fetchUserDetails() {
        try {
            setLoading(true)
            const details = { searchedUserId: id };
            const response = await axios.post(`${backend}/api/v1/message/searched-user-details-mentors`, details);
            console.log(response.data.data);

            const { mentorId, profilePicture } = response.data.data;
            setUserData({ mentorId, profilePicture });
            setLoading(false)
        } catch (error) {
            console.log("Error while fetching user details", error);
            setLoading(false)
        }
    }

    async function fetchPreviousMessages() {
        try {
            setLoading(true)
            const response = await axios.get(`${backend}/api/v1/message/${id}`, { senderId: studentId });
            setMessages(response.data.data);
            setLoading(false)

        } catch (error) {
            console.log("Error while fetching previous messages", error);
            setLoading(false)

        }
    }

    async function messageRead() {
        try {
            const response = await axios.post(`${backend}/api/v1/message/read-message/${id}`, { senderId: studentId })
        } catch (error) {
            console.log("Error while reading message", error);
        }
    }


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("auth"))
        const userId = JSON.parse(localStorage.getItem("userId"))
        const user = JSON.parse(localStorage.getItem("userType"))
        if (token && userId && user === 'Student') {
            const decodedToken = jwtDecode(token);
            if (decodedToken.id === userId) {
                setStudentId(decodedToken.id)
                fetchUserDetails();
                fetchPreviousMessages();
                messageRead()
                setTimeout(() => {
                    messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
                }, 300);
            }
        }
        else {
            navigate('/')
            localStorage.removeItem("userId")
            localStorage.removeItem("auth")
            localStorage.removeItem("userType")
        }
    }, [id]);


    useEffect(() => {
        if (currentUser) {
            const socketInstance = io(server, {
                query: {
                    userId: currentUser,
                },
            });

            setSocket(socketInstance);

            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socketInstance.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [currentUser, server]);

    useEffect(() => {
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setTimeout(() => {
                messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
            }, 300);
        });

        return () => socket.off("newMessage");
    }, [socket]);


    return (
        <>
            {
                loading && <Loading />
            }
            <div className='w-full h-full flex flex-col relative xl:border-[1px] xl:border-gray-500 xl:rounded-xl'>
                <div className='w-full flex justify-between items-center border-b-2 border-black p-3'>
                    <div className='flex gap-4 items-center'>
                        <img
                            src={userData.profilePicture}
                            alt="profile Image"
                            className='w-8 h-8 2xl:w-10 2xl:h-10 bg-gray-200 rounded-full border-[1px] border-blue-500'
                        />
                        <span className='font-semibold'>{userData.mentorId}</span>
                    </div>
                    <BsArrowRight size={25} className='ml-3 cursor-pointer' onClick={handleBack} />
                </div>

                <div ref={messageDivRef} className='w-full flex-grow overflow-y-auto p-3 scrollbar-none disable-scrollbar'>
                    {
                        messages?.map((user, index) => (
                            user.senderId !== id
                                ? <div key={index} className='w-full flex justify-end mt-3'>
                                    <div className='w-auto rounded-full bg-blue-500 text-white flex items-center px-4 py-2 mr-2'>
                                        {user.message}
                                    </div>
                                </div>
                                : <div key={index} className='w-full flex mt-3'>
                                    <div className='w-auto rounded-full bg-gray-200 flex items-center px-4 py-2 ml-2'>
                                        {user.message}
                                    </div>
                                </div>
                        ))
                    }
                </div>

                <div className='w-full p-4'>
                    <div className='w-[90%] h-12 border-[1px] border-black rounded-3xl mx-auto flex p-2 shadow-xl'>
                        <div className='p-1.5 rounded-full bg-gray-200 flex items-center cursor-pointer'>
                            <FcGallery size={20} />
                        </div>
                        <div className='flex-1 px-3'>
                            <input
                                type="text"
                                placeholder='Message...'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' ? handleSubmitMessage() : null}
                                className='w-full h-full px-1 outline-none bg-white'
                            />
                        </div>
                        <div className='p-1.5 rounded-full bg-gray-200 flex items-center cursor-pointer'>
                            <span onClick={handleSubmitMessage} >
                                <IoMdSend size={20} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatSingle