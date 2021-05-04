import React from "react";
import Grid from '@material-ui/core/Grid';

//icons
import NotificationIcon from '../../assets/icons/NotificationIcon/NotificationIcon';
import EmployeeIcon from '../../assets/icons/EmployeeIcon/EmployeeIcon';
import SignIntoWork from '../../assets/icons/SignIntoWorkIcon/SignIntoWorkIcon';
import SettingIcon from '../../assets/icons/SettingIcon/SettingIcon';
import QRCodeIcon from '../../assets/icons/QRCode/QRCodeIcon';

//components
import HomePageSelectorButton from '../../components/Button/HomePageSelectorButton/HomePageSelectorButton.jsx';

const HomePage = props => {
  const xs = 6;
  return (
    <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
      <Grid item xs={xs}>
        <HomePageSelectorButton text='Notifications' icon={<NotificationIcon />} url='/notification' />
      </Grid >
      <Grid item xs={xs}>
        <HomePageSelectorButton text='Employee' icon={<EmployeeIcon /> } url='/employee' />
      </Grid >
      <Grid item xs={xs}>
        <HomePageSelectorButton text='Sigin Into Work' icon={<SignIntoWork />} url='/sign_into_work' />
      </Grid >
      <Grid item xs={xs}>
        <HomePageSelectorButton text='Settings' icon={<SettingIcon />} url='/setting' />
      </Grid >
      <Grid item xs={xs}>
        <HomePageSelectorButton text='QR Code' icon={<QRCodeIcon />} url='/qr_code' />
      </Grid >
      {/* Used to keep item in last row to the left */}
      <Grid item xs={xs}></Grid> 
    </Grid>
  )
};

export default HomePage;