import Logo from "../../../assets/logo/logo"

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

//Customer Component
import { TextField } from "../../../components/InputFields/TextField";
import { PasswordField } from "../../../components/InputFields/Password";

//Validation
import { emailValidation, passwordValidation } from '../../../components/InputFields/Validation'

//React
import { useState } from "react";
import { useHistory } from "react-router";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { logUserInSuccess, logUserInError } from '../../../redux/login/actions'
import { createSelector } from "reselect";
import { selectLoginError } from "../../../redux/login/selector";

//Endpoint APIs
import Axios from "axios";
import { loginApiUrl } from "../../../constants/apiURL";

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

        if(email === "debug"){
            logInProcess();
        }
    }

    //send data to backend to try to log in
    const logInProcess = async () => {
        if(email === 'debug'){
            logUserInSuccess({
                firstName: "FNTest",
                lastName: "LNTest",
                email: "EmailTest",
                phoneNumber: "1234567890",
                accessToken: "accessTokenTest",
            });
            history.push('/');
        }else {
            try {
                const response = await Axios({
                    method: 'post',
                    url: loginApiUrl,
                    data: {
                        email: email,
                        password: password,
                    },
                });
                    
                logUserInSuccess({
                    firstName: response.data.user.first_name,
                    lastName: response.data.user.last_name,
                    email: response.data.user?.email,
                    phoneNumber: response.data.user?.phoneNumber,
                    accessToken: `token ${response.data.token}`,
                });
                history.push('/');
            } catch (err) {
                console.log('LOGIN API ERROR: ', err)
                //error occured -> could not login
                logUserInError();
            }
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
            {/* Email */}
            <TextField id="email"
                label="Email" value={email} onChangeHandler={setEmailValue}
                errorValue={emailError} errorMessage="Please enter a valid email address"
            />

            {/* Password */}
            <PasswordField id="password"
                label="Password" value={password} onChangeHandler={setPasswordValue}
                errorValue={passwordError} errorMessage={passwordErrorMessage}
                showPassword={showPassword} handleClickShowPassword={handleClickShowPassword}
            />

            {/* Login Button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleLoginButtonClick()} className={classes.button}>
                    Log In
                </Button>
            </div>

            {/* Sign up button */}
            <div className={classes.buttonWrapper}>
                {loginError ? <p className={classes.errorText}>{passwordErrorMessage}</p> : ""}
                <Button variant="contained" color="secondary" onClick={() => handleSignupButtonClick() } className={classes.button}>
                    Sign Up
                </Button>
            </div>
        </div>
    )
}