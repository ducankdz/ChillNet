import { suggestUser } from "./Action";
import * as actionType from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    user: null,
    reqUser: null,
    users: [],
    suggestUsers: [],
    followers: [],
    followings: []
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Các action request
        case actionType.CHANGE_PASSWORD_REQUEST:
        case actionType.FIND_USER_BY_ID_REQUEST:
        case actionType.FOLLOW_USER_REQUEST:
        case actionType.GET_USER_REQUEST:
        case actionType.SEARCH_USER_REQUEST:
        case actionType.SUGGEST_USER_REQUEST:
        case actionType.GET_USER_FOLLOWERS_REQUEST:
        case actionType.GET_USER_FOLLOWINGS_REQUEST:
        case actionType.UPGRADE_TO_PREMIUM_REQUEST:
            return { ...state, loading: true, error: null };

        // Các action failure
        case actionType.CHANGE_PASSWORD_FAILURE:
        case actionType.FIND_USER_BY_ID_FAILURE:
        case actionType.FOLLOW_USER_FAILURE:
        case actionType.GET_USER_FAILURE:
        case actionType.SEARCH_USER_FAILURE:
        case actionType.SUGGEST_USER_FAILURE:
        case actionType.GET_USER_FOLLOWERS_FAILURE:
        case actionType.GET_USER_FOLLOWINGS_FAILURE:
        case actionType.UPGRADE_TO_PREMIUM_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Các action success
        case actionType.FIND_USER_BY_ID_SUCCESS:
        case actionType.FOLLOW_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload };

        case actionType.GET_USER_SUCCESS:
        case actionType.UPDATE_USER_SUCCESS:
        case actionType.CHANGE_PASSWORD_SUCCESS:
        case actionType.UPGRADE_TO_PREMIUM_SUCCESS:
            return { ...state, loading: false, error: null, reqUser: action.payload };

        case actionType.SEARCH_USER_SUCCESS:
            return { ...state, loading: false, error: null, users: action.payload };
        case actionType.SUGGEST_USER_SUCCESS:
            return { ...state, loading: false, error: null, suggestUsers: action.payload };
        case actionType.GET_USER_FOLLOWERS_SUCCESS:
            return { ...state, loading: false, error: null, followers: action.payload };
        case actionType.GET_USER_FOLLOWINGS_SUCCESS:
            return { ...state, loading: false, error: null, followings: action.payload };

        case actionType.CLEAR_USER:
            return initialState;
        default:
            return state;
    }
};
