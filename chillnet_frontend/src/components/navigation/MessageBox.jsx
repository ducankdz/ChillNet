import { Avatar, IconButton, Menu, MenuItem, TextField, Button, Modal, Box } from '@mui/material';
import React, { useState } from 'react';
import avatar from "../../assets/avatar.jpg";
import verrifiedIcon from "../../assets/verified.png";
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import EmojiPicker from 'emoji-picker-react';

const MessageBox = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [messages, setMessages] = useState([
        { sender: 'other', text: 'Hello!' },
        { sender: 'me', text: 'Hi, how are you?' },
        { sender: 'other', text: 'Im good, thanks!' }
    ]);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [uploadingImage, setUploadingImage] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState("");
    const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
    const handleEmojiClick = (emojiObject) => {
        formik.setFieldValue("content", formik.values.content + emojiObject.emoji);
    }

    return (
        <div className='flex flex-col h-screen bg-gray-100'>
            {/* Header */}
            <div className='bg-white sticky top-[67px] z-10 p-4 flex items-center justify-between'>
                <div className='flex items-center'>
                    <Avatar className='cursor-pointer' alt="Username" src={avatar} sx={{ width: 42, height: 42 }} />
                    <div className='ml-2'>
                        <div className='flex items-center'>
                            <p onClick={() => navigate(`/profile/${1}`)} className='cursor-pointer font-bold text-[18px] hover:underline'>
                                chilllover
                            </p>
                            <img className='ml-1 w-[18px] h-[18px]' src={verrifiedIcon} alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    <IconButton><PhoneIcon sx={{ fontSize: 24, color: 'black' }} /></IconButton>
                    <IconButton><VideocamIcon sx={{ fontSize: 24, color: 'black' }} /></IconButton>
                    <IconButton onClick={handleClick}><MoreHorizIcon sx={{ fontSize: 24, color: 'black' }} /></IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={() => navigate(`/profile/${1}`)}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Cancel</MenuItem>
                    </Menu>
                </div>
            </div>

            {/* Message List */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender !== 'me' && <Avatar src={avatar} sx={{ width: 36, height: 36 }} />}
                        <div className={`max-w-xs ml-3 px-3 py-2 rounded-full ${msg.sender === 'me' ? 'bg-blue-500 text-white ml-2' : 'bg-gray-200 text-black mr-2'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className='bg-gray-100 p-4 flex items-center sticky bottom-0'>
                <div className='relative w-full'>
                    <input
                        placeholder='Type message...'
                        type="text"
                        className='w-full bg-gray-100 rounded-full py-3 pl-4 pr-14 text-[16px] outline-none focus:bg-white border'
                    />
                    {/* Icon container */}
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2'>
                        <TagFacesIcon onClick={() => setOpenEmojiPicker(true)} sx={{
                            color: '#888',
                            fontSize: '24px',
                            cursor: 'pointer',
                            transition: 'color 0.3s',
                            '&:hover': { color: '#007bff' }
                        }} />
                        <label className='flex items-center'>
                            <ImageIcon sx={{
                                color: '#888',
                                fontSize: '24px',
                                cursor: 'pointer',
                                transition: 'color 0.3s',
                                '&:hover': { color: '#007bff' }
                            }} />
                            <input type="file" name="imageFile" className='hidden' />
                        </label>

                        <SendIcon sx={{
                            color: '#888',
                            fontSize: '24px',
                            cursor: 'pointer',
                            transition: 'color 0.3s',
                            '&:hover': { color: '#007bff' }
                        }} />
                    </div>
                </div>

            </div>

            <Modal
                open={openEmojiPicker}
                onClose={() => setOpenEmojiPicker(false)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: '10px'
                }}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </Box>
            </Modal>
        </div>
    );
};

export default MessageBox;
