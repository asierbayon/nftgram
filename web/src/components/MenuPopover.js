// material
import { Popover } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MenuPopover({ children, sx, ...other }) {
  return (
    <Popover
      keepMounted
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          width: 200,
          ...sx
        }
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}
