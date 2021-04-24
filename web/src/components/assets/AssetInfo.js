import UserCard from '../users/UserCard';

function AssetInfo({ asset }) {
  const { owner } = asset;
  return (
    <div className="p-4" style={{ borderRadius: 10, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px' }}>
      <h4 className="text-overflow fw-bold"><i className="fas fa-info-circle me-2"></i>{asset.title}</h4>
      <div className="d-flex justify-content-center mt-2">
        <div className="mt-2 row w-100">
          <div className="col d-flex align-items-center">
            <UserCard key={owner.id} user={owner} />
          </div>
          <div className="col d-flex flex-column">
            <a className="fw-bold btn btn-outline-dark mb-2" style={{ fontSize: 14 }} target="_blank" rel="noreferrer" href={`${asset.url}`}><i className="fas fa-external-link-alt me-2"></i>OpenSea</a>
            <a className="fw-bold btn btn-outline-dark" style={{ fontSize: 14 }} target="_blank" rel="noreferrer" href={`https://etherscan.io/token/${asset.assetContractAddress}?a=${asset.tokenId}`}><i className="fas fa-external-link-alt me-2"></i>Etherscan</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetInfo;
