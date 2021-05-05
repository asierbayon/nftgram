import { useState, useEffect } from 'react'
import assetsService from '../../services/assets-service';
import Asset from './Asset';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

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
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {assets.map(asset => (
        <Asset
          key={asset.id}
          asset={asset}
          sx={{ mb: 3 }}
        />
      ))}
    </Box>
  )
}

export default AssetsFeed;
