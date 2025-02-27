import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/auth/Action';

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
  maxHeight: '95vh',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  p: 4,
  position: 'relative',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ForgotPassword({ open, handleClose }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(forgotPassword(values)).then((result) => {
        if (result?.type === 'FORGOT_PASSWORD_SUCCESS') {
          handleClose(); // Đóng modal khi thành công
        }
        setSubmitting(false); // Kết thúc submitting
      }).catch(() => {
        setSubmitting(false); // Kết thúc submitting nếu thất bại
      });
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h1 className="text-center py-3 text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 
                  bg-clip-text text-transparent">Forgot Password?</h1>
                <p className='text-lg py-3'>Enter your email and we will send you a link to reset password.</p>
                <TextField
                  fullWidth
                  type='text'
                  label="Email"
                  name='email'
                  variant='outlined'
                  size='large'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={formik.isSubmitting} // Vô hiệu hóa input khi đang submitting
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant="contained"
                  disabled={formik.isSubmitting} // Vô hiệu hóa nút khi đang submitting
                  sx={{
                    mt: '10px',
                    width: "100%",
                    borderRadius: "29px",
                    py: "15px",
                    fontSize: "17px",
                    textTransform: "none",
                    fontWeight: "bold",
                    backgroundImage: "linear-gradient(to right, blue, purple)",
                    opacity: formik.isSubmitting ? 0.5 : 0.7, // Giảm opacity khi submitting
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
                  {formik.isSubmitting ? "Sending..." : "Reset Password"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}