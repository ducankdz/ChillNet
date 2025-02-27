import React from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from "../../assets/avatar.jpg"
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import verifiedIcon from '../../assets/verified.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import postImg from "../../assets/post1.jpg"
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CommentModal from './CommentModal';
import ImagePreviewModal from '../profile/ImagePreviewModal';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, savePost, sharePost } from '../../redux/post/Action';
import NearMeIcon from '@mui/icons-material/NearMe';
import { followUser } from '../../redux/user/Action';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import video from "../../assets/video.mp4"

const PostCard = ({ item }) => {
    const { user } = useSelector(store => store);
    const clickedStory = false;
    const dummyMedia = [
        { type: 'image', src: postImg },
        { type: 'image', src: postImg },
        { type: 'video', src: video },
        { type: 'video', src: video },
    ];


    const [clickedFollow, setClickedFollow] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openCommentModal, setOpenCommentModal] = React.useState(false);
    const handleOpenCommentModal = () => setOpenCommentModal(true);
    const handleCloseCommentModal = () => setOpenCommentModal(false);
    const [openImagePreview, setOpenImagePreview] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');

    const handleImagePreview = (imageUrl) => {
        setPreviewImage(imageUrl);
        setOpenImagePreview(true);
    };
    const handleLikePost = () => {
        dispatch(likePost(item?.id));
    }
    const handleSharePost = () => {
        dispatch(sharePost(item?.id));
    }
    const handleSavePost = () => {
        dispatch(savePost(item?.id));
    }
    const handleFollowUser = () => {
        if (!clickedFollow) {
            setClickedFollow(true);
            dispatch(followUser(item?.user.id));
        }
    }
    const handleDeletePost = (id) => {
        dispatch(deletePost(id))
        handleClose();
    }
    return (
        <div>
            <div className='border-b border-t border-gray-100 transition-colors'>
                <div className='px-4 py-3 overflow-hidden'>
                    {item?.sharedBy && <div className='flex items-center font-semibold text-gray-800 pb-3'>
                        <RepeatIcon className='mr-2 text-gray-500' />
                        <p className='text-gray-500 text-[15px]'>{item?.sharedBy?.username} shared {formatDistanceToNow(new Date(item?.sharedAt), { addSuffix: true })}</p>
                    </div>}
                    <div className='space-x-2 flex'>
                        <Avatar
                            onClick={() => navigate(`/profile/${item?.user?.id}`)}
                            className='cursor-pointer'
                            alt="Username"
                            src={item?.user?.image}
                            sx={{
                                width: 40,
                                height: 40
                            }}
                        />
                        <div className='w-full overflow-hidden'>
                            <div className='flex justify-between items-start gap-2 py-1'>
                                <div className='flex items-center flex-wrap'>
                                    <span onClick={() => navigate(`/profile/${item?.user?.id}`)} className='cursor-pointer text-lg font-bold hover:underline'>
                                        {item?.user?.username}
                                    </span>
                                    {item?.user?.verified && <img className='ml-1 w-[17px] h-[17px]' src={verifiedIcon} alt="" />}
                                    {!item?.user?.followed && !item?.user?.reqUser && (
                                        <>
                                            <span className='text-[#536471] text-[15px] mx-1'>·</span>
                                            <span onClick={handleFollowUser}
                                                className={`${clickedFollow ? "text-[#536471]" : "text-[#0095f6] "} font-semibold text-lg ${clickedFollow ? "" : "cursor-pointer hover:underline"} `}>
                                                {clickedFollow ? "Followed" : "Follow"}
                                            </span>
                                        </>
                                    )}

                                    <span className='text-[#536471] text-[15px] mx-1'>·</span>
                                    <span className='text-[#536471] text-[15px]'>{formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}</span>
                                </div>
                                <div className='flex'>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
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
                                        <MenuItem onClick={() => navigate(`/post/${item?.id}`)}>Go to post</MenuItem>
                                        {item?.user?.id == user.reqUser.id && <MenuItem onClick={() => handleDeletePost(item?.id)}>Delete</MenuItem>}
                                        <MenuItem onClick={handleClose}>Cancel</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div>
                                <p onClick={() => navigate(`/post/${item?.id}`)} className='cursor-pointer text-[18px] leading-5 break-words mb-3 pr-3.5'>
                                    {item?.content}
                                </p>
                                {/* {
                                    item?.image && <div className='relative group rounded-2xl overflow-hidden mb-2 pr-3.5'>
                                        <img
                                            className='cursor-pointer w-[60%] h-full object-cover hover:brightness-90 transition-all rounded-2xl'
                                            src={item?.image} alt=""
                                            onClick={() => handleImagePreview(item?.image)}
                                        />
                                    </div>
                                } */}
                                {
                                    item.media && (
                                        <div className="overflow-hidden w-full">
                                            <Swiper
                                                slidesPerView={2}
                                                spaceBetween={10} 
                                                modules={[Navigation]}
                                                className='w-full max-w-full'
                                            >
                                                {item.media?.map((medi, index) => (
                                                    <SwiperSlide key={index}>
                                                        {medi.endsWith(".jpg") ? (
                                                            <img 
                                                            onClick={()=>handleImagePreview(medi)}
                                                            src={medi} 
                                                            alt={`Slide ${index}`}
                                                                className="cursor-pointer w-full h-[400px] object-cover rounded-2xl" />
                                                        ) : (
                                                            <video controls loop className="w-full h-[400px] object-cover rounded-2xl">
                                                                <source src={medi} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        )}
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='flex items-center mt-2 gap-10'>
                                <div className='flex items-center group'>
                                    <div className='p-2 rounded-full group-hover:bg-[#1d9bf01a] cursor-pointer transition-all'>
                                        <Tooltip arrow title={!item?.liked ? "Like" : "Unlike"}>
                                            {
                                                !item?.liked ?
                                                    <FavoriteBorderIcon
                                                        onClick={handleLikePost}
                                                        className='text-[#536471] group-hover:text-[#f91880]'
                                                        sx={{ fontSize: 28 }} />
                                                    :
                                                    <FavoriteIcon
                                                        onClick={handleLikePost}
                                                        className='text-[#f91880]'
                                                        sx={{ fontSize: 28 }} />

                                            }
                                        </Tooltip>

                                    </div>
                                    <span className={`text-[16px] group-hover:text-[#f91880] ml-1
                                         ${item?.liked ? 'text-[#f91880]' : 'text-[#536471]'}`}>
                                        {item.totalLikes}
                                    </span>
                                </div>
                                <div className='flex items-center group '>
                                    <div className='p-2 rounded-full group-hover:bg-[#1d9bf01a] cursor-pointer transition-all'>
                                        <Tooltip title="Comment">
                                            <ChatBubbleOutlineOutlinedIcon
                                                onClick={handleOpenCommentModal}
                                                className='text-[#536471] group-hover:text-[#5a00a7]'
                                                sx={{ fontSize: 28 }}
                                            />
                                        </Tooltip>
                                    </div>
                                    <span className='text-[16px] text-[#536471] group-hover:text-[#5a00a7] ml-1'>
                                        {item?.totalComments}
                                    </span>
                                </div>
                                {item?.post && <div className='flex items-center group'>
                                    <div className='p-2 rounded-full group-hover:bg-[#1d9bf01a] cursor-pointer transition-all'>
                                        <Tooltip title="Share">
                                            {item.shared ?
                                                <NearMeIcon
                                                    onClick={handleSharePost}
                                                    className='text-[#00ba7c] group-hover:text-[#00ba7c]'
                                                    sx={{ fontSize: 28 }}
                                                />
                                                : <NearMeOutlinedIcon
                                                    onClick={handleSharePost}
                                                    className='text-[#536471] group-hover:text-[#00ba7c]'
                                                    sx={{ fontSize: 28 }}
                                                />}
                                        </Tooltip>
                                    </div>
                                    <span className={`text-[16px] group-hover:text-[#00ba7c] ml-1
                                    ${item?.shared ? 'text-[#00ba7c]' : 'text-[#536471]'}`}>
                                        {item?.totalShares}
                                    </span>
                                </div>}

                                {item?.post && <div className='flex items-center group ml-auto'>
                                    <div className='p-2 rounded-full group-hover:bg-[#1d9bf01a] cursor-pointer transition-all'>
                                        <Tooltip title={!item?.saved ? "Save" : "Remove"}>
                                            {
                                                !item?.saved ?
                                                    <BookmarkBorderOutlinedIcon
                                                        onClick={handleSavePost}
                                                        className='text-[#536471] group-hover:text-[#1d9bf0]'
                                                        sx={{ fontSize: 28 }} />
                                                    :
                                                    <BookmarkOutlinedIcon
                                                        onClick={handleSavePost}
                                                        className='text-[#1d9bf0] group-hover:text-[#1d9bf0]'
                                                        sx={{ fontSize: 28 }} />
                                            }
                                        </Tooltip>
                                    </div>
                                </div>}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <section>
                <ImagePreviewModal
                    open={openImagePreview}
                    onClose={() => setOpenImagePreview(false)}
                    imageUrl={previewImage}
                />
            </section>
            <section>
                <CommentModal item={item} handleClose={handleCloseCommentModal} open={openCommentModal} />
            </section>
        </div>
    )
}

export default PostCard