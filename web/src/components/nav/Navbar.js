import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
// components
import Searchbar from '../search-bar/SearchBar';
import AccountPopover from './AccountPopover';


// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  width: '100vw',
  backgroundColor: 'white',
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Navbar() {

  const { currentUser } = useContext(AuthContext);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Searchbar />
        {currentUser &&
          <AccountPopover user={currentUser} />
        }
      </ToolbarStyle>
    </RootStyle>
  );
}
