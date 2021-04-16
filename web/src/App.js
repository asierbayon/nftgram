import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthStore from './contexts/AuthStore';
import Feed from './screens/Feed';
import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <AuthStore>
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:username" component={Profile} />
        </Switch>
      </AuthStore>
    </Router>
  );
}

export default App;
