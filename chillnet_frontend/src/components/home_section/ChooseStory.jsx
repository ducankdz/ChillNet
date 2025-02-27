import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { uploadToCloudinary } from '../../utils/UploadToCloudinary';
import { createStory } from '../../redux/story/Action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    // p:4,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    outline: 'none',
    borderRadius: 4,
    maxHeight: '95vh', // Giới hạn chiều cao của modal
    overflowY: 'auto',
    scrollbarWidth: 'none', // Ẩn scrollbar trên Firefox
    msOverflowStyle: 'none'
};
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ChooseStory({ open, handleClose }) {
    const [selectedFile, setSelectedFile] = React.useState("");
    const dispatch = useDispatch();
    const handleSubmit = (values, actions) => {
        console.log("Submit choose story", values);
        dispatch(createStory(values));
        handleClose();
        actions.resetForm();
        setSelectedFile("");
    }
    const formik = useFormik({
        initialValues: {
            media: "",
        },
        onSubmit: handleSubmit
    })

    const handleSelectImage = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const uploadedUrl = await uploadToCloudinary(file);
            formik.setFieldValue("media", uploadedUrl);
            setSelectedFile(uploadedUrl);
        }
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
                    <div className='bg-white/80 backdrop-blur-md sticky top-0 z-10'>
                        <section className={`px-4 py-4 border-b border-gray-100`}>
                            <div className='flex items-center space-x-4'>
                                <h1 className='text-xl font-bold flex-1 text-center'>Post story</h1>
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
                    <form onSubmit={formik.handleSubmit}>
                        <div className='py-5 flex flex-col items-center'>
                            <div className='py-3'>
                                {selectedFile && (
                                    <div className="py-3 w-full flex justify-center">
                                        {selectedFile.endsWith(".mp4") ||
                                            selectedFile.endsWith(".mov") ||
                                            selectedFile.endsWith(".avi") ? (
                                            <video controls className="w-full h-auto rounded-md">
                                                <source src={selectedFile} type="video/mp4" />
                                                Trình duyệt của bạn không hỗ trợ video.
                                            </video>
                                        ) : (
                                            <img
                                                src={selectedFile}
                                                alt="Selected file"
                                                className="w-[50%] h-auto rounded-md"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex space-x-4 flex-wrap">
                                <Button
                                    variant="ghost"
                                    sx={{
                                        flex: "1 1 auto",
                                        borderRadius: "20px",
                                        paddingY: "8px",
                                        paddingX: "30px",
                                        textTransform: "none",
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        opacity: 0.7,
                                        "&:hover": { opacity: 1 },
                                    }}
                                    component="label"
                                    role={undefined}
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload file
                                    <VisuallyHiddenInput
                                        type="file"
                                        name="media"
                                        accept="image/*,video/*"
                                        onChange={handleSelectImage}
                                    />
                                </Button>
                                <Button
                                    disabled={!selectedFile}
                                    sx={{
                                        flex: "1 1 auto",
                                        borderRadius: "20px",
                                        paddingY: "8px",
                                        paddingX: "50px",
                                        backgroundImage: "linear-gradient(to right, blue, purple)",
                                        color: "#ffffff",
                                        textTransform: "none",
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        opacity: 0.7,
                                        "&:hover": {
                                            opacity: 1// Giữ gradient khi hover
                                        },
                                        "&:disabled": {
                                            bgcolor: "#333333", // Màu cho khi nút bị disable
                                            opacity: 0.5,
                                            color: "#ffffff"
                                        }
                                    }}
                                    type='submit'>
                                    Post
                                </Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
