import { useState, useEffect } from 'react'
import assetsService from '../../services/assets-service';
import Asset from './Asset';
// material
import { Grid, Box } from '@material-ui/core';

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

  const { assets } = state;

  return (
    <>
      <Grid
        container spacing={3}
      >
        {assets.map(asset => (
          <Asset key={asset.id} asset={asset} />
        ))}
      </Grid>
    </>
  )
}

export default AssetsFeed;
