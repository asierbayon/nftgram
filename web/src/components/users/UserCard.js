import React from 'react'
import { Link } from 'react-router-dom'
import FollowButton from '../buttons/FollowButton'

function UserCard({ user, amIFollowing, className, handleShowFollows, handleFollow }) {
  console.log('user', user)
  return (
    <div className={`row py-3 ${className}`}>
      <Link to={`/${user.username}`} onClick={handleShowFollows} className="col-8">
        <div className="row">
          <div className="col-4 d-flex align-items-center justify-content-center">
            <img src={user.avatar} alt={user.username} className="rounded-circle" style={{ height: 35 }} />
          </div>
          <div className="col d-flex flex-column">
            <p className="text-muted">{user.fullName}</p>
            <h6>{user.username}</h6>
          </div>
        </div>
      </Link>
      {handleShowFollows && 
      <FollowButton isFollowing={amIFollowing} user={user} handleFollow={handleFollow} className="col me-2" />}
    </div>
  )
}

export default UserCard
