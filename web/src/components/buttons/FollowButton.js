import { AuthContext } from '../../contexts/AuthStore';
import { useContext, useState } from 'react';
import usersService from '../../services/users-service';

function FollowButton({ isFollowing, user, className }) {

  const [state, setstate] = useState({
    isFollowing
  })

  const handleFollowings = async () => {
    if (state.isFollowing) {
      await usersService.unfollow(user.username)
      setstate({ isFollowing: false })
    } else {
      await usersService.follow(user.username)
      setstate({ isFollowing: true })
    }
  }

  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className={`${className}`}>
      {state.isFollowing
        ? <button className="btn btn-success w-100" onClick={handleFollowings}>Following</button>
        : (currentUser && currentUser.id === user.id)
          ? <button className="btn btn-dark w-100" >Edit profile</button>
          : <button className="btn btn-primary w-100" onClick={handleFollowings}>Follow</button>
      }
    </div>
  )
}

export default FollowButton;
