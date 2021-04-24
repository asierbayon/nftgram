import SearchBar from '../search-bar/SearchBar';
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <nav className="navbar bg-light w-100" style={{ boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', padding: '20px 0', borderRadius: 20, position: 'fixed', top: 0, zIndex: 99 }}>
      <div className="container">
        <ul className="navbar-nav">
          <Link to="/">
            <h5 className="ms-2 text-dark" style={{ fontWeight: 900 }}>
              <i className="fas fa-camera-retro me-2"></i>
              Nft<span className="text-primary">gram</span>
            </h5>
          </Link>
        </ul>
        <div className="me-2" style={{ width: 150 }}>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
