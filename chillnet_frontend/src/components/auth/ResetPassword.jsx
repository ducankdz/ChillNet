import React from "react";
import { Grid, TextField, Button, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../config/api"; // Giả sử bạn đã cấu hình axios
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import chill from "../../assets/chill.png";
import { resetPassword } from "../../redux/auth/Action";

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Lấy token từ URL

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const resetPasswordData = {
                token: token,
                password: values.password,
                confirmPassword: values.confirmPassword
            };
            dispatch(resetPassword(resetPasswordData));
        },
    });

    // Nếu không có token, chuyển về trang login
    React.useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Layout chính */}
            <Grid className="overflow-y-hidden flex-grow" container>
                {/* Phần Logo bên trái */}
                <Grid className="hidden lg:flex items-center justify-end bg-gray-100" item lg={5}>
                    <div className="text-center">
                        <div className="flex items-center">
                            <img className="w-36" src={chill} alt="ChillNet Logo" />
                            <h1
                                className="text-6xl font-extrabold px-3 
                  bg-gradient-to-r from-blue-500 to-purple-500 
                  bg-clip-text text-transparent"
                            >
                                ChillNet
                            </h1>
                        </div>
                        <p className="mt-4 text-2xl text-gray-600">
                            Connect and relax with your friends!
                        </p>
                    </div>
                </Grid>

                {/* Form Reset Password bên phải */}
                <Grid className="px-10 flex flex-col bg-gray-100 justify-center items-center" lg={7} xs={12}>
                    <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
                        <h1 className="text-center py-3 text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Reset Password
                        </h1>

                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                label="New Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                                sx={{
                                    mt: "20px",
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
                                    "&:disabled": {
                                        bgcolor: "#333333", // Màu cho khi nút bị disable
                                        opacity: 0.5,
                                        color: "#ffffff"
                                    }
                                }}
                            >
                                Reset Password
                            </Button>
                        </form>

                        <Typography className="text-center mt-4 text-gray-600">
                            Back to{" "}
                            <span onClick={() => navigate("/")} className="text-blue-500 cursor-pointer">
                                Log In
                            </span>
                        </Typography>
                    </div>
                </Grid>
            </Grid>

            {/* Footer */}
            <footer className="text-center text-gray-500 text-sm py-4">
                <div className="space-x-4">
                    <span className="cursor-pointer hover:underline">About</span>
                    <span className="cursor-pointer hover:underline">Privacy</span>
                    <span className="cursor-pointer hover:underline">Terms</span>
                    <span className="cursor-pointer hover:underline">Help</span>
                    <span className="cursor-pointer hover:underline">Contact</span>
                </div>
                <p className="cursor-pointer hover:underline mt-2">© {new Date().getFullYear()} ChillNet</p>
            </footer>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ResetPassword;