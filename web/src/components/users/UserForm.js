import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import usersService from '../../services/users-service';
import validator from 'validator';

const validations = {
  fullName: (value) => {
    let message;
    if (!value) {
      message = 'Your full name is required';
    }
    if (value && value.lenght > 50) message = 'Your name is too long';
    return message;
  },
  website: (value) => {
    let message;
    if (value && !validator.isURL(value, { require_protocol: true })) {
      message = 'Enter a valid URL'
    }
    if (value && value.length > 65) message = 'This URL is too long';
    return message;
  },
  bio: (value) => {
    let message;
    if (value && value.length > 150) message = 'Bio is too long';
    return message;
  },
  ethAddress: (value) => {
    let message;
    if (value && !validator.isEthereumAddress(value)) {
      message = 'Enter a valid Ethereum Address'
    }
    return message;
  }
}

function EditProfile({ user: userToEdit = {} }) {

  const history = useHistory();
  const [state, setstate] = useState({
    user: {
      fullName: '',
      website: '',
      bio: '',
      ethAddress: '',
      ...userToEdit
    },
    errors: {
      fullName: validations.fullName(userToEdit.fullName),
      website: validations.website(userToEdit.website),
      bio: validations.bio(userToEdit.bio),
      ethAddress: validations.ethAddress(userToEdit.ethAddress)
    },
    touch: {}
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    /* if (event.target.files) {
      value = event.target.files[0]
    } */

    setstate(state => {
      return {
        ...state,
        user: {
          ...state.user,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value),
        }
      }
    });
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setstate(state => ({
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
        const userData = { ...state.user };
        const user = await usersService.update(userData);
        history.push(`/${user.username}`);
      } catch (error) {
        const { message, errors } = error.response?.data || error;

        setstate(state => ({
          ...state,
          errors: {
            ...errors,
            title: !errors && message
          },
          touch: {
            ...errors,
            title: !errors && message
          }
        }));
      }
    }
  }

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const { user, errors, touch } = state;
  console.log(user)
  return (
    <div className="row row-cols-1 mt-4">
      <div className="col text-center mb-4">
        <img className="img-fluid w-25" src={user.avatar} alt={user.username} onError={(event) => event.target.src = 'https://via.placeholder.com/800x400'} />
      </div>
      <div className="col">
        <form onSubmit={handleSubmit}>

          <div className="form-floating mb-3">
            <input type="text" name="fullName" id="fullName" className={`form-control ${touch.fullName && errors.fullName ? 'is-invalid' : ''}`}
              placeholder="Full name" onBlur={handleBlur} onChange={handleChange} value={user.fullName} />
            <label htmlFor="fullName">Full name</label>
            <div className="invalid-feedback">{errors.fullName}</div>
          </div>

          <div className="form-floating mb-3">
            <input type="url" name="website" id="website" className={`form-control ${touch.website && errors.website ? 'is-invalid' : ''}`}
              placeholder="Website" onBlur={handleBlur} onChange={handleChange} value={user.website} />
            <label htmlFor="website">Website</label>
            <div className="invalid-feedback">{errors.website}</div>
          </div>

          <div class="form-floating mb-3">
            <textarea name="bio" id="bio" className={`form-control ${touch.website && errors.website ? 'is-invalid' : ''}`} onChange={handleChange} onBlur={handleBlur} value={user.bio} placeholder="Bio..." id="bio" style={{ height: 100 }}></textarea>
            <label for="bio">Bio</label>
            <div className="invalid-feedback">{errors.bio}</div>
          </div>

          <div className="form-floating mb-3">
            <input type="text" name="ethAddress" id="ethAddress" className={`form-control ${touch.ethAddress && errors.ethAddress ? 'is-invalid' : ''}`}
              placeholder="Ethereum Address" onBlur={handleBlur} onChange={handleChange} value={user.ethAddress} />
            <label htmlFor="ethAddress">Ethereum Address</label>
            <div className="invalid-feedback">{errors.ethAddress}</div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              <span>Update User</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default EditProfile;