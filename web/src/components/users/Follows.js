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

  useEffect(() => {
    async function fetchFollowing() {
      setstate(state => ({
        ...state,
        loading: true,
      }));
      const { username } = params;

      let users;
      if (usersToDisplay === 'Following') users = await userService.following(username)
      else users = await userService.followers(username)
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
  }, [params, usersToDisplay])

  const { users } = state;

  return (
    <div className="mt-4">
      <div className="position-relative">
        <h4 className="fw-bold text-center">{usersToDisplay}</h4>
        <i className="fas fa-arrow-left position-absolute top-50 start-0 translate-middle ms-3" onClick={handleShowFollows}></i>
      </div>
      <div className="d-flex justify-content-center">
        <div className="mt-4">
          {users.map(user => (
            <UserCard key={user.id} user={user.user || user.following} handleFollow={handleFollow}
              amIFollowing={user.amIFollowing} handleShowFollows={handleShowFollows} className="mb-2" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Follows;
