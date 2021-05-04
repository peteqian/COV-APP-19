// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

//Customer Component
import { QRCodeScanner } from '../../../components/QRCodeScanner';

//React
import { useHistory } from "react-router";

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
        paddingBottom: '5%',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
        },
    },
    QRScannerWrapper: {
        paddingBottom: '5%',
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

export const QRCodeScannerPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const handleQRCodeData = (data) => {

    }

    //Sends to see their own check in history
    const handleRecentCheckInsButtonClick = () => {
        history.push('/checkin-history');
    }

    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <Typography variant="h4" component="h1" gutterBottom align="left">
                    Scan QR code
                </Typography>
            </div>

            {/* QR Code Scanner */}
            <div className={classes.QRScannerWrapper}>
                <QRCodeScanner handleScanValue={handleQRCodeData} />
            </div>
            
            {/* Check in History Button */}
            <div className={classes.buttonWrapper}>
                <Button variant="contained" color="secondary" onClick={() => handleRecentCheckInsButtonClick() } className={classes.button}>
                    Recent<br/>Check Ins
                </Button>
            </div>
        </div>
    )
}