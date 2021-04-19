import { useState } from 'react';
import usersService from '../../services/users-service';
import { Link } from 'react-router-dom'

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
    await fetchUsers(event.target.value);
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
  console.log(users, displayUsers)
  return (
    <div>
      <div className="mb-3 row">
        <div className="col-sm-10">
          <input type="text" className="form-control" id="search" onChange={handleSearch} />
        </div>
      </div>
      {displayUsers
        ? <div className="bg-light" style={{ height: 100, position: 'relative', zIndex: 999 }}>
          {users.users.map(user => (
            <Link to={`/${user.username}`} onClick={handleDisplayUsers} className="row">
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
