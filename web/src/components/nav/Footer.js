import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer row m-0 bg-light" style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw' }}>
      <Link to="/" className="col border d-flex justify-content-center align-items-center py-2">
        <i class="fas fa-home text-dark"></i>
      </Link>
      <Link to="/" className="col border d-flex justify-content-center align-items-center py-2">
      <i class="far fa-plus-square text-dark"></i>
      </Link>
    </footer>
  )
}

export default Footer;
