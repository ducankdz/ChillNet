import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser } from '../../redux/user/Action';
import { Avatar, Button } from '@mui/material';
import verrifiedIcon from "../../assets/verified.png"
import { useNavigate } from 'react-router-dom';

const ListUser = ({ item }) => {
    console.log(item);
    const navigate = useNavigate();
    const {user} = useSelector(store=>store);
    const dispatch = useDispatch();
    const [followedUsers, setFollowedUsers] = useState({});
    const handleFollowUser = (userId) => {
        dispatch(followUser(userId))
        setFollowedUsers(prev => ({ ...prev, [userId]: true }));
    }
    return (
        <div className='px-3 over-flow-y-auto scrollbar-hide'>
            <div className='py-1'>
                {/* <h2 className='text-[20px] font-bold px-4 pt-3 pb-1'>Suggested for you</h2> */}
                <div
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
            </div>
        </div>
    )
}

export default ListUser