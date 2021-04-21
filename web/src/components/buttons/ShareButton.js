import React, { useState } from 'react'

function ShareButton({ id }) {

  const [state, setstate] = useState({
    urlCopied: false
  })

  const copyLinkToClipboard = () => {
    const url = document.createElement('textarea');
    url.innerText = `http://localhost:3000/assets/${id}`;
    document.body.appendChild(url);
    url.select()
    document.execCommand("copy")
    url.remove();
    setstate(state => ({
      urlCopied: true
    }))
  }

  return (
    <div className="border rounded-pill px-4 py-2 cursor-pointer" onClick={copyLinkToClipboard}>
      <h6 className="text-muted">
        Share
        <i class="fas fa-share-alt ms-3"></i>
      </h6>
    </div>
  )
}

export default ShareButton
