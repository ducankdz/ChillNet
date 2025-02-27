import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import avatar from "../../assets/avatar.jpg";
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/user/Action';
import { ToastContainer } from 'react-toastify';

const validationSchema = Yup.object().shape({
    password: Yup.string().required("Old password is required"),
    newPassword: Yup.string().required("New password is required"),
    retypePassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Retype Password is required"),
});

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

export default function ChangePasswordModal({ open, handleClose }) {
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showRetypePassword, setShowRetypePassword] = React.useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        dispatch(changePassword(values));
        console.log("Handle submit", values);
    }
    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            retypePassword: ""
        },
        onSubmit: handleSubmit,
        validationSchema
    })
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
                                <h1 className='text-xl font-bold flex-1 text-center'>Change Password</h1>
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
                        <div className='py-4 flex flex-col items-center'>

                            <div className='space-y-3 mt-4 px-10'>
                                <TextField fullWidth
                                    type={showOldPassword ? "text" : "password"}
                                    sx={{ mb: 2 }} // Thêm margin-bottom
                                    id="password"
                                    name="password"
                                    label="Old Password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                                                {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                                <TextField fullWidth
                                    type={showNewPassword ? "text" : "password"}
                                    sx={{ mb: 2 }} // Thêm margin-bottom
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                                                {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                                <TextField fullWidth
                                    type={showRetypePassword ? "text" : "password"}
                                    sx={{ mb: 2 }} // Thêm margin-bottom
                                    id="retypePassword"
                                    name="retypePassword"
                                    label="Retype Password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
                                    helperText={formik.touched.retypePassword && formik.errors.retypePassword}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={() => setShowRetypePassword(!showRetypePassword)} edge="end">
                                                {showRetypePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />

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