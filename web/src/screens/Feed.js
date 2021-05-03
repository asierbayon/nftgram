import AssetsFeed from '../components/assets/AssetsFeed';
import { AuthContext } from '../contexts/AuthStore';
import { useContext } from 'react';
import Navbar from '../components/nav/Navbar';

function Feed() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  return (
    <>
    <Navbar />
    {currentUser && currentUser.username}
      {/* <AssetsFeed /> */}
    </>
  );
}

export default Feed;