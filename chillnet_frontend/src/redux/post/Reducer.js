import { LOGOUT } from "../auth/ActionType";
import * as actionType from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    post: null,
    posts: [],
    userPosts: [],
    likedPosts: [],
    savedPosts: [],
    followingPosts: [],
    trendingPosts: [],
    like: null,
    share: null
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        //Request
        case actionType.CREATE_POST_REQUEST:
        case actionType.DELETE_POST_REQUEST:
        case actionType.GET_ALL_POSTS_REQUEST:
        case actionType.GET_USER_POSTS_REQUEST:
        case actionType.GET_USER_SAVED_POSTS_REQUEST:
        case actionType.GET_USER_LIKE_POSTS_REQUEST:
        case actionType.LIKE_POST_REQUEST:
        case actionType.SAVE_POST_REQUEST:
        case actionType.SHARE_POST_REQUEST:
        case actionType.FIND_POST_BY_ID_REQUEST:
        case actionType.COMMENT_POST_REQUEST:
        case actionType.GET_FOLLOWING_USER_POSTS_REQUEST:
        case actionType.GET_TRENDING_POSTS_REQUEST:
            return { ...state, loading: true, error: null }
        //Failure
        case actionType.CREATE_POST_FAILURE:
        case actionType.DELETE_POST_FAILURE:
        case actionType.GET_ALL_POSTS_FAILURE:
        case actionType.GET_USER_POSTS_FAILURE:
        case actionType.GET_USER_LIKE_POSTS_FAILURE:
        case actionType.GET_USER_SAVED_POSTS_FAILURE:
        case actionType.LIKE_POST_FAILURE:
        case actionType.SAVE_POST_FAILURE:
        case actionType.SHARE_POST_FAILURE:
        case actionType.FIND_POST_BY_ID_FAILURE:
        case actionType.COMMENT_POST_FAILURE:
        case actionType.GET_FOLLOWING_USER_POSTS_FAILURE:
        case actionType.GET_TRENDING_POSTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        //Success
        case actionType.CREATE_POST_SUCCESS:
            return { ...state, loading: false, error: null, posts: [action.payload, ...state.posts] }
        case actionType.DELETE_POST_SUCCESS:
            return {
                ...state, loading: false, error: null,
                posts: state.posts.filter(post => post.id !== action.payload)
            }
        case actionType.GET_ALL_POSTS_SUCCESS:
            return { ...state, loading: false, error: null, posts: action.payload }
        case actionType.GET_USER_POSTS_SUCCESS:
            return { ...state, loading: false, error: null, userPosts: action.payload }
        case actionType.GET_USER_LIKE_POSTS_SUCCESS:
            return { ...state, loading: false, error: null, likedPosts: action.payload }
        case actionType.GET_USER_SAVED_POSTS_SUCCESS:
            return { ...state, loading: false, error: null, savedPosts: action.payload }
        case actionType.GET_FOLLOWING_USER_POSTS_SUCCESS:
            return { ...state, loading: false, error: null, followingPosts: action.payload }
        case actionType.GET_TRENDING_POSTS_SUCCESS:
            return { ...state, loading: false, error: null, trendingPosts: action.payload }
        case actionType.LIKE_POST_SUCCESS:
            return { ...state, loading: false, error: null, like: action.payload }
        case actionType.SHARE_POST_SUCCESS:
            return { ...state, loading: false, error: null, share: action.payload }
        case actionType.SAVE_POST_SUCCESS:
        case actionType.FIND_POST_BY_ID_SUCCESS:
        case actionType.COMMENT_POST_SUCCESS:
            return { ...state, loading: false, error: null, post: action.payload }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}