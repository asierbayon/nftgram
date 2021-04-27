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
import Footer from './components/nav/Footer';
import UploadAsset from './screens/UploadAsset';
import Error from './screens/Error';

function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <div className="px-3 my-5 py-3">
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/:username" component={User} />
            <Route exact path="/assets/upload" component={UploadAsset} />
            <Route exact path="/assets/:id" component={SingleAsset} />
            <Route exact path="/:username/edit" component={EditProfile} />

            {/* <Route exact path="/404" component={() => <Error code={404} />} />
            <Route exact path="/403" component={() => <Error code={403} />} /> */}

            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </AuthStore>
    </Router>
  );
}

export default App;
