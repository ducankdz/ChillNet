import axios from "axios";
import * as actionType from "./ActionType";
import { API_BASE_URL } from "../../config/api";
import { CLEAR_USER } from "../user/ActionType";
import { getAllPosts } from "../post/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";

export const register = (userData) => async (dispatch) => {
    dispatch({ type: actionType.REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: actionType.REGISTER_SUCCESS, payload: data })
            window.location.reload();
        }
        else {
            toast.error("Sign up unsuccessfully.")
        }
    } catch (error) {
        dispatch({ type: actionType.REGISTER_FAILURE, error: error.message })
        toast.error(error?.response?.data)
    }
}

export const login = (userData) => async (dispatch) => {
    dispatch({ type: actionType.LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: actionType.LOGIN_SUCCESS, payload: data })
            window.location.reload();
        }
        else {
            toast.error("Invalid username or password.")
        }
    } catch (error) {
        dispatch({ type: actionType.LOGIN_FAILURE, error: error.message })
        toast.error(error?.response?.data)
    }
}

export const googleLogin = (access_token) => async (dispatch) => {
    dispatch({ type: actionType.LOGIN_GOOGLE_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/google`, { access_token });

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: actionType.LOGIN_GOOGLE_SUCCESS, payload: data });
            toast.success(data.message);
            window.location.reload();
        } else {
            toast.error("Google login failed.");
        }
    } catch (error) {
        dispatch({ type: actionType.LOGIN_GOOGLE_FAILURE, error: error.message });
        toast.error(error?.response?.data);
    }
};


export const forgotPassword = (userData) => async (dispatch) => {
    dispatch({ type: actionType.FORGOT_PASSWORD_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/password/forgot`, userData);

        if (data.message) {
            dispatch({ type: actionType.FORGOT_PASSWORD_SUCCESS, payload: data });
            toast.success(data.message);
        }
        else {
            toast.error("Error sending email.");
        }
    } catch (error) {
        dispatch({ type: actionType.FORGOT_PASSWORD_FAILURE, error: error.message })
        toast.error(error?.response?.data)
    }
}

export const resetPassword = (resetPasswordData) => async (dispatch) => {
    dispatch({ type: actionType.RESET_PASSWORD_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/password/reset`, resetPasswordData);

        if (data.message) {
            dispatch({ type: actionType.RESET_PASSWORD_SUCCESS, payload: data });
            toast.success(data.message);;
        }
        else {
            toast.error("Error reseting password.")
        }
    } catch (error) {
        dispatch({ type: actionType.RESET_PASSWORD_FAILURE, error: error.message })
        toast.error(error?.response?.data)
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: actionType.LOGOUT });
    dispatch({ type: CLEAR_USER })
    localStorage.clear();
    window.location.reload();
}