import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthStore';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  TextField,
  CardContent,
  Button
} from '@material-ui/core';
// hooks
import UploadAvatar from './UploadAvatar';
// services
import { update } from '../../../services/users-service';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)({
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  borderRadius: '1rem'
});

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { currentUser, onUserChange } = useContext(AuthContext);

  const UpdateUserSchema = Yup.object().shape({
    fullName: Yup.string()
      .max(50, 'Your name is too long')
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bio: Yup.string().max(150, 'Your biography is too long'),
    website: Yup.string().url('Invalid website URL'),
  });

  const { handleSubmit, setError, setValue, formState: { errors }, control } = useForm({
    resolver: yupResolver(UpdateUserSchema),
    mode: 'onBlur',
    defaultValues: currentUser,
  });
  const onSubmit = async (values) => {
    try {
      const updatedUser = await update({
        fullName: values.fullName,
        email: values.email,
        website: values.website,
        ethAddress: values.ethAddress,
        bio: values.bio,
      });
      onUserChange(updatedUser)
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CardStyle>
            <Box
              sx={{
                my: 10,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <UploadAvatar
                name="avatar"
                value={currentUser.avatar}
                onChange={(value) => setValue('avatar', value)}
              />
            </Box>
          </CardStyle>
        </Grid>

        <Grid item xs={12} md={8}>
          <CardStyle>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    disabled
                    label="Username"
                    value={currentUser.username}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Full name"
                        {...field}
                        error={Boolean(errors.fullName?.message)}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Email Address"
                        {...field}
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Website"
                        {...field}
                        error={Boolean(errors.website?.message)}
                        helperText={errors.website?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="ethAddress"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Ethereum address"
                        {...field}
                        error={Boolean(errors.ethAddress?.message)}
                        helperText={errors.ethAddress?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={4}
                        label="Bio"
                        {...field}
                        error={Boolean(errors.bio?.message)}
                        helperText={errors.bio?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button
                  type="submit"
                  variant="contained"
                >
                  Save Changes
                  </Button>
              </Box>
            </CardContent>
          </CardStyle>
        </Grid>
      </Grid>
    </form >
  );
}
