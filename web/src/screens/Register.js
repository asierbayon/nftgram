import { Link } from 'react-router-dom';
import RegisterForm from '../components/users/RegisterForm';

function Register() {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <RegisterForm />
        <hr />
        <div className="d-grid gap-2">
          <Link className="btn btn-secondary" type="button" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;