import UserCard from '../users/UserCard';

function AssetInfo({ asset }) {
  const { owner } = asset;
  return (
    <div className="border pt-3 px-4" style={{ borderRadius: 10 }}>
      <h4 className="text-overflow">{asset.title}</h4>
      <div className="mt-2 d-flex justify-content-between">
        <p>View on:</p>
        <span class="badge rounded-pill bg-dark px-3"><a className="text-white" target="_blank" rel="noreferrer" href={`${asset.url}`}>OpenSea<i class="ms-2 fas fa-external-link-alt"></i></a></span>
        <span class="badge rounded-pill bg-dark px-3"><a className="text-white" target="_blank" rel="noreferrer" href={`https://etherscan.io/token/${asset.assetContractAddress}?a=${asset.tokenId}`}>Etherscan<i class="ms-2 fas fa-external-link-alt"></i></a></span>
      </div>
      <UserCard key={owner.id} user={owner} className="mb-2" />
    </div>
  )
}

export default AssetInfo;
