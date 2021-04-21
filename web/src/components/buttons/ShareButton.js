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
    setstate(({
      urlCopied: true
    }))
    setTimeout(() => {
      setstate({
        urlCopied: false
      });
    }, 2000);
  }
  
  return (
    <div className="border rounded-pill px-4 py-2 cursor-pointer" onClick={copyLinkToClipboard}>
      <h6 className="text-muted">
        {state.urlCopied ? 'URL copied!' : 'Share'}
        <i class="fas fa-share-alt ms-3"></i>
      </h6>
    </div>
  )
}

export default ShareButton
