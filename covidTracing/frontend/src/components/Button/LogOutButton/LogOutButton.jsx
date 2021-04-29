import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';
import { useDispatch } from "react-redux";
import { logUserOut } from '../../../redux/login/actions'

const actionDispatch = (dispatch) => ({
    logUserOut: (users) => dispatch(logUserOut(users)),
});

const LogOutButton = (props) => {
    const { logUserOut } = actionDispatch(useDispatch());

    const useStyles = makeStyles({
        logOutButton: {
            width: `calc(${props.drawerWidth} - 60%)`,
        }
    });

    const classes = useStyles();

    return (
        <Button className={classes.logOutButton} variant="contained" color="secondary" size="large" onClick={logUserOut}>
            LOG OUT
        </Button>
    )
}

export default LogOutButton;