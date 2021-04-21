import { useContext } from 'react'
import SearchBar from '../search-bar/SearchBar';
import { AuthContext } from '../../contexts/AuthStore';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function Navbar() {

  const params = useParams();
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid ps-5 pe-5">
        <a className="navbar-brand" href="/">
          <i className="fas fa-camera-retro me-3"></i>
          NFTGram
        </a>
        <SearchBar />
        <ul className="navbar-nav">
          {currentUser
            ? <>
              <div className="me-4">
                <li className="nav-item dropdown user-menu">
                  <a className="nav-link dropdown-toggle" role="button"
                    data-bs-toggle="dropdown">
                    <img className="me-3" src={currentUser.avatar} alt="user avatar" style={{ maxWidth: 20 }} />
                    {currentUser.username}
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={`/${currentUser.username}`}>Profile</Link></li>
                    <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                    <li><Link className="dropdown-item" to="/logout"><i className="comment fas fa-power-off me-2"></i> Logout</Link></li>
                  </ul>
                </li>
              </div>
              <Link className="btn btn-dark ms-3" to="/" role="button">Post an NFT</Link>
            </>
            : <Link class="btn btn-dark ms-3" to="/login" role="button">Log in</Link>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
