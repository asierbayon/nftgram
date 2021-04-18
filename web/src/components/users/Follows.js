import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import UserCard from './UserCard';
import userService from '../../services/users-service';

function Follows({ handleShowFollows, handleFollow, usersToDisplay }) {
  const params = useParams();

  const [state, setstate] = useState({
    users: [],
    loading: false
  })
  console.log(usersToDisplay)
  useEffect(() => {
    async function fetchFollowing() {
      setstate(state => ({
        ...state,
        loading: true,
      }));
      const { username } = params;

      let users;
      if (usersToDisplay === 'following') users = await userService.following(username)
      else users = await userService.followers(username)
      console.log('users', users)
      if (!isUnmounted) {
        setstate({
          users,
          loading: false
        })
      }
    }

    let isUnmounted = false;
    fetchFollowing();

    return () => {
      isUnmounted = true;
    }
  }, [])

  const { users } = state;

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: 400 }}>
        <i className="fas fa-times" onClick={handleShowFollows}></i>
        {users.map(user => (
          <UserCard key={user.id} user={user.user || user.following} handleFollow={handleFollow}
            amIFollowing={user.amIFollowing} handleShowFollows={handleShowFollows} className="mb-2" />
        ))}
      </div>
    </div>
  )
}

export default Follows;
