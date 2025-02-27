import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Divider } from '@mui/material';
import avatar from "../../assets/avatar.jpg"
import verrifiedIcon from "../../assets/verified.png"
import { useDispatch, useSelector } from 'react-redux';
import { followUser, searchUser, suggestUser } from '../../redux/user/Action';


const SearchSection = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store);
    const [keyword, setKeyword] = useState("");
    const [followedUsers, setFollowedUsers] = useState({});
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
        dispatch(searchUser(e.target.value));
    }
    const handleFollowUser = (userId) => {
        dispatch(followUser(userId))
        setFollowedUsers(prev => ({ ...prev, [userId]: true }));
    }
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        if (jwt) {
            dispatch(suggestUser());
        }
    }, [jwt])
    return (
        <div className='px-20'>
            <div className='border-l border-r border-gray-100'>
                {/* Header */}
                <div className='bg-white/80 backdrop-blur-md sticky top-0 z-10'>
                    <section className='px-4 py-4 border-b border-gray-100'>
                        <div className='flex items-center space-x-4'>
                            <KeyboardBackspaceIcon
                                onClick={handleBack}
                                className="cursor-pointer text-gray-700 hover:text-black transition duration-300"
                                sx={{ fontSize: "24px" }}
                            />
                            <h1 className='text-xl font-bold flex-1 text-center'>Search</h1>
                        </div>
                    </section>
                </div>
                <div className='py-3 px-4 sticky top-0 h-screen over-flow-y-auto scrollbar-hide'>
                    <div className='sticky top-0 bg-white pb-3 flex items-center gap-3'>
                        <div className='relative flex-1'>
                            <div className='absolute left-3 h-full flex items-center'>
                                <SearchIcon className='text-gray-500' sx={{ fontSize: 20 }} />
                            </div>
                            <input
                                onChange={handleSearchChange}
                                placeholder='Search'
                                type="text"
                                className='w-full bg-gray-100 rounded-full py-3 pl-11 pr-5 text-[16px] outline-none focus:bg-white focus:ring-1 focus:ring-primary-blue border border-transparent focus:border-primary-blue'
                            />
                        </div>
                    </div>
                    {/* <div>
                            <h1 className='px-5 text-lg font-semibold'>Suggestion</h1>
                        </div> */}
                    <div className='rounded-2xl border border-gray-100'>
                        <h2 className='text-[20px] font-bold px-4 pt-3 pb-1'>Suggested for you</h2>
                        {keyword ?
                            user?.users?.map((item, index) => (
                                <div
                                    key={index}
                                    className='border-b border-gray-100 px-4 py-4 transition-colors flex items-center justify-between'
                                >
                                    <div className='flex items-center'>
                                        <Avatar
                                            onClick={() => navigate(`/profile/${item?.id}`)}
                                            className='cursor-pointer'
                                            alt="Username"
                                            src={item?.image}
                                            sx={{
                                                width: 40,
                                                height: 40
                                            }}
                                        />
                                        <div className='ml-3'>
                                            <div className='flex items-center'>
                                                <p onClick={() => navigate(`/profile/${item?.id}`)}
                                                    className='cursor-pointer font-bold text-[15px] hover:underline'>
                                                    {item?.username}
                                                </p>
                                                {item?.verified && (
                                                    <img
                                                        className='ml-0.5 w-[17px] h-[17px]'
                                                        src={verrifiedIcon}
                                                        alt=""
                                                    />
                                                )}
                                            </div>
                                            {/* <p className='text-[13px] text-gray-500'>Trần Đức Anh</p> */}
                                            <p className='text-gray-500 text-sm'>{item?.fullName}</p>
                                        </div>

                                    </div>

                                    {item.id !== user?.reqUser?.id && (
                                        item.followed ? (
                                            <p className='px-4.5 font-bold text-[#bdbdbd]'>Followed</p>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleFollowUser(item?.id)}
                                                disabled={followedUsers[item?.id]}
                                                sx={{
                                                    borderRadius: "20px",
                                                    paddingX: "20px",
                                                    color: "blue",
                                                    textTransform: "none",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    transition: "0.3s",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                                                        color: "darkblue"
                                                    }
                                                }}
                                            >
                                                {followedUsers[item.id] ? "Followed" : "Follow"}
                                            </Button>
                                        )
                                    )}
                                </div>
                            ))
                            :
                            user?.suggestUsers?.map((item, index) => (
                                <div
                                    key={index}
                                    className='border-b border-gray-100 px-4 py-4 transition-colors flex items-center justify-between'
                                >
                                    <div className='flex items-center'>
                                        <Avatar
                                            onClick={() => navigate(`/profile/${item?.id}`)}
                                            className='cursor-pointer'
                                            alt="Username"
                                            src={item?.image}
                                            sx={{
                                                width: 40,
                                                height: 40
                                            }}
                                        />
                                        <div className='ml-3'>
                                            <div className='flex items-center'>
                                                <p onClick={() => navigate(`/profile/${item?.id}`)}
                                                    className='cursor-pointer font-bold text-[15px] hover:underline'>
                                                    {item?.username}
                                                </p>
                                                {item?.verified && (
                                                    <img
                                                        className='ml-0.5 w-[17px] h-[17px]'
                                                        src={verrifiedIcon}
                                                        alt=""
                                                    />
                                                )}
                                            </div>
                                            {/* <p className='text-[13px] text-gray-500'>Trần Đức Anh</p> */}
                                            <p className='text-gray-500 text-sm'>{item?.fullName}</p>
                                        </div>

                                    </div>

                                    {item.id !== user?.reqUser?.id && (
                                        item.followed ? (
                                            <p className='px-4.5 font-bold text-[#bdbdbd]'>Followed</p>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleFollowUser(item?.id)}
                                                disabled={followedUsers[item.id]}
                                                sx={{
                                                    borderRadius: "20px",
                                                    paddingX: "20px",
                                                    color: "blue",
                                                    textTransform: "none",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    transition: "0.3s",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                                                        color: "darkblue"
                                                    }
                                                }}
                                            >
                                                {followedUsers[item.id] ? "Followed" : "Follow"}
                                            </Button>
                                        )
                                    )}
                                </div>
                            ))
                        }
                        {/* <div className='px-4 py-3 text-[15px] text-[blue] hover:bg-gray-100 cursor-pointer transition-colors rounded-b-2xl'>
                                Show more
                            </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSection