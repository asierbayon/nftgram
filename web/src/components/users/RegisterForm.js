import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
// material
import { Box, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Button } from '@material-ui/core';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// services
import { register } from '../../services/users-service';

// -------------------------------------------------------------------------

export default function RegisterForm() {
  const isMountedRef = useIsMountedRef();
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

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      username: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register({
          fullName: values.fullName,
          email: values.email,
          username: values.username,
          password: values.password
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors(error.response.data.errors);
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full name"
          {...getFieldProps('fullName')}
          error={Boolean(touched.fullName && errors.fullName)}
          helperText={touched.fullName && errors.fullName}
        />

        <TextField
          fullWidth
          autoComplete="username"
          name="username"
          type="text"
          label="Username"
          {...getFieldProps('username')}
          error={Boolean(touched.username && errors.username)}
          helperText={touched.username && errors.username}
          sx={{ my: 3 }}
        />

        <TextField
          fullWidth
          autoComplete="email"
          name="email"
          type="email"
          label="Email address"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
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
      </Form>
    </FormikProvider>
  )
}
