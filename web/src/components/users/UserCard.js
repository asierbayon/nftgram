import React from 'react'
import { Link } from 'react-router-dom'
import FollowButton from '../buttons/FollowButton'

function UserCard({ user, amIFollowing, className, handleShowFollows, handleFollow }) {
  console.log('user', user)
  return (
    <Link to={`/${user.username}`} onClick={handleShowFollows}>
      <div className="row">
        <div className="col-4 d-flex align-items-center justify-content-center">
          <img src={user.avatar} alt={user.username} className="rounded-circle border border-primary border-4" style={{ height: 55 }} />
        </div>
        <div className="col d-flex flex-column justify-content-center ms-3">
          <p className="text-muted fw-bold">{user.fullName}</p>
          <h6 className="fw-bold">{user.username}</h6>
        </div>
      </div>
    </Link>
  )
}

export default UserCard
