import { Link } from 'react-router-dom'

function UserCard({ user, handleShowFollows, className }) {
  return (
    <div className={`${className}`}>
      <Link to={`/${user.username}`} onClick={handleShowFollows}>
        <div className="row">
          <div className="col-4 d-flex align-items-center justify-content-center">
            <img src={user.avatar} alt={user.username} className="rounded-circle border border-primary border-4" style={{ height: 55 }} />
          </div>
          <div className="col d-flex flex-column justify-content-center" style={{ width: 160 }}>
            <p className="text-muted fw-bold text-overflow">{user.fullName}</p>
            <h6 className="fw-bold">{user.username}</h6>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default UserCard
