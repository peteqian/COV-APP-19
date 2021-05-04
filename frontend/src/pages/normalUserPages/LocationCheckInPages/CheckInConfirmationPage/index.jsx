//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

//React
import { useHistory } from "react-router";

//Custome Component
import CheckInConfirmationIcon from "../../../../assets/icons/CheckInConfirmationIcon";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        width: '70%',
        margin: 'auto',
    },
    contentContainer: {
        paddingBottom: '2%',
    },
    heading: {
        margin: 'auto',
        display: "flex",
        flexDirection: 'column',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
        },
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: 'column',
        margin: 'auto',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            paddingBottom: '3%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
            paddingBottom: '1%',
        }
    },
    button: {
        fontSize: '1.4em'
    },
}));

export const CheckInConfirmationPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const handleConfirmButtonClick = () => {
        history.push('/');
    }

    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <Typography variant="h2" component="h2" gutterBottom align="Left">
                    Contact Tracing
                </Typography>
            </div>

            <div className={classes.contentContainer}>
                <Typography variant="h6" component="h6" gutterBottom align="center">
                    ENTRY CONFIRMED
                </Typography>

                <CheckInConfirmationIcon />

                <Typography variant="h6" component="h6" gutterBottom align="center">
                    YOUR ENTRY HAS BEEN RECORDED
                </Typography>
            </div>

            {/* Confirm Button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleConfirmButtonClick() } className={classes.button}>
                    Confirm
                </Button>
            </div>
        </div>
    )
}