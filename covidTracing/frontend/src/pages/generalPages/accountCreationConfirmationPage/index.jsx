import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { Button, Typography } from "@material-ui/core";

import AccountCreationConfirmationIcon from "../../../assets/icons/AccountCreationConfirmationIcon/AccountCreationConfirmationIcon";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        width: '70%',
        margin: 'auto',
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
    iconWrapper: {
        margin: '0 auto',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            paddingBottom: '5%',
        },
        [theme.breakpoints.up('md')]: {
            width: '30%',
            paddingBottom: '2%',
        },
    },
    textFieldWrapper: {
        margin: 'auto',
        display: "flex",
        flexDirection: 'column',


        [theme.breakpoints.down('sm')]: {
            width: '100%',
            paddingBottom: '5%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
            paddingBottom: '2%',
        }
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
        fontSize: '1.8em'
    }
}));

export const AccountCreationConfirmationPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const redirectToLoginPage = () => {
        history.push("/");
    }

    return (
        <div className={classes.container}>
            {/* Creat Account Heading */}
            <div className={classes.heading}>
                <Typography variant="h2" component="h2" gutterBottom align="center">
                    Account Created
                </Typography>
            </div>

            {/* Icon */}
            <div className={classes.iconWrapper}>
                <AccountCreationConfirmationIcon />
            </div>

            {/* Bottom Text */}
            <div className={classes.textFieldWrapper}>
                <Typography variant="body1" component="p" gutterBottom align="left">
                    Thank you for your time!
                </Typography>
            </div>
            <div className={classes.textFieldWrapper}>
                <Typography variant="body1" component="p" gutterBottom align="left">
                    The confirmation has been sent to your emal address, please confirm it and then you can access the application.
                </Typography>
            </div>

            {/* Return to login page button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => redirectToLoginPage() } className={classes.button}>
                    Confirm
                </Button>
            </div>
        </div>
    )
}