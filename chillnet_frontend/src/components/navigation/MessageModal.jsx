import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import MessageListSection from './MessageListSection';
import MessageBox from './MessageBox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
    borderRadius: 4,
    maxHeight: '95vh', // Giới hạn chiều cao của modal
    overflowY: 'auto',
    scrollbarWidth: 'none', // Ẩn scrollbar trên Firefox
    msOverflowStyle: 'none'
};

export default function MessageModal({ open, handleClose }) {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='bg-white backdrop-blur-md sticky top-0 z-10'>
                        <section className={`px-4 py-4 border-b border-gray-100`}>
                            <div className='flex items-center space-x-4'>
                                <h1 className='text-xl font-bold flex-1 text-center'>Messages</h1>
                                <IconButton
                                    onClick={handleClose}
                                    className="hover:bg-gray-200 rounded-full"
                                    size="small"
                                >
                                    <CloseIcon className="text-[#536471]" />
                                </IconButton>
                            </div>
                        </section>
                    </div>
                    <Grid container className='justify-between h-[80vh]'>
                        <Grid item xs={12} lg={4} className='lg:block w-full border-r border-gray-100'>
                            <MessageListSection/>
                        </Grid>
                        <Grid item xs={12} lg={8} className='hidden lg:block w-full relative'>
                            <MessageBox/>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}