// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// React
import { useState } from "react";

// Custom Components
import { LocationCheckInHistory } from "../../../components/LocationCheckInHistory";

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
}));

export const CheckInHistoryPage = (props) => {
    const classes = useStyles();
    const [locations, setLocations] = useState([
        {name: 'place1', date: '4/May', time:'1am'},
        {name: 'place2', date: '4/May', time:'5am'},
        {name: 'place3', date: '4/May', time:'8am'},
    ]);

    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <Typography variant="h5" component="h1" gutterBottom align="left">
                    Check in History
                </Typography>
            </div>

            {/* location Check in history */}
            {
                locations.map((location, index) => 
                    <LocationCheckInHistory placeName={location.name} date={location.date} time={location.time} />
                )
            }
        </div>
    )
}