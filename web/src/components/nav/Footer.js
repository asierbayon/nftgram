import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';

function Footer() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  return (
    <div className="d-flex justify-content-center">
      <footer className="row glass rounded-pill" style={{ position: 'fixed', bottom: 20, width: '50vw', boxShadow: '2px -10px 50px 3px rgba(0,0,0,0.13)' }}>
        <Link to="/" className="col d-flex justify-content-center align-items-center py-3">
          <i className="fas fa-home text-dark fs-5"></i>
        </Link>
        <Link to="/assets/upload" className="col d-flex justify-content-center align-items-center py-3">
          <i className="far fa-plus-square text-dark fs-5"></i>
        </Link>
        <Link to={`/${currentUser.username}`} className="col d-flex justify-content-center align-items-center py-3">
          <i className="fas fa-user-circle text-dark fs-5"></i>
        </Link>
      </footer>
    </div>
  )
}

export default Footer;
