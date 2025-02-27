import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { postReducer } from "./post/Reducer";
import { userReducer } from "./user/Reducer";
import { notificationReducer } from "./notification/Reducer";
import { storyReducer } from "./story/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    user: userReducer,
    notification: notificationReducer,
    story: storyReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))