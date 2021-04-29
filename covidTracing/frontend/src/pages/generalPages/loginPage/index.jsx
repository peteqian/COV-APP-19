import Logo from "../../../assets/logo/logo"

import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { emailValidation, passwordValidation } from '../../../components/InputFields/Validation'
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logUserInSuccess, logUserInError } from '../../../redux/login/actions'
import { createSelector } from "reselect";
import { selectLoginError } from "../../../redux/login/selector";

const stateSelector = createSelector(selectLoginError, (loginError) => ({
    loginError,
}));

const actionDispatch = (dispatch) => ({
    logUserInSuccess: (users) => dispatch(logUserInSuccess(users)),
    logUserInError: (users) => dispatch(logUserInError(users)),
});

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        width: '70%',
        margin: 'auto',
    },
    logoWrapper: {
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
    },
    errorText: {
        color: 'red',
        padding: 0,
        margin: 0
    }
}));

export const LoginPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { loginError } = useSelector(stateSelector);
    const { logUserInSuccess, logUserInError } = actionDispatch(useDispatch());

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    //Updates values in state
    const setEmailValue = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    }
    const setPasswordValue = (event) => {
        setPassword(event.target.value);
        setPasswordError(false);
    }

    //handle clicking the icon to show/hide password
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //prevents the default mouse down on the password/confirmPassword icon
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //checks if the data in input fields are valid
    const handleLoginButtonClick = () => {
        if(!emailValidation(email)){
            setEmailError(true);
        }

        const passwordValidationResult = passwordValidation(password);
        if(!passwordValidationResult.valid){
            setPasswordError(true);
            setPasswordErrorMessage(passwordValidationResult.message);
        }

        if(!emailError && !passwordError){
            //email and passwords are valid
            logInProcess();
        }
    }

    //send data to backend to try to log in
    const logInProcess = async () => {
        try {
            // const response = await Axios({
            //     method: 'post',
            //     url: '',
            //     data: {

            //     }
            // });

            logUserInSuccess({
                firstName: 'Ryan',
                lastName: 'Wickham',
                email: 'ryanwickahm259@gmail.com',
                phoneNumber: '0412345678',
            });
            history.push('/');
        } catch (err) {
            //error occured -> could not login
            logUserInError();
        }
        
    }

    //handle sign up button click
    const handleSignupButtonClick = () => {
        history.push("/signup");
    }

    return (
        <div className={classes.container}>
            <div className={classes.logoWrapper}>
                <Logo />
            </div>
            <div className={classes.textFieldWrapper}>
                <TextField
                    id="outlined-basic" label="Email" type="email" variant="outlined" value={email} required
                    onChange={setEmailValue} error={emailError}
                />
                {emailError ? <p className={classes.errorText}>Please enter a valid email address</p> : ""}
            </div>

            {/* Password */}
            <FormControl className={classes.textFieldWrapper} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    label="Password *"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    required
                    onChange={setPasswordValue}
                    error={passwordError}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                />
                {passwordError ? <p className={classes.errorText}>{passwordErrorMessage}</p> : ""}
            </FormControl>
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleLoginButtonClick()} className={classes.button}>
                    Log In
                </Button>
            </div>
            <div className={classes.buttonWrapper}>
                {loginError ? <p className={classes.errorText}>{passwordErrorMessage}</p> : ""}
                <Button variant="contained" color="secondary" onClick={() => handleSignupButtonClick() } className={classes.button}>
                    Sign Up
                </Button>
            </div>
        </div>
    )
}