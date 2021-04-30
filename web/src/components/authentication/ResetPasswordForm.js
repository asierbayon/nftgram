import * as Yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// material
import { TextField, Button } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function ResetPasswordForm({ onSent, onGetEmail }) {

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(ResetPasswordSchema)
  });
  const { isSubmitSuccessful } = useFormState({ control });
  const onSubmit = async (values) => {
    try {
      /* const user = await resetPassword({
        email: values.email // TODO
      }); */
      onSent()
      onGetEmail(values.email);
    } catch (error) {
      console.log(error)
    }
  }
  console.log(isSubmitSuccessful)
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        {...register('email')}
        type="email"
        label="Email address"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        sx={{ mb: 3 }}
      />
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        Reset Password
        </Button>
    </form>
  );
}
