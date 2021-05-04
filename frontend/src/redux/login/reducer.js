import { ActionTypes } from "./types";

const defaultFirstName = "";
const defaultLastName = "";
const defaultEmail = "";
const defaultPhoneNumber = "";
const defaultAccessToken = "";
const defaultUserType = "GENERAL_USER";

const defaultState = {
    firstName: defaultFirstName,
    lastName: defaultLastName,
    email: defaultEmail,
    phoneNumber: defaultPhoneNumber,
    loginStatus: false,
    loginError: false,
    accessToken: defaultAccessToken,
    userType: defaultUserType,
};

export default function loginReducer(state = defaultState, action) {
    switch(action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                loginStatus: true,
                loginError: false,
                accessToken: action.payload.accessToken,
            };
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                firstName: defaultFirstName,
                lastName: defaultLastName,
                email: defaultEmail,
                phoneNumber: defaultPhoneNumber,
                loginStatus: false,
                loginError: true,
            };
        case ActionTypes.LOGOUT:
            return {
                ...state,
                firstName: defaultFirstName,
                lastName: defaultLastName,
                email: defaultEmail,
                phoneNumber: defaultPhoneNumber,
                loginStatus: false,
            }
        default:
            return state;
    }
}