// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
// components
import Searchbar from '../search-bar/SearchBar';


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
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Navbar() {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Searchbar />
      </ToolbarStyle>
    </RootStyle>
  );
}
