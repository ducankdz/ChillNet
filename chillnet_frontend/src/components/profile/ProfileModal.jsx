import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import avatar from "../../assets/avatar.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../utils/UploadToCloudinary';
import { updateUser } from '../../redux/user/Action';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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

export default function ProfileModal({ reqUser, open, handleClose }) {
    const { user } = useSelector(store => store);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = React.useState("");
    const handleSubmit = (values) => {
        dispatch(updateUser(values));
        handleClose();
        console.log("Handle submit", values);
        setSelectedImage("");
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            fullName: "",
            image: "",
            bio: "",
            location: ""
        },
        onSubmit: handleSubmit
    })
    const handleImageChange = async (event) => {
        const { name } = event.target;
        const file = await uploadToCloudinary(event.target.files[0]);
        formik.setFieldValue(name, file);
        setSelectedImage(file);
    }
    useEffect(() => {
        if (reqUser && open) {
            formik.setValues({
                username: reqUser?.username || "",
                fullName: reqUser?.fullName || "",
                image: reqUser?.image || "",
                bio: reqUser?.bio || "",
                location: reqUser?.location || ""
            });
            setSelectedImage(reqUser?.image || "");
        }
    }, [reqUser, open])
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
                                <h1 className='text-xl font-bold flex-1 text-center'>Edit Profile</h1>
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
                            <div className='ml-4 h-[10rem] flex justify-center'>
                                <div className='relative'>
                                    <Avatar
                                        sx={{
                                            width: "10rem",
                                            height: "10rem",
                                            border: "4px solid white"
                                        }}
                                        src={selectedImage || reqUser?.image} />
                                    <input
                                        name='image'
                                        onChange={handleImageChange}
                                        className='absolute top-0 left-0 w-[10rem] h-[10rem] opacity-0 cursor-pointer rounded-full'
                                        type="file" />
                                </div>
                            </div>

                            <div className='space-y-3 mt-4 px-10'>
                                <TextField fullWidth
                                    sx={{ mb: 2 }} // Thêm margin-bottom
                                    id="username"
                                    name="username"
                                    label="Username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName} />

                                <TextField fullWidth
                                    sx={{ mb: 2 }} // Thêm margin-bottom
                                    id="fullName"
                                    name="fullName"
                                    label="Full Name"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName} />

                                <TextField fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }} // Thêm margin-bottom
                                    id="bio"
                                    name="bio"
                                    label="Bio"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio} />

                                <TextField fullWidth
                                    sx={{ mb: 2 }} // Thêm margin-bottom
                                    id="location"
                                    name="location"
                                    label="Location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location} />
                            </div>
                            <div className="flex space-x-4 flex-wrap">
                                <Button
                                    variant='ghost'
                                    onClick={handleClose}
                                    sx={{
                                        flex: "1 1 auto",
                                        borderRadius: "20px",
                                        paddingY: "8px",
                                        paddingX: "50px",
                                        textTransform: "none",
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        opacity: 0.7,
                                        "&:hover": { opacity: 1 },
                                    }}>
                                    Cancel
                                </Button>
                                <Button sx={{
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
                                    "&:hover": { opacity: 1 },
                                }}
                                    type='submit'>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}