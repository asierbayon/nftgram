import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { login } from "../../services/users-service";
import { AuthContext } from '../../contexts/AuthStore';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'A valid email is required';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'the email is invalid';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Password is required';
    }
    return message;
  }
}


function LoginForm() {
  const { onUserChange } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();


  const [state, setState] = useState({
    user: {
      email: location.state?.email || '',
      password: ''
    },
    errors: {
      email: validations.email(),
      password: validations.password()
    },
    touch: {}
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      user: {
        ...state.user,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  }

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid()) {
      try {
        const user = await login(state.user.email, state.user.password);
        onUserChange(user);
        history.push('/');
      } catch (error) {
        const { message, errors } = error.response ? error.response.data : error;
        console.error(message);
        setState(state => ({
          ...state,
          errors: errors
        }))
      }
    }
  }

  const { user, errors, touch } = state;

  return (
    <form className="mt-3 mb-3" onSubmit={handleSubmit} >

      <div className="form-floating mb-3">
        <input type="email" id="email" placeholder="name@example.com"
          name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`}
          onChange={handleChange} onBlur={handleBlur} value={user.email} />
        <label htmlFor="email">Email address</label>
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="form-floating mb-3">
        <input type="password" id="password" name="password"
          className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`}
          placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={user.password} />
        <label htmlFor="password">Password</label>
        <div className="invalid-feedback">{errors.password}</div>
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit">Login</button>
      </div>

    </form>
  );
}

export default LoginForm;