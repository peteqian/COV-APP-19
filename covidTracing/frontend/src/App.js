import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './components/Layout/NavBar/NarBar';

import { LoginPage } from "./pages/generalPages/loginPage";
import HomePage from './pages/businessUsersPages/HomePage.jsx';
import NotificationPage from './pages/businessUsersPages/NotificationPage.jsx';
import EmployeePage from './pages/businessUsersPages/EmployeePage.jsx';
import SignIntoWorkPage from './pages/businessUsersPages/SignIntoWorkPage.jsx';
import SettingPage from './pages/businessUsersPages/SettingPage.jsx';
import QRCodePage from './pages/businessUsersPages/QRCodePage.jsx';

import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "./authentication/PrivateRoute/PrivateRoute";
import { SignUpPage } from "./pages/generalPages/signUpPages";
import { AccountCreationConfirmationPage } from "./pages/generalPages/accountCreationConfirmationPage";

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
              <PrivateRoute path="/" component={HomePage} />
              <PrivateRoute path="/notification" component={NotificationPage} />
              <PrivateRoute path="/employee" component={EmployeePage} />
              <PrivateRoute path="/sign_into_work" component={SignIntoWorkPage} />
              <PrivateRoute path="/setting" component={SettingPage} />
              <PrivateRoute path="/qr_code" component={QRCodePage} />
            </div>
            
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
