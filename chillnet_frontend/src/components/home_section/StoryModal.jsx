import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { Avatar, LinearProgress, Menu, MenuItem, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { deleteStory, getViewers, likeStory, getLikers, viewStory } from '../../redux/story/Action';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 889,
    bgcolor: '#1f1f1f',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
    borderRadius: 4,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const sheetStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
    overflowY: 'auto',
    zIndex: 3,
    padding: '16px',
    color: '#000000',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
};

export default function StoryModal({ id, open, handleClose }) {
    const { user, story } = useSelector((store) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [showViewers, setShowViewers] = React.useState(false);
    const [showLikers, setShowLikers] = React.useState(false);
    const imageDuration = 10000;
    const videoRef = React.useRef(null);
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        if(open && id){
            dispatch(viewStory(id));
        }
    }, [open, id, dispatch])

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleShowViewers = () => {
        dispatch(getViewers(id));
        setShowViewers(true);
        handleCloseMenu();
    };
    const handleHideViewers = () => setShowViewers(false);
    const handleShowLikers = () => {
        dispatch(getLikers(id));
        setShowLikers(true);
        handleCloseMenu();
    };
    const handleHideLikers = () => setShowLikers(false);

    const handleVideoEnd = () => {
        setProgress(100);
        handleClose();
    };

    const handleVideoTimeUpdate = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration) {
                setProgress((currentTime / duration) * 100);
            }
        }
    };

    const handleLikeStory = () => {
        if (id) {
            dispatch(likeStory(id)).then(() => {
                dispatch(viewStory(id)); // Cập nhật lại dữ liệu story sau khi like
            });
        }
    };
    

    React.useEffect(() => {
        if (open && id) {
            setProgress(0);
            if (isVideo(story?.story?.media)) {
                if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                }
            } else {
                const timer = setTimeout(() => {
                    handleClose();
                    setProgress(0);
                }, imageDuration);

                const progressInterval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev >= 100) {
                            clearInterval(progressInterval);
                            return 100;
                        }
                        return prev + (100 / (imageDuration / 100));
                    });
                }, 100);

                return () => {
                    clearTimeout(timer);
                    clearInterval(progressInterval);
                };
            }
        }
    }, [open, id, handleClose]);

    const isVideo = (media) => {
        return media?.endsWith('.mp4') || media?.endsWith('.mov') || media?.endsWith('.avi');
    };

    const handleDeleteStory = (storyId) => {
        dispatch(deleteStory(storyId));
        handleClose();
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {story?.story ? (
                        <>
                            {isVideo(story.story?.media) ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    onEnded={handleVideoEnd}
                                    onTimeUpdate={handleVideoTimeUpdate}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        objectFit: 'contain',
                                        zIndex: 0,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 16,
                                    }}
                                >
                                    <source src={story?.story?.media} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            ) : (
                                <img
                                    src={story?.story?.media}
                                    alt="Story"
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        objectFit: 'contain',
                                        zIndex: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            )}
                            <div className="flex space-x-3 px-4 py-12">
                                <div className="py-2">
                                    <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{
                                            borderRadius: 4,
                                            position: 'absolute',
                                            top: 25,
                                            left: 28,
                                            right: 28,
                                            zIndex: 2,
                                            height: 3,
                                            backgroundColor: '#444',
                                            '& .MuiLinearProgress-bar': { backgroundColor: 'white' },
                                        }}
                                    />
                                </div>
                                <Avatar
                                    onClick={() => navigate(`/profile/${story?.story?.user?.id}`)}
                                    className="cursor-pointer"
                                    alt="Username"
                                    src={story?.story?.user?.image}
                                    sx={{ width: 40, height: 40 }}
                                />
                                <div className="w-full">
                                    <div className="flex justify-between items-start gap-2 py-1">
                                        <div className="flex items-center flex-wrap z-3">
                                            <span
                                                onClick={() => navigate(`/profile/${story?.story?.user?.id}`)}
                                                className="text-white cursor-pointer hover:underline"
                                            >
                                                {story?.story?.user?.username}
                                            </span>
                                            <span className="text-[#536471] mx-1">·</span>
                                            <span className="text-[#c0d3e3]">
                                                {story?.story?.createdAt
                                                    ? formatDistanceToNow(parseISO(story.story?.createdAt), { addSuffix: true })
                                                    : 'Just now'}
                                            </span>
                                        </div>
                                        <div>
                                            <Button
                                                sx={{ color: 'white' }}
                                                id="basic-button"
                                                aria-controls={openMenu ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openMenu ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <MoreHorizIcon />
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={openMenu}
                                                onClose={handleCloseMenu}
                                                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                                            >
                                                {story?.story?.user?.id === user.reqUser?.id && (
                                                    <MenuItem onClick={handleShowViewers}>Viewers</MenuItem>
                                                )}
                                                {story?.story?.user?.id === user.reqUser?.id && (
                                                    <MenuItem onClick={handleShowLikers}>Likes</MenuItem>
                                                )}
                                                {story?.story?.user?.id === user.reqUser?.id && (
                                                    <MenuItem onClick={() => handleDeleteStory(item?.id)}>Delete</MenuItem>
                                                )}
                                                <MenuItem onClick={handleClose}>Cancel</MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-7 py-3 absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-end items-center">
                                {story.story?.liked ? (
                                    <FavoriteIcon
                                        onClick={handleLikeStory}
                                        className="text-[#f91880] cursor-pointer"
                                        sx={{ fontSize: 33 }}
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        className="text-[#fff] cursor-pointer hover:text-[#f91880]"
                                        sx={{ fontSize: 33 }}
                                        onClick={handleLikeStory}
                                    />
                                )}
                            </div>

                            {showViewers && (
                                <Box sx={sheetStyle}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold">Viewers ({story.viewers.length})</h3>
                                        <Button onClick={handleHideViewers}>
                                            <CloseIcon sx={{ color: '#000000' }} />
                                        </Button>
                                    </div>
                                    {story.viewers.length > 0 ? (
                                        <List dense>
                                            {story.viewers.map((viewer) => (
                                                <ListItem
                                                    key={viewer.id}
                                                    button
                                                    onClick={() => navigate(`/profile/${viewer.id}`)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar src={viewer.image} alt={viewer.username} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={viewer.username}
                                                        secondary={viewer.fullName}
                                                        primaryTypographyProps={{ color: '#000000' }}
                                                        secondaryTypographyProps={{ color: '#555555' }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <p>No viewers yet</p>
                                    )}
                                </Box>
                            )}

                            {showLikers && (
                                <Box sx={sheetStyle}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold">Likes ({story.likers.length})</h3>
                                        <Button onClick={handleHideLikers}>
                                            <CloseIcon sx={{ color: '#000000' }} />
                                        </Button>
                                    </div>
                                    {story.likers.length > 0 ? (
                                        <List dense>
                                            {story.likers.map((liker) => (
                                                <ListItem
                                                    key={liker.id}
                                                    button
                                                    onClick={() => navigate(`/profile/${liker.id}`)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar src={liker.image} alt={liker.username} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={liker.username}
                                                        secondary={liker.fullName}
                                                        primaryTypographyProps={{ color: '#000000' }}
                                                        secondaryTypographyProps={{ color: '#555555' }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <p>No likes yet</p>
                                    )}
                                </Box>
                            )}
                        </>
                    ) : (
                        <div className="text-white p-4">No story selected</div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}