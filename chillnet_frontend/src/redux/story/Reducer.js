import * as actionType from "./ActionType"

const initialState = {
    loading: false,
    error: null,
    story: null,
    stories: [],
    viewers: [],
    likers: []
}

export const storyReducer = (state = initialState, action) => {
    switch (action.type) {
        //request
        case actionType.CREATE_STORY_REQUEST:
        case actionType.VIEW_STORY_REQUEST:
        case actionType.GET_FOLLOWED_USER_STORIES_REQUEST:
        case actionType.GET_VIEWERS_REQUEST:
        case actionType.DELETE_STORY_REQUEST:
        case actionType.LIKE_STORY_REQUEST:
        case actionType.GET_LIKERS_REQUEST:
            return { ...state, loading: true, error: null }
        //failure
        case actionType.CREATE_STORY_FAILURE:
        case actionType.VIEW_STORY_FAILURE:
        case actionType.GET_FOLLOWED_USER_STORIES_FAILURE:
        case actionType.GET_VIEWERS_FAILURE:
        case actionType.DELETE_STORY_FAILURE:
        case actionType.LIKE_STORY_FAILURE:
        case actionType.GET_LIKERS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        //success
        case actionType.CREATE_STORY_SUCCESS:
            return { ...state, loading: false, error: null, stories: [action.payload, ...state.stories] }
        case actionType.VIEW_STORY_SUCCESS:
        case actionType.LIKE_STORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                story: action.payload,
                stories: state.stories.map((story) =>
                    story.id === action.payload.id ? action.payload : story
                ),
            };
        case actionType.GET_FOLLOWED_USER_STORIES_SUCCESS:
            return { ...state, loading: false, error: null, stories: action.payload }
        case actionType.GET_VIEWERS_SUCCESS:
            return { ...state, loading: false, error: null, viewers: action.payload }
        case actionType.DELETE_STORY_SUCCESS:
            return {
                ...state, loading: false, error: null,
                stories: state.stories.filter(story => story.id !== action.payload)
            }
        case actionType.GET_LIKERS_SUCCESS:
            return { ...state, loading: false, error: null, likers: action.payload }
        default:
            return state;
    }
}