import * as actionType from "./ActionType";
import api from "../../config/api"

export const sendNotification = (notificationData) => async(dispatch) => {
    dispatch({type:actionType.SEND_NOTIFICATION_REQUEST})
    try {
        const {data} = await api.post("/api/notification/send",notificationData);
        dispatch({type:actionType.SEND_NOTIFICATION_SUCCESS,payload: data});
        console.log("Send notification data",data);
    } catch (error) {
        dispatch({type:actionType.SEND_NOTIFICATION_FAILURE,payload: error});
        console.log("Error", error);
    }
} 

export const getUserNotifications = () => async(dispatch) => {
    dispatch({type:actionType.GET_USER_NOTIFICATIONS_REQUEST})
    try {
        const {data} = await api.get(`/api/notification/user`);
        dispatch({type:actionType.GET_USER_NOTIFICATIONS_SUCCESS,payload: data});
        console.log("User notifications data",data);
    } catch (error) {
        dispatch({type:actionType.GET_USER_NOTIFICATIONS_FAILURE,payload: error});
        console.log("Error", error);
    }
} 

export const getUserUnreadNotifications = () => async(dispatch) => {
    dispatch({type:actionType.GET_USER_UNREAD_NOTIFICATIONS_REQUEST})
    try {
        const {data} = await api.get(`/api/notification/user/unread`);
        dispatch({type:actionType.GET_USER_UNREAD_NOTIFICATIONS_SUCCESS,payload: data});
        console.log("User unread notifications data",data);
    } catch (error) {
        dispatch({type:actionType.GET_USER_UNREAD_NOTIFICATIONS_FAILURE,payload: error});
        console.log("Error", error);
    }
} 

export const markNotificationAsRead = (notificationId) => async(dispatch) => {
    dispatch({type:actionType.MARK_NOTIFICATION_AS_READ_REQUEST})
    try {
        const {data} = await api.put(`/api/notification/${notificationId}/read`);
        dispatch({type:actionType.MARK_NOTIFICATION_AS_READ_SUCCESS,payload: data});
        console.log("Mark notification as read data",data);
    } catch (error) {
        dispatch({type:actionType.MARK_NOTIFICATION_AS_READ_FAILURE,payload: error});
        console.log("Error", error);
    }
}

export const markAllNotificationsAsRead = (userId) => async(dispatch) => {
    dispatch({type:actionType.MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST})
    try {
        const {data} = await api.put(`/api/notification/user/${userId}/read`);
        dispatch({type:actionType.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,payload: data});
        console.log("Mark all notification as read data",data);
    } catch (error) {
        dispatch({type:actionType.MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE,payload: error});
        console.log("Error", error);
    }
}

export const deleteNotification = (notificationId) => async(dispatch) => {
    dispatch({type:actionType.DELETE_NOTIFICATION_REQUEST})
    try {
        const {data} = await api.delete(`/api/notification/${notificationId}`);
        dispatch({type:actionType.DELETE_NOTIFICATION_SUCCESS,payload: notificationId});
        console.log("Delete notification data",data);
    } catch (error) {
        dispatch({type:actionType.DELETE_NOTIFICATION_FAILURE,payload: error});
        console.log("Error", error);
    }
}