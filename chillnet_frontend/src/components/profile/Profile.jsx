import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import avatar from "../../assets/avatar.jpg";
import verifiedIcon from '../../assets/verified.png';
import { Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import ImagePreviewModal from './ImagePreviewModal';
import ProfileModal from './ProfileModal';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostCard from '../home_section/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { findUserById, followUser } from '../../redux/user/Action';
import { getUserLikedPosts, getUserPosts, getUserSavedPosts } from '../../redux/post/Action';

export default function Profile() {
    const { user, post } = useSelector(store => store);
    const dispatch = useDispatch();
    const { userId } = useParams();
    useEffect(() => {
        dispatch(findUserById(userId));
        dispatch(getUserPosts(userId));
        dispatch(getUserLikedPosts(userId));
        dispatch(getUserSavedPosts(userId));
    }, [userId, post.like,post.share, post.post, user.reqUser, post.posts.length])
    const [value, setValue] = React.useState('one');
    const navigate = useNavigate();
    const [tabValue, setTabValue] = React.useState("1");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleBack = () => {
        navigate(-1);
    };
    const [openImagePreview, setOpenImagePreview] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');

    const handleImagePreview = (imageUrl) => {
        setPreviewImage(imageUrl);
        setOpenImagePreview(true);
    };
    const [openProfileModal, setOpenProfileModal] = React.useState(false);
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    const handleCloseProfileModal = () => setOpenProfileModal(false);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === 4) {
            console.log("Like Posts");

        }
        else if (newValue == 1) {
            console.log("User posts");

        }
    }
    const handleFollowUser = () =>{
        dispatch(followUser(userId));
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
                            <h1 className='text-xl font-bold flex-1 text-center'>{user.user?.username}</h1>
                        </div>
                    </section>
                </div>

                {/* Profile Section */}
                <section className='pl-10 py-8'>
                    <div className="flex items-start gap-x-12">
                        {/* Avatar */}
                        <div className='px-6 items-center'>
                            <Avatar
                                className="cursor-pointer"
                                alt="Đức Anh"
                                src={user.user?.image}
                                onClick={() => handleImagePreview(user.user?.image)}

                                sx={{
                                    width: "10rem",
                                    height: "10rem"
                                }}
                            />
                            <div className="px-5 py-3 flex flex-col items-start">
                                <div className="flex items-center">
                                    <h1 className="cursor-pointer max-w-[120px] font-semibold text-[21px] 
                                    line-clamp-1 hover:line-clamp-none">
                                        {user.user?.username}
                                    </h1>
                                    {false && (
                                        <img className="ml-1 w-[21px] h-[21px]" src={verifiedIcon} alt="Verified" />
                                    )}
                                </div>
                                <p className="text-gray-500 max-w-[120px] text-[16px] line-clamp-1 hover:line-clamp-none cursor-pointer transition-all">
                                    {user.user?.fullName}
                                </p>
                            </div>
                        </div>
                        {/* Thông tin bên phải Avatar */}
                        <div className="w-[400px] flex flex-col gap-y-4">
                            {/* Số liệu thống kê */}
                            <div className="flex justify-between w-full text-center col-span-2">
                                <div>
                                    <h3 className="font-bold text-xl">{user.user?.totalPosts}</h3>
                                    <p className="cursor-pointer hover:underline text-gray-500 text-sm">Posts</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">{user.user?.followers?.length}</h3>
                                    <p onClick={()=>navigate(`/follow/${user.user?.id}`)} className="cursor-pointer hover:underline text-gray-500 text-sm">Followers</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">{user.user?.followings?.length}</h3>
                                    <p onClick={()=>navigate(`/follow/${user.user?.id}`)} className="cursor-pointer hover:underline text-gray-500 text-sm">Following</p>
                                </div>
                            </div>


                            {/* Bio - Giới hạn nội dung và cho phép mở rộng */}
                            {user.user?.bio && (
                                <p className="text-gray-700 text-[16px] line-clamp-2 hover:line-clamp-none cursor-pointer transition-all">
                                    {user.user?.bio}
                                </p>
                            )}

                            {/* Thông tin khác */}
                            {user.user?.location && (
                                <div className='flex items-center text-gray-500'>
                                    <LocationOnIcon />
                                    <p className='ml-2 truncate'>{user.user?.location}</p>
                                </div>
                            )}
                            <div className='flex items-center text-gray-500'>
                                <CalendarMonthIcon />
                                <p className='ml-2'>Joined September 2019</p>
                            </div>

                            {/* Nút hành động */}
                            <div className="flex space-x-4 flex-wrap py-3">
                                {!user.user?.reqUser ? (
                                    <Button 
                                        onClick={handleFollowUser}
                                    sx={{
                                        flex: "1 1 auto",
                                        borderRadius: "20px",
                                        paddingY: "8px",
                                        paddingX: "30px",
                                        backgroundImage: "linear-gradient(to right, blue, purple)",
                                        color: "#ffffff",
                                        textTransform: "none",
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        opacity: 0.7,
                                        "&:hover": { opacity: 1 },
                                    }}>
                                        {user.user?.followed ? "Unfollow" : "Follow"}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleOpenProfileModal}
                                        sx={{
                                            flex: "1 1 auto",
                                            borderRadius: "20px",
                                            paddingY: "8px",
                                            paddingX: "30px",
                                            backgroundImage: "linear-gradient(to right, blue, purple)",
                                            color: "#ffffff",
                                            textTransform: "none",
                                            fontSize: "15px",
                                            fontWeight: "bold",
                                            opacity: 0.7,
                                            "&:hover": { opacity: 1 },
                                        }}>
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className='ml-auto px-4'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                                <MoreHorizIcon sx={{
                                    color: "black"
                                }} />
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
                                <MenuItem onClick={handleClose}>
                                    <span className='text-red-500 font-semibold'>Block</span>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <span className='text-red-500 font-semibold'>Restric</span>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <span className='text-red-500 font-semibold'>Report</span>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>Cancel</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </section>
                <Divider />
                {/* Tabs */}
                <section>
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList
                                    variant='fullWidth'
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    onChange={handleTabChange}
                                    aria-label="lab API tabs example"
                                    sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                                >
                                    <Tab label={
                                        <span className='font-semibold'>Posts</span>
                                    } value="1" />
                                    <Tab label={
                                        <span className='font-semibold'>Likes</span>
                                    } value="2" />
                                    {user.user?.reqUser && <Tab label={
                                        <span className='font-semibold'>Bookmark</span>
                                    } value="3" />}
                                </TabList>
                            </Box>
                            <TabPanel sx={{ padding: 0 }} value="1">
                                {
                                    post.userPosts?.map((item) => <PostCard item={item} key={item} />)
                                }
                            </TabPanel>
                            <TabPanel sx={{ padding: 0 }} value="2">
                                {
                                    post.likedPosts?.map((item) => <PostCard item={item} key={item} />)
                                }
                            </TabPanel>
                            <TabPanel sx={{ padding: 0 }} value="3">
                                {
                                    post.savedPosts.map((item) => <PostCard item={item} key={item} />)
                                }
                            </TabPanel>
                        </TabContext>
                    </Box>
                </section>

            </div>
            <section>
                <ImagePreviewModal
                    open={openImagePreview}
                    onClose={() => setOpenImagePreview(false)}
                    imageUrl={previewImage}
                />
            </section>
            <ProfileModal reqUser={user.reqUser} open={openProfileModal} handleClose={handleCloseProfileModal} />
        </div>
    );
}
