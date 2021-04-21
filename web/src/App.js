import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthStore from './contexts/AuthStore';
import Feed from './screens/Feed';
import User from './screens/User';
import SingleAsset from './screens/SingleAsset';
import Navbar from './components/nav/Navbar';
import EditProfile from './screens/EditProfile';

function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:username" component={User} />
          <Route exact path="/assets/:id" component={SingleAsset} />
          {/* <Route exact path="/:username/edit" component={EditProfile} /> */}
        </Switch>
      </AuthStore>
    </Router>
  );
}

export default App;
