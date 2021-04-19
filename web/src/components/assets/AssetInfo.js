import React from 'react'

function AssetInfo({ asset }) {
  const { owner } = asset;
  return (
    <div>
      <h4>{asset.title}</h4>
      <p><a target="_blank" href={`${asset.url}`}>View on OpenSea</a></p>
      <img src={owner.avatar} alt={owner.username} style={{ width: 40 }}/>
      <h6>{owner.username}</h6>
      <small>{owner.fullName}</small>

    </div>
  )
}

export default AssetInfo;
