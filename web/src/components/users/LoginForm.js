import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
// material
import {
  Box,
  Link,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert
} from '@material-ui/core';
import { Button } from '@material-ui/core';
// services
import { login } from '../../services/users-service';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const history = useHistory();
  const { onUserChange } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(LoginSchema)
  });
  const onSubmit = async (values) => {
    try {
      const user = await login({
        email: values.email,
        password: values.password
      });
      onUserChange(user);
      history.push('/');
    } catch (error) {
      const { errors } = error.response.data;
      setError('onSubmit', {
        type: 'manual',
        message: errors.onSubmit
      })
    }
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      {
        errors.onSubmit?.message &&
        <Alert severity="error">{errors.onSubmit?.message}</Alert>
      }

      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label="Email address"
          {...register('email')}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          sx={{ my: 3 }}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <FormControlLabel
            control={
              <Checkbox />
            }
            label="Remember me"
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="#"
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </form>
    </>
  );
}
