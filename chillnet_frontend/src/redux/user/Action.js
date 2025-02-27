import * as actionType from "./ActionType";
import api from "../../config/api";
import { sendNotification } from "../notification/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_REQUEST })
    try {
        const { data } = await api.get("/api/user/profile", {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        dispatch({ type: actionType.GET_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_USER_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const findUserById = (userId) => async (dispatch) => {
    dispatch({ type: actionType.FIND_USER_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/user/${userId}`)
        dispatch({ type: actionType.FIND_USER_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.FIND_USER_BY_ID_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const updateUser = (userData) => async (dispatch) => {
    dispatch({ type: actionType.UPDATE_USER_REQUEST })
    try {
        const { data } = await api.put(`/api/user/update`, userData)
        dispatch({ type: actionType.UPDATE_USER_SUCCESS, payload: data })
        toast.success("Update profile successfully.")
    } catch (error) {
        dispatch({ type: actionType.UPDATE_USER_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const changePassword = (userData) => async (dispatch) => {
    dispatch({ type: actionType.CHANGE_PASSWORD_REQUEST })
    try {
        const { data } = await api.put(`/api/user/password/change`, userData)
        dispatch({ type: actionType.CHANGE_PASSWORD_SUCCESS, payload: data })
        toast.success("Change password successfully.")
    } catch (error) {
        dispatch({ type: actionType.CHANGE_PASSWORD_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const followUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: actionType.FOLLOW_USER_REQUEST })
    try {
        const { data } = await api.put(`/api/user/follow/${userId}`)
        dispatch({ type: actionType.FOLLOW_USER_SUCCESS, payload: data })

        if (data.followed) {
            const { user } = getState();
            const notificationData = {
                senderId: user.reqUser?.id,
                receiverId: data.id,
                content: `has followed you.`,
                type: "FOLLOW",
            };
            dispatch(sendNotification(notificationData));
        }
    } catch (error) {
        dispatch({ type: actionType.FOLLOW_USER_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const searchUser = (keyword) => async (dispatch) => {
    dispatch({ type: actionType.SEARCH_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/user/search?keyword=${keyword}`)
        dispatch({ type: actionType.SEARCH_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.SEARCH_USER_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const suggestUser = () => async (dispatch) => {
    dispatch({ type: actionType.SUGGEST_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/user/suggest`)
        dispatch({ type: actionType.SUGGEST_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.SUGGEST_USER_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const getUserFollowers = (userId) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_FOLLOWERS_REQUEST })
    try {
        const { data } = await api.get(`/api/user/${userId}/followers`)
        dispatch({ type: actionType.GET_USER_FOLLOWERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_USER_FOLLOWERS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
export const getUserFollowings = (userId) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_FOLLOWINGS_REQUEST })
    try {
        const { data } = await api.get(`/api/user/${userId}/followings`)
        dispatch({ type: actionType.GET_USER_FOLLOWINGS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_USER_FOLLOWINGS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const upgradeToPremium = (planType) => async (dispatch) => {
    dispatch({ type: actionType.UPGRADE_TO_PREMIUM_REQUEST })
    try {
        const { data } = await api.put(`/api/user/upgrade?planType=${planType}`);
        dispatch({ type: actionType.UPGRADE_TO_PREMIUM_SUCCESS, payload: data });
        toast.success("Upgrade to Premium successfully.");
        window.history.replaceState({}, document.title, "/home");

    } catch (error) {
        dispatch({ type: actionType.UPGRADE_TO_PREMIUM_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}
