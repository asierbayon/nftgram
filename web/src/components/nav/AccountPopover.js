import { Icon } from '@iconify/react';
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import personFill from '@iconify-icons/eva/person-fill';
import settings2Fill from '@iconify-icons/eva/settings-2-fill';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar } from '@material-ui/core';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// services
import { logout } from '../../services/users-service';
// components
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

export default function AccountPopover({ user }) {

  const history = useHistory();
  const anchorRef = useRef(null);
  const { onUserChange } = useContext(AuthContext);
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);

  const MENU_OPTIONS = [
    {
      label: 'Profile',
      icon: personFill,
      linkTo: `/${user.username}`
    },
    {
      label: 'Settings',
      icon: settings2Fill,
      linkTo: `/${user.username}/edit`
    }
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      onUserChange(undefined);
      if (isMountedRef.current) {
        history.push('/login');
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Avatar
        ref={anchorRef}
        alt={user.fullName}
        src={user.avatar}
        onClick={handleOpen}
        sx={{
          cursor: 'pointer',
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      />
      <MenuPopover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        sx={{
          mt: 1,
          width: 220,
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap fontWeight="fontWeightBold">
            {user.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.fullName}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{ textTransform: 'none', fontWeight: 'fontWeightBold', borderRadius: '10px' }}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
