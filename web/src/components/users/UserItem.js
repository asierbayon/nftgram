import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Avatar,
  Typography,
} from '@material-ui/core';

// ------------------------------------------------------

export default function UserItem({ user }) {
  return (
    <Box sx={{ '&:not(:first-of-type)': { mt: 3 } }} >
      <RouterLink>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:not(:first-of-type)': { mt: 3 }
          }}
        >
          <Avatar alt={user.fullName} src={user.avatar} />
          <Box sx={{ ml: 2 }}
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ color: 'text.primary', fontWeight: 'fontWeightBold', width: '100%' }}
            >
              {user.fullName}
            </Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary'
              }}
            >
              {user.username}
            </Typography>
          </Box>
        </Box>
      </RouterLink>
    </Box>
  );
}
