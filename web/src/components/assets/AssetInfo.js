function AssetInfo({ asset }) {
  const { owner } = asset;
  return (
    <div>
      <h4>{asset.title}</h4>
      <p><a target="_blank" rel="noreferrer" href={`${asset.url}`}>View on OpenSea</a></p>
      <p><a target="_blank" rel="noreferrer" href={`https://etherscan.io/token/${asset.assetContractAddress}?a=${asset.tokenId}`}>View on EtherScan</a></p>
      <div className="row">
        <img src={owner.avatar} alt={owner.username} style={{ maxWidth: 60 }} className="col-3" />
        <div className="col">
          <h6>{owner.username}</h6>
          <small>{owner.fullName}</small>
        </div>
      </div>
    </div>
  )
}

export default AssetInfo;
