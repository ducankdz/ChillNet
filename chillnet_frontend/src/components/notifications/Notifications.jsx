import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Divider, Menu, MenuItem } from '@mui/material';
import avatar from "../../assets/avatar.jpg"
import verrifiedIcon from "../../assets/verified.png"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification, getUserNotifications, markNotificationAsRead } from '../../redux/notification/Action';


const Notifications = () => {
    const [keyword, setKeyword] = useState("");
    const { notification, user } = useSelector(store => store);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserNotifications());
    }, [user.reqUser, notification.notification, notification.notifications.length])
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    const [anchorEl, setAnchorEl] = useState({});
    const open = Boolean(anchorEl);
    const handleClick = (event, notificationId) => {
        setAnchorEl(prev => ({ ...prev, [notificationId]: event.currentTarget }));
    };

    const handleClose = (notificationId) => {
        setAnchorEl(prev => ({ ...prev, [notificationId]: null }));
    };
    const handleMarkAsRead = (notificationId) => {
        dispatch(markNotificationAsRead(notificationId));
        handleClose(notificationId);
    }
    const handleDeleteNotification = (notificationId) => {
        dispatch(deleteNotification(notificationId));
        handleClose(notificationId);
    }
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
                            <h1 className='text-xl font-bold flex-1 text-center'>Notifications</h1>
                        </div>
                    </section>
                </div>
                <div className='py-3 px-4 sticky top-0 h-screen over-flow-y-auto scrollbar-hide'>
                    <div className='rounded-2xl border border-gray-100'>
                        {notification.notifications?.map((item, index) => (
                            <div
                                key={index}
                                className='border-b border-gray-100 px-4 py-4 transition-colors flex items-center justify-between'
                            >
                                <div className='flex items-center'>
                                    {!item.read && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-4"></span>}
                                    <Avatar
                                        onClick={() => navigate(`/profile/${item?.sender?.id}`)}
                                        className='cursor-pointer'
                                        alt="Username"
                                        src={item?.sender?.image}
                                        sx={{
                                            width: 40,
                                            height: 40
                                        }}
                                    />

                                    <div className='ml-3'>
                                        <div className='flex items-center'>
                                            <p onClick={() => navigate(`/profile/${item?.sender?.id}`)} className='cursor-pointer font-bold text-[16px] hover:underline'>{item.sender?.username}</p>
                                            {item?.sender?.verified && (
                                                <img
                                                    className='ml-0.5 w-[17px] h-[17px]'
                                                    src={verrifiedIcon}
                                                    alt=""
                                                />
                                            )}
                                            <p className='px-1.5 text-gray-500'>{item?.content}</p>
                                        </div>
                                        {item?.post && <p onClick={() => navigate(`/post/${item?.post?.id}`)} className='text-[13px] line-clamp-1 cursor-pointer max-w-[580px] hover:underline'>
                                            {item?.post?.content}
                                        </p>}
                                    </div>
                                </div>
                                <Button
                                    id={`basic-button-${item.id}`}
                                    aria-controls={anchorEl[item.id] ? `basic-menu-${item.id}` : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={anchorEl[item.id] ? 'true' : undefined}
                                    onClick={(event) => handleClick(event, item.id)}
                                >
                                    <MoreHorizIcon sx={{ color: "black" }} />
                                </Button>
                                <Menu
                                    id={`basic-menu-${item.id}`}
                                    anchorEl={anchorEl[item.id]}
                                    open={Boolean(anchorEl[item.id])}
                                    onClose={() => handleClose(item.id)}
                                    MenuListProps={{ 'aria-labelledby': `basic-button-${item.id}` }}
                                >
                                    <MenuItem onClick={() => handleMarkAsRead(item.id)}>Mark as read</MenuItem>
                                    <MenuItem onClick={() => handleDeleteNotification(item.id)}>
                                        <span className='text-red-500 font-semibold'>Delete</span>
                                    </MenuItem>
                                </Menu>

                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications