import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Asset from '../components/assets/Asset';
import AssetInfo from '../components/assets/AssetInfo';
import assetsService from '../services/assets-service';

function SingleAsset() {

  const params = useParams();

  const [state, setstate] = useState({
    asset: {},
    user: {},
    loading: false
  })

  useEffect(() => {
    async function fetchAsset() {
      setstate(state => ({
        ...state,
        loading: true
      }));
      const { id } = params;
      const response = await assetsService.asset(id);
      response.asset.owner = response.user;
      if (!isUnmounted) {
        setstate({
          asset: response.asset,
          user: response.user,
          loading: false
        })
      }
    }

    let isUnmounted = false;
    fetchAsset();
    return () => {
      isUnmounted = true;
    }
  }, [params])

  const { asset } = state;

  if (Object.keys(asset).length === 0) {
    return (
      <div>Loading...</div>
    )
  }
  else {
    return (
      <div className="row">
        <div className="col">
          <Asset asset={asset} />
        </div>
        <div className="col">
          <AssetInfo asset={asset} />
        </div>
      </div>
    )
  }
}

export default SingleAsset;
