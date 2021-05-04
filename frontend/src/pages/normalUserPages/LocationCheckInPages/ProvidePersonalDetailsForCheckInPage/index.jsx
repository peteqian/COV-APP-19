//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

//Customer Component
import { TextField } from '../../../../components/InputFields/TextField';

//React
import { useState } from "react";
import { useHistory } from "react-router";

//redux
import { useSelector } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { selectFirstName, selectLastName, selectPhoneNumber } from "../../../../redux/login/selector";

//Validation
import { textFieldValidation, phoneNumberValidation } from '../../../../components/InputFields/Validation'

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
    },
}));

const stateSelector = createStructuredSelector({
    firstNameFromState: createSelector(selectFirstName, (firstName) => firstName),
    lastNameFromState: createSelector(selectLastName, (lastName) => lastName),
    phoneNumberFromState: createSelector(selectPhoneNumber, (phoneNumber) => phoneNumber),
});

export const ProvidePersonalDetailsForCheckInPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { firstNameFromState, lastNameFromState, phoneNumberFromState } = useSelector(stateSelector);

    //Component State
    const [firstName, setFirstName] = useState(firstNameFromState);
    const [firstNameError, setFirstNameError] = useState(false);

    const [lastName, setLastName] = useState(lastNameFromState);
    const [lastNameError, setLastNameError] = useState(false);
    
    const [phoneNumber, setPhoneNumber] = useState(phoneNumberFromState);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    //Updates values in state with error checking
    const setFirstNameValue = (event) => {
        setFirstName(event.target.value);
        validateFirstName(event.target.value);
    }
    const setLastNameValue = (event) => {
        setLastName(event.target.value);
        validateLastName(event.target.value);
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
    const validatePhoneNumber = (item = phoneNumber) => {
        phoneNumberValidation(item) ? setPhoneNumberError(false) : setPhoneNumberError(true);
    }

    //adds a new dependent group of inputs to page
    const handleAddDependentButtonClick = () => {
        
    }

    //Sends data to backend to be logged
    const handleCheckInButtonClick = () => {
        //send data to backend to checkin
        try {
            console.log('checkin confirm')
            history.push('/checkin-confirmation');
        } catch (err) {

        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <Typography variant="h2" component="h2" gutterBottom align="left">
                    Contact Tracing
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
            
            {/* Phone Number */}
            <TextField id="phoneNumber" 
                label="Phone Number" value={phoneNumber} onChangeHandler={setPhoneNumberValue}
                errorValue={phoneNumberError} errorMessage="Please enter a valid phone number" />

            {/* Add Dependent Button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleAddDependentButtonClick() } className={classes.button}>
                    Add Dependent
                </Button>
            </div>

            {/* Check in Button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleCheckInButtonClick() } className={classes.button}>
                    Check In
                </Button>
            </div>
        </div>
    )
}