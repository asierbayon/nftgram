import { useState } from 'react';
import usersService from '../../services/users-service';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import UserChip from '../users/UserChip';

function SearchBar() {

  const [state, setstate] = useState({
    users: [],
    displayUsers: false,
  })

  const fetchUsers = async (input) => {
    const users = await usersService.search(input);
    setstate(state => ({
      ...state,
      users,
      displayUsers: true
    }))
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    if (event.target.value.length > 0) await fetchUsers(event.target.value);
    else setstate({
      users: [],
      displayUsers: false
    })
  }

  const handleDisplayUsers = () => {
    state.displayUsers
      ? setstate(state => ({
        ...state,
        displayUsers: false
      }))
      : setstate(state => ({
        ...state,
        displayUsers: true
      }))
  }

  const { displayUsers, users } = state;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="row">
        <div>
          <ClickAwayListener onClickAway={handleClickAway}>
            <input onClick={handleClick} placeholder="Search users..." type="text" className="form-control"
              id="search" autoComplete="off" onChange={handleSearch} />
          </ClickAwayListener>
        </div>
      </div>
      {displayUsers && open
        ? <div className="border rounded px-3 py-1" style={{ position: 'absolute', zIndex: 999, backgroundColor: 'white' }}>
          {users.users.map(user => (
            <Link to={`/${user.username}`} onClick={() => { handleDisplayUsers(); handleClick() }} className="row">
              <UserChip user={user} />
            </Link>
          ))}
        </div>
        : null
      }
    </div>
  )
}

export default SearchBar
