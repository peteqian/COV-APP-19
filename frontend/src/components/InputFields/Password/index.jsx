//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
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
    errorText: {
        color: 'red',
        padding: 0,
        margin: 0
    }
}));

export const PasswordField = (props) => {
    const { id, label, value, onChangeHandler, errorValue, errorMessage, showPassword, handleClickShowPassword } = props;
    const classes = useStyles();

    //prevents the default mouse down on the password/confirmPassword icon
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
        <FormControl className={classes.textFieldWrapper} variant="outlined">
                <InputLabel htmlFor={`outlined-adornment-${id}`} required>{label}</InputLabel>
                <OutlinedInput
                    id={`outlined-adornment-${id}`}
                    label={`${label} *`}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    required
                    onChange={onChangeHandler}
                    error={errorValue}
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
                {errorValue ? <p className={classes.errorText}>{errorMessage}</p> : ""}
            </FormControl>
    )
}