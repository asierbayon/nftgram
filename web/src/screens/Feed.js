import AssetsFeed from '../components/assets/AssetsFeed';
import { AuthContext } from '../contexts/AuthStore';
import { useContext } from 'react'

function Feed() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  return (
    <>
    {currentUser && currentUser.username}
      {/* <AssetsFeed /> */}
    </>
  );
}

export default Feed;