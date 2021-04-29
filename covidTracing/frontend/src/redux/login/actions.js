import { ActionTypes } from './types';

export const logUserInSuccess = (payload) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: payload,
    };
};

export const logUserInError = (payload) => {
    return {
        type: ActionTypes.LOGIN_ERROR,
        payload: payload,
    };
};

export const logUserOut = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}