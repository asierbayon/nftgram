import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
