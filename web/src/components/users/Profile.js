import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import usersService from '../../services/users-service';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Follows from './Follows';

function Profile() {

  const params = useParams();

  const [state, setstate] = useState({
    user: {},
    assets: [],
    isFollowing: false,
    loading: false,
    showFollowing: false,
    usersToDisplay: ''
  });

  useEffect(() => {
    async function fetchUser() {
      setstate(state => ({
        ...state,
        loading: true
      }));
      const { username } = params;
      const user = await usersService.user(username);
      if (!isUnmounted) {
        setstate(state => ({
          ...state,
          user: user.user,
          assets: user.assets,
          isFollowing: user.isFollowing,
          loading: false
        }))
      }
    }

    let isUnmounted = false;
    fetchUser();

    return () => {
      isUnmounted = true;
    }
  }, [params, state.showFollowing])

  const handleFollowers = async () => {
    if (!state.isFollowing) {
      await usersService.follow(user.username)
      state.user.followersCount += 1;
      setstate(state => ({
        ...state,
        user,
        isFollowing: true
      }))
    }
    else {
      await usersService.unfollow(user.username)
      state.user.followersCount -= 1;
      setstate(state => ({
        ...state,
        user,
        isFollowing: false
      }))
    }
  }

  const handleShowFollows = (usersToDisplay) => {
    state.showFollowing
      ? setstate(state => ({
        ...state,
        showFollowing: false,
        usersToDisplay: ''
      }))
      : setstate(state => ({
        ...state,
        showFollowing: true,
        usersToDisplay
      }))
  }

  const { currentUser } = useContext(AuthContext);
  const { user, assets, isFollowing, showFollowing, usersToDisplay } = state;
  if (user.website) user.displayUrl = user.website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

  if (showFollowing) return <Follows handleShowFollows={handleShowFollows} usersToDisplay={usersToDisplay} />
  else {
    return (
      <div className="d-flex flex-column align-items-center">
        <h5 className="py-3">{user.username}</h5>
        <div style={{ width: 400 }}>
          <div className="row d-flex align-items-center mb-3">
            <img className="col-3 rounded-circle me-5" src={user.avatar} alt={user.username} />
            <div className="row col">
              <div className="col text-center">
                <h5>{assets.length}</h5>
                <small className="text-muted">{assets.length !== 1 ? 'posts' : 'post'}</small>
              </div>
              <div onClick={() => handleShowFollows('followers')} className="col text-center text-dark cursor-pointer">
                <h5>{user.followersCount}</h5>
                <small className="text-muted">{user.followersCount !== 1 ? 'followers' : 'follower'}</small>
              </div>
              <div onClick={() => handleShowFollows('following')} className="col text-center text-dark cursor-pointer">
                <h5>{user.followingCount}</h5>
                <small className="text-muted">following</small>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h6>{user.fullName}</h6>
            <p><small className="text-muted">{user.bio}</small></p>
            <a target="_blank" rel="noreferrer nofollow" href={user.website}>{user.displayUrl}</a>
          </div>
          {isFollowing
            ? <button className="btn btn-success w-100" onClick={handleFollowers}>Following</button>
            : (currentUser && currentUser.id === user.id)
              ? <Link to={`/${currentUser.username}/edit`} className="btn btn-dark w-100" >Edit profile</Link>
              : <button className="btn btn-primary w-100" onClick={handleFollowers}>Follow</button>
          }
          <div className="mt-5 row row-cols-3 g-0">
            {assets.map(asset => (
              <Link to={`/asset/${asset.id}`} >
                <img key={asset.id} src={asset.image} alt={asset.title} style={{ width: '100%', objectFit: 'cover' }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

}

export default Profile;
