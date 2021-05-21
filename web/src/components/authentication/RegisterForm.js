import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
// material
import { Box, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Button } from '@material-ui/core';
// services
import { register as registerUser } from '../../services/users-service';

// -------------------------------------------------------------------------

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .max(50, 'Your name is too long')
      .required('Full name is required'),
    username: Yup.string()
      .min(3, 'Your username is too short')
      .max(35, 'Your username is too long')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RegisterSchema)
  });
  const onSubmit = async (values) => {
    try {
      await registerUser({
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password
      });
    }
    catch (error) {
      const keys = Object.keys(error.response.data.errors);
      const values = Object.values(error.response.data.errors);

      for (let i = 0; i < keys.length; i++) {
        setError(keys[i], {
          type: 'manual',
          message: values[i]
        })
      }
    }
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="Full name"
        {...register('fullName')}
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
      />

      <TextField
        fullWidth
        autoComplete="username"
        type="text"
        label="Username"
        {...register('username')}
        error={Boolean(errors.username?.message)}
        helperText={errors.username?.message}
        sx={{ my: 3 }}
      />

      <TextField
        fullWidth
        autoComplete="email"
        type="email"
        label="Email address"
        {...register('email')}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        autoComplete="current-password"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        {...register('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              </IconButton>
            </InputAdornment>
          )
        }}
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
      />
      <Box sx={{ mt: 3 }}>
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Register
        </Button>
      </Box>
    </form>
  )
}
