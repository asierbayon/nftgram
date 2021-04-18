import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import UserCard from './UserCard';
import userService, { follow } from '../../services/users-service';

function Follows({ handleShowFollows, handleFollow }) {
  const params = useParams();

  const [state, setstate] = useState({
    following: [],
    loading: false
  })

  useEffect(() => {
    async function fetchFollowing() {
      setstate(state => ({
        ...state,
        loading: true,
      }));
      const { username } = params;
      const following = await userService.following(username);

      if (!isUnmounted) {
        setstate({
          following,
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

  const { following } = state;

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: 400 }}>
        <i className="fas fa-times" onClick={handleShowFollows}></i>
        {following.map(user => (
          <UserCard key={user.id} user={user.following} handleFollow={handleFollow}
            amIFollowing={user.amIFollowing} handleShowFollows={handleShowFollows} className="mb-2" />
        ))}
      </div>
    </div>
  )
}

export default Follows;
