import { useState, useEffect } from 'react';
import usersService from '../services/users-service';
import { useParams } from 'react-router';

function Profile() {

  const params = useParams();

  const [state, setstate] = useState({
    user: {},
    assets: [],
    loading: false
  });

  useEffect(() => {
    async function fetchAssets() {
      setstate(state => ({
        ...state,
        loading: true
      }));
      const { username } = params;
      const user = await usersService.user(username);
      if (!isUnmounted) {
        setstate({
          user: user.user,
          assets: user.assets,
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

  const { user, assets } = state;
  if (user.website) user.displayUrl = user.website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  console.log(assets)

  return (
    <div className="d-flex flex-column align-items-center">
      <h5 className="py-3">{user.username}</h5>
      <div style={{ width: 400 }}>
        <div className="row d-flex align-items-center mb-3">
          <img className="col-3 rounded-circle me-5" src={user.avatar} alt={user.username} />
          <div className="row col">
            <div className="col text-center">
              <h5>{assets.length}</h5>
              <small className="text-muted">posts</small>
            </div>
            <div className="col text-center">
              <h5>{user.followersCount}</h5>
              <small className="text-muted">followers</small>
            </div>
            <div className="col text-center">
              <h5>{user.followingCount}</h5>
              <small className="text-muted">following</small>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h6>{user.fullName}</h6>
          <p><small className="text-muted">{user.bio}</small></p>
          <a target="_blank" rel="nofollow" href={user.website}>{user.displayUrl}</a>
        </div>
        <div className="row">
          <button className="btn btn-primary col">Follow</button>
        </div>
        <div className="mt-5 row row-cols-3 g-0">
          {assets.map(asset => (
            <img key={asset.id} src={asset.image} alt={asset.title} style={{ objectFit: 'cover' }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile;
