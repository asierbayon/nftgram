// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({ ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="/static/brand/logo.svg"
      height={40}
      {...other}
    />
  );
}
