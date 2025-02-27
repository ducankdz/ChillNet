import * as actionType from "./ActionType";
import api from "../../config/api";
import { sendNotification } from "../notification/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createPost = (postData) => async (dispatch, getState) => {
    dispatch({ type: actionType.CREATE_POST_REQUEST })
    try {
        const { data } = await api.post(`/api/post/create`, postData);
        dispatch({ type: actionType.CREATE_POST_SUCCESS, payload: data })
        const { user } = getState();
        const followers = user.reqUser?.followers || [];
        if (followers.length > 0) {
            followers.forEach(follower => {
                const notificationData = {
                    senderId: user.reqUser?.id,
                    receiverId: follower.id,
                    content: `has created a new post.`,
                    type: "NEW_POST",
                    postId: data.id
                };
                dispatch(sendNotification(notificationData));
            });
        }
    } catch (error) {
        dispatch({ type: actionType.CREATE_POST_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const deletePost = (postId) => async (dispatch) => {
    dispatch({ type: actionType.DELETE_POST_REQUEST })
    try {
        const { data } = await api.delete(`/api/post/${postId}`);
        dispatch({ type: actionType.DELETE_POST_SUCCESS, payload: postId })
        toast.success("Delete post successfully.")
    } catch (error) {
        dispatch({ type: actionType.DELETE_POST_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const getAllPosts = () => async (dispatch) => {
    dispatch({ type: actionType.GET_ALL_POSTS_REQUEST })
    try {
        const { data } = await api.get(`/api/post`);
        dispatch({ type: actionType.GET_ALL_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.GET_ALL_POSTS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const getUserPosts = (userId) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_POSTS_REQUEST })
    try {
        const { data } = await api.get(`/api/post/user/${userId}`);
        dispatch({ type: actionType.GET_USER_POSTS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_USER_POSTS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const getUserLikedPosts = (userId) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_LIKE_POSTS_SUCCESS })
    try {
        const { data } = await api.get(`/api/post/user/${userId}/likes`);
        dispatch({ type: actionType.GET_USER_LIKE_POSTS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_USER_LIKE_POSTS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const getUserSavedPosts = (userId) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_SAVED_POSTS_REQUEST })
    try {
        const { data } = await api.get(`/api/post/user/${userId}/saves`);
        dispatch({ type: actionType.GET_USER_SAVED_POSTS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_USER_SAVED_POSTS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const getFollowingUserPosts = () => async (dispatch) => {
    dispatch({ type: actionType.GET_FOLLOWING_USER_POSTS_REQUEST })
    try {
        const { data } = await api.get(`/api/post/following`);
        dispatch({ type: actionType.GET_FOLLOWING_USER_POSTS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_FOLLOWING_USER_POSTS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const getTrendingPosts = () => async (dispatch) => {
    dispatch({ type: actionType.GET_TRENDING_POSTS_REQUEST })
    try {
        const { data } = await api.get(`/api/post/trending`);
        dispatch({ type: actionType.GET_TRENDING_POSTS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.GET_TRENDING_POSTS_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}


export const likePost = (postId) => async (dispatch, getState) => {
    dispatch({ type: actionType.LIKE_POST_REQUEST })
    try {
        const { data } = await api.post(`/api/like/post/${postId}`);
        dispatch({ type: actionType.LIKE_POST_SUCCESS, payload: data })

        const { user } = getState();
        if (data.post?.liked && user.reqUser?.id!=data.post?.user?.id) {
            const notificationData = {
                senderId: user.reqUser?.id,
                receiverId: data.post?.user?.id,
                content: `has liked your post.`,
                type: "LIKE",
                postId: data.post?.id
            };
            dispatch(sendNotification(notificationData));
        }
    } catch (error) {
        dispatch({ type: actionType.LIKE_POST_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const savePost = (postId) => async (dispatch) => {
    dispatch({ type: actionType.SAVE_POST_REQUEST })
    try {
        const { data } = await api.put(`/api/post/${postId}/save`);
        dispatch({ type: actionType.SAVE_POST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.SAVE_POST_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const sharePost = (postId) => async (dispatch, getState) => {
    dispatch({ type: actionType.SHARE_POST_REQUEST })
    try {
        const { data } = await api.post(`/api/share/post/${postId}`);
        dispatch({ type: actionType.SHARE_POST_SUCCESS, payload: data })
        
        const { user } = getState();
        if (data.post?.shared && user.reqUser?.id!=data.post?.user?.id) {
            const notificationData = {
                senderId: user.reqUser?.id,
                receiverId: data.post?.user?.id,
                content: `has shared your post.`,
                type: "SHARE",
                postId: data.post?.id
            };
            dispatch(sendNotification(notificationData));
        }
    } catch (error) {
        dispatch({ type: actionType.SHARE_POST_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const findPostById = (postId) => async (dispatch) => {
    dispatch({ type: actionType.FIND_POST_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/post/${postId}`);
        dispatch({ type: actionType.FIND_POST_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actionType.FIND_POST_BY_ID_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}

export const commentPost = (postData) => async (dispatch, getState) => {
    dispatch({ type: actionType.COMMENT_POST_REQUEST })
    try {
        const { data } = await api.post(`/api/post/comment`, postData);
        dispatch({ type: actionType.COMMENT_POST_SUCCESS, payload: data })

        const { user } = getState();
        if (user.reqUser?.id!=data.user?.id) {
            const notificationData = {
                senderId: user.reqUser?.id,
                receiverId: data.user?.id,
                content: `has commented your post.`,
                type: "COMMENT",
                postId: data.id
            };
            dispatch(sendNotification(notificationData));
        } 
    } catch (error) {
        dispatch({ type: actionType.COMMENT_POST_FAILURE, payload: error })
        toast.error(error?.response?.data);
    }
}