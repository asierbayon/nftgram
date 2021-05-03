import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify-icons/eva/search-fill';
import closeFill from '@iconify-icons/eva/close-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Input,
  Slide,
  IconButton,
  InputAdornment,
  ClickAwayListener
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// components 
import SearchResults from './SearchResults';
// services
import { search } from '../../services/users-service';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchBarContainerStyle = styled('div')(({ theme }) => ({
  width: '70%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    width: '40%',
  }
}));

const SearchbarStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_MOBILE * 2 / 3,
  padding: theme.spacing(0, 3),
  borderRadius: '1.5rem',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',

  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP / 2,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [input, setInput] = useState('');


  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async (event) => {
    try {
      setInput(event.target.value);
      const result = await search(event.target.value);
      setSearchResult(result)
    }
    catch {
      setSearchResult(false);
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClose} >
      <SearchBarContainerStyle >
        {!isOpen ?
          <IconButton onClick={handleOpen} sx={{ mr: 1 }}>
            <SearchIcon icon={searchFill} sx={{ width: 20, height: 20 }} />
          </IconButton>
          : null
        }

        <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              onChange={handleSearch}
              defaultValue={input}
              autoFocus
              disableUnderline
              fullWidth
              placeholder="Search…"
              sx={{ fontWeight: 'fontWeightBold' }}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={closeFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20, cursor: 'pointer' }}
                    onClick={handleClose}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
          </SearchbarStyle>
        </Slide>
        {isOpen && searchResult && <SearchResults searchResult={searchResult} />}
      </SearchBarContainerStyle>
    </ClickAwayListener>
  );
}
