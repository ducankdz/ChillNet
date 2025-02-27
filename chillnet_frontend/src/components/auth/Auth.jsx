import React from "react";
import chill from "../../assets/chill.png";
import { Grid, TextField, Button, Typography, Divider, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import SignUpModal from "./SignUpModal";
import ForgotPassword from "./ForgotPassword";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { googleLogin, login } from "../../redux/auth/Action";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required")
})

const Auth = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    console.log("Login data", data);
    dispatch(login(data));
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleSubmit
  })
  const [openSignUpModal, setOpenSignUpModal] = React.useState(false);
  const handleOpenSignUpModal = () => setOpenSignUpModal(true);
  const handleCloseSignUpModal = () => setOpenSignUpModal(false);

  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);
  const handleOpenForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => setOpenForgotPassword(false);

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (response) => {
      dispatch(googleLogin(response.access_token));
    },
    onError: () => toast.error("Google login failed."),
  });
  

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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

        {/* Form Login bên phải */}
        <Grid className="px-10 flex flex-col bg-gray-100 justify-center items-center" lg={7} xs={12}>
          <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">

            <h1 className="text-center py-3 text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 
                  bg-clip-text text-transparent">Log In</h1>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword?"text":"password"}
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

              <Button
                type="submit"
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
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                Log In
              </Button>
            </form>
            {/* Thêm chữ "or" ngăn cách */}
            <div className="flex items-center my-4">
              <Divider sx={{ flexGrow: 1 }} />
              <Typography className="mx-2 text-gray-500">Or</Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </div>

            {/* Nút đăng nhập bằng Google */}
            <Button
              onClick={() => googleLoginHandler()}
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                borderRadius: "29px",
                color: "#555",
                fontWeight: "bold",
                padding: "12px",
                textTransform: "none"
              }}
            >
              Log In with Google
            </Button>
            <Typography onClick={handleOpenForgotPassword} className="text-center pt-5 text-sm  cursor-pointer">
              Forgot Password?
            </Typography>
            <div className="text-center mt-4">
              <Typography className="text-gray-600">
                Don't have an account?{" "}
                <span onClick={handleOpenSignUpModal} className="text-blue-500 cursor-pointer">
                  Sign Up
                </span>
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Footer giống Facebook/Instagram */}
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
      <SignUpModal open={openSignUpModal} handleClose={handleCloseSignUpModal} />
      <ForgotPassword open={openForgotPassword} handleClose={handleCloseForgotPassword} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Auth;
