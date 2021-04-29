import { React, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, Hidden, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter, NavLink } from "react-router-dom";

//Icons
import NotificationIcon from '../../../assets/icons/NotificationIcon/NotificationIcon';
import EmployeeIcon from '../../../assets/icons/EmployeeIcon/EmployeeIcon';
import SignIntoWork from '../../../assets/icons/SignIntoWorkIcon/SignIntoWorkIcon';
import SettingIcon from '../../../assets/icons/SettingIcon/SettingIcon';
import QRCodeIcon from '../../../assets/icons/QRCode/QRCodeIcon';

//other components
import LogOutButton from '../../Button/LogOutButton/LogOutButton.jsx';

//redux
import { useSelector } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { selectLoginStatus, selectFirstName, selectLastName } from "../../../redux/login/selector";

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
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    stayBottom: {
        position: 'fixed',
        bottom: '1%',
        width: 'inherit',
    },
    logOutButton: {
        width: `calc(${drawerWidth} - 60%)`,
    }
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

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const itemList = [
        {
            text: "Notifications",
            icon: <NotificationIcon />,
            url: "/notification",
        },
        {
            text: "Employees",
            icon: <EmployeeIcon />,
            url: "/employee",
        },
        {
            text: "Sign into Work",
            icon: <SignIntoWork />,
            url: "/sign_into_work",
        },
        {
            text: "Setting",
            icon: <SettingIcon />,
            url: "/setting",
          },
        {
            text: "QR Code",
            icon: <QRCodeIcon />,
            url: "/qr_code",
        }
      ];

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {itemList.map((item, index) => {
                    const { text, icon, url } = item;
                    return (
                        <NavLink to={url} key={text}> 
                            <ListItem button onClick={handleDrawerToggle}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                        </NavLink>
                    );
                })}
            </List>

            <div className={classes.stayBottom}>
                <LogOutButton drawerWidth={drawerWidth} />
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
            {/* <nav className={classes.drawerContainer} aria-label="mailbox folders"> */}
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
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
                    // classes={{
                    //     paper: classes.drawerPaper,
                    // }}
                >
                    <Toolbar />
                    {drawer}
                </Drawer>
                </Hidden>
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
            {/* </nav> */}
        </div>
    )
}

export default withRouter(NavBar);