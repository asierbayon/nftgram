import { Link } from 'react-router-dom';

function UserChip({ user, className }) {
  console.log(user)
  return (
    <div className={`${className}`}>
      <Link to={`/${user.username}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="d-flex flex-row align-items-center p-2">
          <img src={user.avatar} alt={user.fullName} className="rounded-circle me-3 border border-primary border-2" style={{ width: 30 }} />
          <h6 className="fw-bold">{user.username}</h6>
        </div>
      </Link>
    </div>
  )
}

export default UserChip
