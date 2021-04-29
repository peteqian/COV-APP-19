import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { textFieldValidation, emailValidation, passwordValidation, phoneNumberValidation } from '../../../components/InputFields/Validation'

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
        fontSize: '1.8em'
    },
    errorText: {
        color: 'red',
        padding: 0,
        margin: 0
    }
}));

export const SignUpPage = (props) => {
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

    //prevents the default mouse down on the password/confirmPassword icon
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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

    const createAccountProcess = () => {
        console.log('CREATING ACCOUNT')
        history.push("/account-creation-confirmation");
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
            <div className={classes.textFieldWrapper}>
                <TextField
                    id="outlined-basic-firstName" label="First Name" type="text" variant="outlined" value={firstName} required
                    onChange={setFirstNameValue} error={firstNameError}
                />
                {firstNameError ? <p className={classes.errorText}>First Name field can not be empty</p> : ""}
            </div>
            {/* lastName */}
            <div className={classes.textFieldWrapper}>
                <TextField
                    id="outlined-basic-lastName" label="Last Name" type="text" variant="outlined" value={lastName} required
                    onChange={setLastNameValue} error={lastNameError}
                />
                {lastNameError ? <p className={classes.errorText}>Last Name field can not be empty</p> : ""}
            </div>
            {/* Email */}
            <div className={classes.textFieldWrapper}>
                <TextField
                    id="outlined-basic-email" label="Email" type="email" variant="outlined" value={email} required
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
            {/* Confirm Password */}
            <FormControl className={classes.textFieldWrapper} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirmPassword" required>Confirm Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-confirmPassword"
                    label="Confirm Password *"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    required
                    onChange={setConfirmPasswordValue}
                    error={confirmPasswordError}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                />
                {confirmPasswordError ? <p className={classes.errorText}>Password does not match</p> : ""}
            </FormControl>
            {/* Phone Number */}
            <div className={classes.textFieldWrapper}>
                <TextField
                    id="outlined-basic-phoneNumber" label="phoneNumber" type="tel" variant="outlined" value={phoneNumber} required
                    onChange={setPhoneNumberValue} error={phoneNumberError}
                />
                {phoneNumberError ? <p className={classes.errorText}>Please enter a valid phone number</p> : ""}
            </div>

            {/* Next Button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleSubmitButtonClick() } className={classes.button}>
                    Submit
                </Button>
            </div>
        </div>
    )
}