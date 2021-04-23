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
    <div class={`btn-group ${className}`}>
      <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-ellipsis-h"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button onClick={copyLinkToClipboard} class="dropdown-item" type="button">Copy URL</button></li>
      </ul>
    </div>
  )
}

export default ShareButton
