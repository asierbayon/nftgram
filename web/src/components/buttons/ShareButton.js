function ShareButton({ id, className }) {

  const copyLinkToClipboard = () => {
    const url = document.createElement('textarea');
    url.innerText = `http://localhost:3000/assets/${id}`;
    document.body.appendChild(url);
    url.select()
    document.execCommand("copy")
    url.remove();
  }

  return (
    <div className={`btn-group ${className}`}>
      <button type="button" className="btn" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fas fa-ellipsis-h"></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><button onClick={copyLinkToClipboard} className="dropdown-item" type="button">Copy URL</button></li>
      </ul>
    </div>
  )
}

export default ShareButton
