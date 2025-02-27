import React, { useEffect, useState } from 'react'
import chill from "../../assets/chill.png"
import { navigationMenu } from './NavigationMenu'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import avatar from "../../assets/avatar.jpg"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom'
import PostModal from './PostModal'
import MessageModal from './MessageModal'
import ChangePasswordModal from './ChangePasswordModal'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/Action'
import { getUserUnreadNotifications } from '../../redux/notification/Action'

const Navigation = () => {
    const { user, notification } = useSelector(store => store);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    useEffect(()=>{
        dispatch(getUserUnreadNotifications());
    },[notification.notifications?.length])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        console.log("Logged Out");
        handleClose();
        dispatch(logout())
    }
    const [openPostModal, setOpenPostModal] = React.useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);

    const [openMessageModal, setOpenMessageModal] = React.useState(false);
    const handleOpenMessageModal = () => setOpenMessageModal(true);
    const handleCloseMessageModal = () => setOpenMessageModal(false);

    const [openChangPasswordModal, setOpenChangPasswordModal] = React.useState(false);
    const handleOpenChangPasswordModal = () => setOpenChangPasswordModal(true);
    const handleCloseChangPasswordModal = () => setOpenChangPasswordModal(false);
    return (
        <div className='h-screen sticky top-0'>
            <div className='flex flex-col h-full'>
                <div onClick={() => navigate("/")} className='py-5 px-4 cursor-pointer flex'>
                    <img className='w-10 h-10 fill-current' src={chill} alt="" />
                    <h1 className='text-3xl font-semibold px-3 
                  bg-gradient-to-r from-blue-500 to-purple-500 
                  bg-clip-text text-transparent'>
                        ChillNet
                    </h1>
                </div>
                <div className='space-y-5'>
                    {navigationMenu.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                onClick={() => {
                                    if (item.title === "Profile") {
                                        navigate(`/profile/${user.reqUser?.id}`);
                                    } else if (item.title === "Messages") {
                                        handleOpenMessageModal();
                                    } else {
                                        navigate(item.path);
                                    }
                                }}
                                key={index}
                                className="cursor-pointer flex space-x-3 items-center 
                hover:bg-gray-200 rounded-full px-4 py-2 transition-all duration-200"
                            >
                                <svg width="30" height="30">
                                    <defs>
                                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: "blue", stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: "purple", stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <Icon style={{ fill: `url(#gradient-${index})` }} />
                                </svg>
                                <p className="text-xl">{item.title}</p>
                                {item.title === "Notifications" && notification?.unreadNotifications.length>0 && (
                                    <span className="ml-auto w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                                )}
                            </div>

                        );
                    })}


                </div>
                <div className='py-10 '>
                    <Button
                        onClick={handleOpenPostModal}
                        variant="contained"
                        sx={{
                            width: "100%",
                            borderRadius: "29px",
                            py: "15px",
                            fontSize: "17px",
                            textTransform: "none",
                            fontWeight: "bold",
                            backgroundImage: "linear-gradient(to right, blue, purple)",
                            opacity: 0.7,
                            "&:hover": {
                                opacity: 1,
                            },
                        }}
                    >
                        Post
                    </Button>
                </div>
                <div className='mt-auto mb-4'>
                    <div className='flex items-center justify-between w-full p-3 hover:bg-gray-200 
                rounded-full cursor-pointer transition-all duration-200'>
                        <div className='flex items-center space-x-3'>
                            <Avatar
                                alt="Username"
                                src={user.reqUser?.image}
                                sx={{ width: 40, height: 40 }}
                            />
                            <div>
                                <p className='font-bold text-lg'>{user.reqUser?.fullName}</p>
                                <p className='opacity-70'>
                                    @{user.reqUser?.username}
                                </p>
                            </div>
                        </div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ minWidth: 'auto' }}
                        >
                            <MoreHorizIcon sx={{ color: 'black' }} />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => navigate(`/profile/${user.reqUser?.id}`)}>Profile</MenuItem>
                            <MenuItem onClick={handleOpenChangPasswordModal}>Change Password</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <PostModal open={openPostModal} handleClose={handleClosePostModal} />
            <MessageModal open={openMessageModal} handleClose={handleCloseMessageModal} />
            <ChangePasswordModal open={openChangPasswordModal} handleClose={handleCloseChangPasswordModal} />
        </div>
    )
}

export default Navigation