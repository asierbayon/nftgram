import React from 'react'

function ViewOnExternalButton({ className, assetContractAddress, tokenId, url }) {
  return (
    <div className={`btn-group ${className}`}>
      <button type="button" className="btn" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-eye"></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-end px-3">
        <li><a target="_blank" rel="noreferrer" className="text-dark" href={`${url}?ref=0xb79786b11fa27df856ba58fb9f8f2cfa2f790522`}>OpenSea</a></li>
        <li><a target="_blank" rel="noreferrer" className="text-dark" href={`https://etherscan.io/token/${assetContractAddress}?a=${tokenId}`}>Etherscan</a></li>
      </ul>
    </div>
  )
}

export default ViewOnExternalButton
