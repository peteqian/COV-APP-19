// Material UI
import { makeStyles } from "@material-ui/core/styles";

//Customer Component
import QrScan from 'react-qr-reader';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        width: '100%',
        margin: 'auto',
    },
}));

export const QRCodeScanner = (props) => {
    const { handleScanValue } = props;
    const classes = useStyles();

    const handleScan = data => {
        if (data) {
            handleScanValue(data);
        }
    }

    const handleError = err => {
        console.error(err);
    }

    return (
        <div className={classes.container}>
            <QrScan
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ height: '100%', width: '100%' }}
            />
      </div>
    )
}