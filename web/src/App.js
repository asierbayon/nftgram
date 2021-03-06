import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './screens/authentication/Login';
import Register from './screens/authentication/Register';
import AuthStore from './contexts/AuthStore';
import Feed from './screens/Feed';
import User from './screens/User';
import SingleAsset from './screens/SingleAsset';
import EditProfile from './screens/EditProfile';
import Footer from './components/nav/Footer';
import UploadAsset from './screens/UploadAsset';
import Error from './screens/Error';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme/theme';
import ResetPassword from './screens/authentication/ResetPassword';
import Settings from './screens/Settings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthStore>
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/:username" component={User} />
            <Route exact path="/assets/upload" component={UploadAsset} />
            <Route exact path="/assets/:id" component={SingleAsset} />
            <Route exact path="/:username/edit" component={Settings} />
            {/* <Route exact path="/404" component={() => <Error code={404} />} />
            <Route exact path="/403" component={() => <Error code={403} />} /> */}

            <Redirect to="/" />
          </Switch>
          <Footer />
        </AuthStore>
      </Router>
    </ThemeProvider>
  );
}

export default App;
