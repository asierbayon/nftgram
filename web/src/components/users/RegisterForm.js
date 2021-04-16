import { useState } from 'react';
import { useHistory } from 'react-router';
import { register } from '../../services/users-service';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const validations = {
  fullName: (value) => {
    let message;
    if (!value) {
      message = 'Your full name is required';
    }
    return message;
  },
  username: (value) => {
    let message;
    if (!value) {
      message = 'A username is required';
    }
    return message;
  },
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
      message = 'A valid password is required';
    } else if (!PASSWORD_PATTERN.test(value)) {
      message = 'the password is invalid';
    }
    return message;
  }
}

function RegisterForm() {

  const history = useHistory();
  const [state, setState] = useState({
    user: {
      fullName: '',
      username: '',
      email: '',
      password: ''
    },
    errors: {
      fullName: validations.fullName(),
      username: validations.username(),
      email: validations.email(),
      password: validations.password()
    },
    touch: {}
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      try {
        const { user } = state;
        await register(user);
        history.push('/login', { email: user.email });
      } catch (error) {
        const { message, errors } = error.response ? error.response.data : error;
        console.error(message, error);
        setState(state => ({
          ...state,
          errors
        }))
      }
    }
  }

  const { user, errors, touch } = state;

  return (
    <form className="mt-3 mb-3" onSubmit={handleSubmit}>

      <div className="form-floating mb-3">
        <input type="text" name="fullName" id="fullName" className={`form-control ${touch.fullName && errors.fullName ? 'is-invalid' : ''}`}
          placeholder="Full name" onBlur={handleBlur} onChange={handleChange} value={user.name} />
        <label htmlFor="fullName">Full name</label>
        <div className="invalid-feedback">{errors.fullName}</div>
      </div>

      <div className="form-floating mb-3">
        <input type="text" name="username" id="username" className={`form-control ${touch.username && errors.username ? 'is-invalid' : ''}`}
          placeholder="Username" onBlur={handleBlur} onChange={handleChange} value={user.name} />
        <label htmlFor="username">Username</label>
        <div className="invalid-feedback">{errors.username}</div>
      </div>

      <div className="form-floating mb-3">
        <input type="email" id="email" placeholder="name@example.com"
          name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`}
          onBlur={handleBlur} onChange={handleChange} value={user.email} />
        <label htmlFor="email">Email address</label>
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="form-floating mb-3">
        <input type="password" id="password" name="password"
          className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`}
          placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={user.password} />
        <label htmlFor="password">Password</label>
        <div className="invalid-feedback">{errors.password}</div>
      </div>

      <button className="btn btn-primary w-100 p-2" type="submit" disabled={!isValid()}>Register</button>

    </form>
  );
}

export default RegisterForm;