import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { selectLoginStatus } from "../../redux/login/selector";

const stateSelector = createSelector(selectLoginStatus, (loginStatus) => ({
    loginStatus,
}));

export default function PrivateRoute ({ component: Component, ...rest }) {
    const { loginStatus } = useSelector(stateSelector);

    return <Route {...rest} render={(props) => (
        loginStatus
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
};
