import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { NavLink } from "react-router-dom";

const HomePageSelectorButton = (props) => {
    const { text, icon, url } = props;

    const useStyles = makeStyles({
        root: {
            justifyItems: 'center',
            width: '65%',
            padding: '5%',
        },
        card: {
            width: '100%',
            justifyContent: 'center',
            margin: 'auto',
            padding: '5%',
            boxShadow: '5px 5px #888888',
        },
        text: {
            paddingTop: '4%',
        }
    });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavLink to={url}>
                <Card className={classes.card} variant="outlined">
                    <CardContent className={classes.cardContent}>
                        {icon}
                    </CardContent>
                </Card>
                <Typography className={classes.text} variant="body1" component="p" align='center'>
                    {text}
                </Typography>
            </NavLink>
        </div>
    )
}

export default HomePageSelectorButton;