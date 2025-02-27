import * as actionType from "./ActionType";

const initialState = {
    jwt: null,
    loading: false,
    error: null,
};

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_REQUEST:
        case actionType.REGISTER_REQUEST:
        case actionType.LOGIN_GOOGLE_REQUEST:
            return {...state, loading: true, error: null}
        case actionType.LOGIN_FAILURE:
        case actionType.REGISTER_FAILURE:
        case actionType.LOGIN_GOOGLE_FAILURE:
            return {...state, loading: false, error: action.error}
        case actionType.LOGIN_SUCCESS:
        case actionType.REGISTER_SUCCESS:
        case actionType.LOGIN_GOOGLE_SUCCESS:
            return {...state, loading: false, error: null, jwt: action.payload.jwt}
        case actionType.LOGOUT:
            return initialState
        default:
            return state
    }
}