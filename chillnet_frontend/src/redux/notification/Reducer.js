import * as actionType from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    notification: null,
    notifications: [],
    unreadNotifications: []
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        //Request
        case actionType.SEND_NOTIFICATION_REQUEST:
        case actionType.GET_USER_NOTIFICATIONS_REQUEST:
        case actionType.MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST:
        case actionType.MARK_NOTIFICATION_AS_READ_REQUEST:
        case actionType.DELETE_NOTIFICATION_REQUEST:
        case actionType.GET_USER_UNREAD_NOTIFICATIONS_REQUEST:
            return { ...state, loading: true, error: null }
        //Failure
        case actionType.SEND_NOTIFICATION_FAILURE:
        case actionType.GET_USER_NOTIFICATIONS_FAILURE:
        case actionType.MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE:
        case actionType.MARK_NOTIFICATION_AS_READ_FAILURE:
        case actionType.DELETE_NOTIFICATION_FAILURE:
        case actionType.GET_USER_UNREAD_NOTIFICATIONS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        //Success
        case actionType.SEND_NOTIFICATION_SUCCESS:
            return { ...state, loading: false, error: null, notification: action.payload }
        case actionType.GET_USER_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, error: null, notifications: action.payload }
        case actionType.GET_USER_UNREAD_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, error: null, unreadNotifications: action.payload }
        case actionType.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
            return { ...state, loading: false, error: null, notifications: action.payload }
        case actionType.MARK_NOTIFICATION_AS_READ_SUCCESS:
            return { ...state, loading: false, error: null, notification: action.payload }
        case actionType.DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state, loading: false, error: null,
                notifications: state.notifications.filter((item) => item.id !== action.payload)
            }
        default:
            return state;
    }
}