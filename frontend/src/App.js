// Material UI
import { makeStyles } from "@material-ui/core/styles";

// Custom Components
import NavBar from './components/Layout/NavBar/NarBar';
import PrivateRoute from "./authentication/PrivateRoute/PrivateRoute";

// React
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Authencation Pages
import { LoginPage } from "./pages/generalPages/loginPage";
import { SignUpPage } from "./pages/generalPages/signUpPages";
import { AccountCreationConfirmationPage } from "./pages/generalPages/accountCreationConfirmationPage";

// General User Pages
import { ProvidePersonalDetailsForCheckInPage } from './pages/normalUserPages/LocationCheckInPages/ProvidePersonalDetailsForCheckInPage';
import { CheckInConfirmationPage } from "./pages/normalUserPages/LocationCheckInPages/CheckInConfirmationPage";
import { QRCodeScannerPage } from "./pages/normalUserPages/QRCodeScannerPage";
import { CheckInHistoryPage } from "./pages/normalUserPages/CheckInHistoryPage";

// Business User Pages
import HomePage from './pages/businessUsersPages/HomePage.jsx';

// import NotificationPage from './pages/businessUsersPages/NotificationPage.jsx';
// import EmployeePage from './pages/businessUsersPages/EmployeePage.jsx';
// import SignIntoWorkPage from './pages/businessUsersPages/SignIntoWorkPage.jsx';
// import SettingPage from './pages/businessUsersPages/SettingPage.jsx';
// import QRCodePage from './pages/businessUsersPages/QRCodePage.jsx';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  pageWithNavbarContainer: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '260px',
    }
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      

      <BrowserRouter>
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/login" render={props => <LoginPage {...props} />} />
            <Route exact path="/signup" render={props => <SignUpPage {...props} />} />
            <Route exact path="/account-creation-confirmation" render={props => <AccountCreationConfirmationPage {...props} />} />

            {/* Anything that sees the navbar needs to be within this div for correct styling
                so it does not hide behind the navbar on big screen. (anything that needs to be logged in for)
            */}
            <div className={classes.pageWithNavbarContainer}>
              {/* Can only access if the user if logged in */}
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/qr-scan" component={QRCodeScannerPage} />
              <PrivateRoute exact path="/checkin" component={ProvidePersonalDetailsForCheckInPage} />
              <PrivateRoute exact path="/checkin-confirmation" component={CheckInConfirmationPage} />
              <PrivateRoute exact path="/checkin-history" component={CheckInHistoryPage} />

              {/* Business User Pages */}
              {/* <PrivateRoute exact path="/notification" component={NotificationPage} />
              <PrivateRoute exact path="/employee" component={EmployeePage} />
              <PrivateRoute exact path="/sign_into_work" component={SignIntoWorkPage} />
              <PrivateRoute exact path="/setting" component={SettingPage} />
              <PrivateRoute exact path="/qr_code" component={QRCodePage} /> */}
            </div>
            
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
