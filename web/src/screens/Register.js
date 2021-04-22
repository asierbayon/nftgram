import { Link } from 'react-router-dom';
import RegisterForm from '../components/users/RegisterForm';

function Register() {
  return (
    <div className="row" style={{ marginTop: '80px' }}>
    <div className="col-12 col-sm-4 mx-auto">
      <div className="py-2">
        <h3>Sign up</h3>
        <p>Enter your details below.</p>
      </div>
      <RegisterForm />
      <div className="text-center">
        <h6>Already have an account? <Link to="/login">Login</Link></h6>
      </div>
    </div>
  </div>
  );
}

export default Register;