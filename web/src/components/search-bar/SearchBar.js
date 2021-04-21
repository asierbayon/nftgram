import { useState } from 'react';
import usersService from '../../services/users-service';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
  console.log(open)
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-10">
          <ClickAwayListener onClickAway={handleClickAway}>
            <input onClick={handleClick} placeholder="Search users..." type="text" className="form-control" id="search" autoComplete="off" onChange={handleSearch} />
          </ClickAwayListener>
        </div>
      </div>
      {displayUsers && open
        ? <div className="bg-light" style={{ height: 100, position: 'absolute', zIndex: 999 }}>
          {users.users.map(user => (
            <Link to={`/${user.username}`} onClick={() => { handleDisplayUsers(); handleClick() }} className="row">
              <img src={user.avatar} className="col-3" alt="" style={{ maxWidth: 50 }} />
              <div className="col">
                <p>{user.username}</p>
                <p>{user.fullName}</p>
              </div>
            </Link>
          ))}
        </div>
        : null
      }
    </div>
  )
}

export default SearchBar
