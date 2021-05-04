import {List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import { NavLink } from "react-router-dom";
import { UserTypes } from "../../../constants/userTypes";

//Icons
import NotificationIcon from '../../../assets/icons/NotificationIcon/NotificationIcon';
import EmployeeIcon from '../../../assets/icons/EmployeeIcon/EmployeeIcon';
import SignIntoWork from '../../../assets/icons/SignIntoWorkIcon/SignIntoWorkIcon';
import SettingIcon from '../../../assets/icons/SettingIcon/SettingIcon';
import QRCodeIcon from '../../../assets/icons/QRCode/QRCodeIcon';

//redux
import { useSelector } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { selectUserType, } from "../../../redux/login/selector";

const stateSelector = createStructuredSelector({
    currentUserType: createSelector(selectUserType, (userType) => userType),
});

export const DrawItemsList = (props) => {
    const { width, toogleMobileOpen} = props;
    const { currentUserType } = useSelector(stateSelector);

    const handleDrawerToggle = () => {
        if(width < 600)
            toogleMobileOpen();
    };

    const itemList = getListByType(currentUserType);
    
    return (
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
    );
};

const getListByType = (currentUserType) => {
    switch(currentUserType){
        case UserTypes.GeneralUser:
            return generalUserItemList;
        case UserTypes.BusinessUser:
            return businessUserItemList;
        default:
            return [];
    }
}

const generalUserItemList = [
    {
        text: "Check in",
        icon: <NotificationIcon />,
        url: "/checkin",
    },
    {
        text: "QR Scan",
        icon: <NotificationIcon />,
        url: "/qr-scan",
    },
];

const businessUserItemList = [
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