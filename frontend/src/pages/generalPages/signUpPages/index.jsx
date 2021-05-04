//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

//Customer Component
import { TextField } from "../../../components/InputFields/TextField";
import { PasswordField } from "../../../components/InputFields/Password";

//React
import { useState } from "react";
import { useHistory } from "react-router";

//Redux
import { useDispatch } from "react-redux";
import { logUserInSuccess } from '../../../redux/login/actions'

//Validation
import { textFieldValidation, emailValidation, passwordValidation, phoneNumberValidation } from '../../../components/InputFields/Validation'

//Endpoint APIs
import Axios from "axios";
import { registerUserApiUrl } from "../../../constants/apiURL";

const actionDispatch = (dispatch) => ({
    logUserInSuccess: (users) => dispatch(logUserInSuccess(users)),
});

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
        fontSize: '1.4em'
    },
    errorText: {
        color: 'red',
        padding: 0,
        margin: 0
    }
}));

export const SignUpPage = (props) => {
    const { logUserInSuccess } = actionDispatch(useDispatch());
    const classes = useStyles();
    const history = useHistory();

    //local state
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    //Updates values in state
    const setFirstNameValue = (event) => {
        setFirstName(event.target.value);
        validateFirstName(event.target.value);
    }
    const setLastNameValue = (event) => {
        setLastName(event.target.value);
        validateLastName(event.target.value);
    }
    const setEmailValue = (event) => {
        setEmail(event.target.value);
        validateEmail(event.target.value);        
    }
    const setPasswordValue = (event) => {
        setPassword(event.target.value);
        validatePassword(event.target.value);
    }
    const setConfirmPasswordValue = (event) => {
        setConfirmPassword(event.target.value);
        validateConfirmPassword(event.target.value);
    }
    const setPhoneNumberValue = (event) => {
        setPhoneNumber(event.target.value);
        validatePhoneNumber(event.target.value);
    }

    //validate fields
    const validateFirstName = (item = firstName) => {
        textFieldValidation(item) ? setFirstNameError(false) : setFirstNameError(true);
    }
    const validateLastName = (item = lastName) => {
        textFieldValidation(item) ? setLastNameError(false) : setLastNameError(true);
    }
    const validateEmail = (item = email) => {
        emailValidation(item) ? setEmailError(false) : setEmailError(true);
    }
    const validatePassword = (item = password) => {
        const passwordValidationResult = passwordValidation(item);
        if(!passwordValidationResult.valid){
            setPasswordError(true);
            setPasswordErrorMessage(passwordValidationResult.message);
        }else{
            setPasswordError(false);
        }
        item !== confirmPassword ? setConfirmPasswordError(true) : setConfirmPasswordError(false);
    }
    const validateConfirmPassword = (item = confirmPassword) => {
        item !== password ? setConfirmPasswordError(true) : setConfirmPasswordError(false);
    }
    const validatePhoneNumber = (item = phoneNumber) => {
        phoneNumberValidation(item) ? setPhoneNumberError(false) : setPhoneNumberError(true);
    }

    //handle clicking the icon to show/hide password/confirmPassword
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    //perform checking on input fields, send to backend, and confirm account creation
    const handleSubmitButtonClick = (event) => {
        //check if any value are still empty
        if(firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "" || setPhoneNumber === ""){
            //don't submit && set fields to error state if empty
            runValidateAllValues();

        //check if any value is invalid    
        }else if(firstNameError || lastNameError || emailError || passwordError || confirmPasswordError || phoneNumberError){
            //don't submit
        }else{
            //all good to submit
            createAccountProcess();
        }
    };

    const runValidateAllValues = () => {
        validateFirstName();
        validateLastName();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validatePhoneNumber();
    };

    const createAccountProcess = async () => {
        try {
            const response = await Axios({
                method: 'post',
                url: registerUserApiUrl,
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password,
                }
            });

            //auto log user in if register user api result was successful
            logUserInSuccess({
                firstName: response.user.first_name,
                lastName: response.user.last_name,
                email: response.user.email,
                accessToken: `token ${response.token}`,
            });

            history.push("/account-creation-confirmation");
        } catch (err) {
            //error occured -> could not login
            
        }
    };

    return (
        <div className={classes.container}>
            {/* Creat Account Heading */}
            <div className={classes.heading}>
                <Typography variant="h2" component="h2" gutterBottom align="left">
                    Create Account
                </Typography>
            </div>
            
            {/* First Name */}
            <TextField id="firstName" 
                label="First Name" value={firstName} onChangeHandler={setFirstNameValue}
                errorValue={firstNameError} errorMessage="First Name field can not be empty" />

            {/* lastName */}
            <TextField id="lastName" 
                label="Last Name" value={lastName} onChangeHandler={setLastNameValue}
                errorValue={lastNameError} errorMessage="Last Name field can not be empty" />
            
            {/* Email */}
            <TextField id="email" 
                label="Email" value={email} onChangeHandler={setEmailValue}
                errorValue={emailError} errorMessage="Please enter a valid email address" />

            {/* Password */}
            <PasswordField id="password"
                label="Password" value={password} onChangeHandler={setPasswordValue}
                errorValue={passwordError} errorMessage={passwordErrorMessage}
                showPassword={showPassword} handleClickShowPassword={handleClickShowPassword}
            />

            {/* Confirm Password */}
            <PasswordField id="confirmPassword"
                label="Confirm Password" value={confirmPassword} onChangeHandler={setConfirmPasswordValue}
                errorValue={confirmPasswordError} errorMessage="Password does not match"
                showPassword={showConfirmPassword} handleClickShowPassword={handleClickShowConfirmPassword}
            />

            {/* Phone Number */}
            <TextField id="phoneNumber" 
                label="Phone Number" value={phoneNumber} onChangeHandler={setPhoneNumberValue}
                errorValue={phoneNumberError} errorMessage="Please enter a valid phone number" />

            {/* Next Button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleSubmitButtonClick() } className={classes.button}>
                    Submit
                </Button>
            </div>
        </div>
    )
}