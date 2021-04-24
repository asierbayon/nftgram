import ViewOnExternalButton from '../buttons/ViewOnExternalButton';
import UserCard from '../users/UserCard';

function AssetInfo({ asset }) {
  const { owner } = asset;
  return (
    <div className="p-4 mb-5" style={{ borderRadius: 10, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px' }}>
      <h4 className="text-overflow fw-bold"><i className="fas fa-info-circle me-2"></i>{asset.title}</h4>
      <div className="d-flex justify-content-center mt-2">
        <div className="mt-2 d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <UserCard key={owner.id} user={owner} />
          </div>
          <ViewOnExternalButton assetContractAddress={asset.assetContractAddress} tokenId={asset.tokenId} url={asset.url} />
        </div>
      </div>
    </div>
  )
}

export default AssetInfo;
