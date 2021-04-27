import { Link } from 'react-router-dom';
import LoginForm from '../components/users/LoginForm';

function Login() {
  return (
    <div className="row" style={{ marginTop: '100px' }}>
      <div className="col-12 col-sm-4 mx-auto">
        <div className="py-2">
          <h3 className="fw-bold">Sign in</h3>
          <p>Enter your details below.</p>
        </div>
        <LoginForm />
        <div className="text-center">
          <h6>Don't you have an account? <Link to="/register">Register</Link></h6>
        </div>
      </div>
    </div>
  );
}

export default Login;