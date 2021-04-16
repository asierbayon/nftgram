import { useState, useEffect } from 'react'
import assetsService from '../../services/assets-service';
import Asset from './Asset';

function AssetsFeed() {

  const [state, setstate] = useState({
    assets: [],
    loading: false
  });

  useEffect(() => {
    async function fetchAssets() {
      setstate(state => ({
        ...state,
        loading: true
      }));
      const assets = await assetsService.feed();
      if (!isUnmounted) {
        setstate({
          assets,
          loading: false
        })
      }
    }

    let isUnmounted = false;
    fetchAssets();

    return () => {
      isUnmounted = true;
    }
  }, [])

  const { assets, loading } = state;

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      Feed
      {assets.map(asset => (
        <div key={asset.id} className="mt-5">
          <Asset asset={asset}/>
        </div>
      ))}
    </div>
  )
}

export default AssetsFeed;
