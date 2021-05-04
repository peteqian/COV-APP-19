import { createSelector } from "reselect";

const loginState = (state) => state.login;

export const selectFirstName = createSelector(loginState, login => login.firstName);
export const selectLastName = createSelector(loginState, login => login.lastName);
export const selectPhoneNumber = createSelector(loginState, login => login.phoneNumber);

export const selectLoginStatus = createSelector(loginState, login => login.loginStatus);
export const selectLoginError = createSelector(loginState, login => login.loginError);

export const selectAccessToken = createSelector(loginState, login => login.accessToken);
export const selectUserType = createSelector(loginState, login => login.userType);