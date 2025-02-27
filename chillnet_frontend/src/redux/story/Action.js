import api from "../../config/api";
import * as actionType from "./ActionType"
import { toast } from "react-toastify";

export const createStory = (storyData) => async(dispatch)=>{
    dispatch({type: actionType.CREATE_STORY_REQUEST});
    try {
        const {data} = await api.post(`/api/story`,storyData);
        dispatch({type: actionType.CREATE_STORY_SUCCESS, payload: data});
        toast.success("Upload story successfully.");
    } catch (error) {
        dispatch({type: actionType.CREATE_STORY_FAILURE, payload: error});
        toast.error(error?.response?.data);
    }
}

export const viewStory = (storyId) => async(dispatch)=>{
    dispatch({type: actionType.VIEW_STORY_REQUEST});
    try {
        const {data} = await api.get(`/api/story/${storyId}`);
        dispatch({type: actionType.VIEW_STORY_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: actionType.VIEW_STORY_FAILURE, payload: error});
        toast.error(error?.response?.data);
    }
}

export const getFollowedUserStories = () => async(dispatch)=>{
    dispatch({type: actionType.GET_FOLLOWED_USER_STORIES_REQUEST});
    try {
        const {data} = await api.get(`/api/story/followed`);
        dispatch({type: actionType.GET_FOLLOWED_USER_STORIES_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: actionType.GET_FOLLOWED_USER_STORIES_FAILURE, payload: error});
        toast.error(error?.response?.data);
    }
}

export const getViewers = (storyId) => async(dispatch)=>{
    dispatch({type: actionType.GET_VIEWERS_REQUEST});
    try {
        const {data} = await api.get(`/api/story/${storyId}/watched`);
        dispatch({type: actionType.GET_VIEWERS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: actionType.GET_VIEWERS_FAILURE, payload: error});
        toast.error(error?.response?.data);
    }
}

export const deleteStory = (storyId) => async(dispatch)=>{
    dispatch({type: actionType.DELETE_STORY_REQUEST});
    try {
        const {data} = await api.delete(`/api/story/${storyId}`);
        dispatch({type: actionType.DELETE_STORY_SUCCESS, payload: storyId});
        toast.success("Delete story successfully.");
    } catch (error) {
        dispatch({type: actionType.DELETE_STORY_FAILURE, payload: error});
        toast.error(error?.response?.data);
    }
}

export const likeStory = (storyId) => async(dispatch)=>{
    dispatch({type: actionType.LIKE_STORY_REQUEST});
    try {
        const {data} = await api.post(`/api/story/${storyId}/like`);
        dispatch({type: actionType.LIKE_STORY_SUCCESS, payload: storyId});
    } catch (error) {
        dispatch({type: actionType.LIKE_STORY_FAILURE, payload: error});
        toast.error(error?.response?.data);
    }
}

export const getLikers = (storyId) => async(dispatch)=>{
    dispatch({type: actionType.GET_LIKERS_REQUEST});
    try {
        const {data} = await api.get(`/api/story/${storyId}/liked`);
        dispatch({type: actionType.GET_LIKERS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: actionType.GET_LIKERS_FAILURE, payload: error});
        toast.error(error?.response?.data);
    }
}