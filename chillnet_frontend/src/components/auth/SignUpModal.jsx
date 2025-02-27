import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/Action';

const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
    borderRadius: 4,
    maxHeight: '95vh',
    overflowY: 'auto',
    p: 4,
    position: 'relative'
};

// ✅ Sửa lỗi validationSchema
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    retypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Retype Password is required"),
    birthDate: Yup.mixed().required("Birthdate is required")
});

export default function SignUpModal({ open, handleClose }) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            fullName: "",
            username: "",
            email: "",
            password: "",
            retypePassword: "",
            birthDate: null
        },
        validationSchema,
        onSubmit: (data) => {
            console.log("Register data", data);
            dispatch(register(data))
        }
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [showRetypePassword, setShowRetypePassword] = React.useState(false);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 12, right: 12 }}>
                    <CloseIcon />
                </IconButton>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h1 className="text-center py-3 text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 
                  bg-clip-text text-transparent">Sign Up</h1>
                                <TextField
                                    fullWidth
                                    type='text'
                                    label="Full Name"
                                    name='fullName'
                                    variant='outlined'
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type='email'
                                    label="Email"
                                    name='email'
                                    variant='outlined'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type='text'
                                    label="Username"
                                    name='username'
                                    variant='outlined'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    label="Password"
                                    variant='outlined'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={showRetypePassword ? "text" : "password"}
                                    name='retypePassword'
                                    label="Retype Password"
                                    variant='outlined'
                                    value={formik.values.retypePassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker
                                    sx={{ width: "100%" }}
                                    label="Date of Birth"
                                    value={formik.values.birthDate ? dayjs(formik.values.birthDate) : null}
                                    onChange={(newValue) => {
                                        formik.setFieldValue("birthDate", newValue ? dayjs(newValue).format("YYYY-MM-DD")  : null);
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />

                                {formik.touched.birthDate && formik.errors.birthDate && (
                                    <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.birthDate}</div>
                                )}
                            </Grid>

                            <Grid className='mt-20' item xs={12}>
                                <Button
                                    type='submit'
                                    variant="contained"
                                    sx={{
                                        mt: '10px',
                                        width: "100%",
                                        borderRadius: "29px",
                                        py: "15px",
                                        fontSize: "17px",
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        backgroundImage: "linear-gradient(to right, blue, purple)",
                                        opacity: 0.7,
                                        "&:hover": { opacity: 1 },
                                    }}
                                >
                                    Create Account
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </LocalizationProvider>
            </Box>
        </Modal>
    );
}
