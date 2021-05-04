//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { TextField as MaterialUiTextField } from "@material-ui/core";

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

export const TextField = (props) => {
    const { id, label, value, onChangeHandler, errorValue, errorMessage } = props;
    const classes = useStyles();
    
    return (
        <div className={classes.textFieldWrapper}>
            <MaterialUiTextField
                id={`outlined-basic-${id}`} label={label} type="text" variant="outlined" value={value} required
                onChange={(e) => onChangeHandler(e)} error={errorValue}
            />
            {errorValue ? <p className={classes.errorText}>{errorMessage}</p> : ""}
        </div>
    )
}