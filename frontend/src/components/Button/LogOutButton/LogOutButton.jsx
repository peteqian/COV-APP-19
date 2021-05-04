//Material UI
import { Button } from '@material-ui/core/';

//Redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { selectAccessToken } from "../../../redux/login/selector";
import { useDispatch } from "react-redux";
import { logUserOut } from '../../../redux/login/actions'

//Endpoint APIs
import Axios from "axios";
import { logoutApiUrl } from "../../../constants/apiURL";

const stateSelector = createSelector(selectAccessToken, (accessToken) => ({
    accessToken,
}));

const actionDispatch = (dispatch) => ({
    logUserOut: (users) => dispatch(logUserOut(users)),
});

const LogOutButton = (props) => {
    const { accessToken } = useSelector(stateSelector);
    const { logUserOut } = actionDispatch(useDispatch());

    const handleLogoutButtonClick = async () => {
        try {
            await Axios({
                method: 'post',
                url: logoutApiUrl,
                headers: {
                    Authorization: accessToken,
                },
            });
        } catch (err) {
            console.log(err);
        }
        logUserOut();
    }

    return (
        <Button variant="contained" color="secondary" size="large" onClick={handleLogoutButtonClick}>
            LOG OUT
        </Button>
    )
}

export default LogOutButton;