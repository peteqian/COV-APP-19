import { React, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, Hidden, Divider } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

//other components
import LogOutButton from '../../Button/LogOutButton/LogOutButton.jsx';
import { DrawItemsList } from './DrawItemsList';

//redux
import { useSelector } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { selectLoginStatus, selectFirstName, selectLastName } from "../../../redux/login/selector";

//custom hooks
import { UserWindowSize } from '../../../hooks/useWindowSize';

const drawerWidth = '260px';

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        width: drawerWidth,
        flexShrink: 0,
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        },
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerContainer: {
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    stayBottom: {
        position: 'fixed',
        bottom: '1%',
        width: 'inherit',
        backgroundColor: 'red'
    },
}));

const stateSelector = createStructuredSelector({
    loginStatus: createSelector(selectLoginStatus, (loginStatus) => loginStatus),
    firstName: createSelector(selectFirstName, (firstName) => firstName),
    lastName: createSelector(selectLastName, (lastName) => lastName),
});

const NavBar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { loginStatus, firstName, lastName } = useSelector(stateSelector);
    const { width } = UserWindowSize();
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerToggle = () => {
        if(width < 600)
            setMobileOpen(!mobileOpen);
    };
    
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div className={classes.drawerContainer}>
            <div className={classes.toolbar} />
            <Divider />
            <DrawItemsList width={width} toogleMobileOpen={() => setMobileOpen(!mobileOpen)} />
            <div className={classes.stayBottom}>
                <LogOutButton drawerWidth={width} />
            </div>
        </div>
      );

    //if not logged in -> don't display the navbar
    if(!loginStatus){
        return <></>;
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {`Hi! ${firstName} ${lastName}`}
                    </Typography>
                </Toolbar>
            </AppBar>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                {/* <Hidden smUp implementation="css"> */}
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    className={classes.drawer}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Toolbar />
                    {drawer}
                </Drawer>
                {/* </Hidden> */}
                <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                >
                    <Toolbar />
                    {drawer}
                </Drawer>
                </Hidden>
        </div>
    )
}

export default withRouter(NavBar);