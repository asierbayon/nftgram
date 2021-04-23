import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import usersService from '../../services/users-service';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import Follows from './Follows';

function Profile() {

  const params = useParams();

  const history = useHistory();

  const handleLogout = async () => {
    await usersService.logout();
    history.push('/login');
  }

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
      <div className="mt-4">
        <div>
          <div className="row d-flex align-items-center mb-3">
            <div className="col-3 ms-2 me-4">
              <img className="border border-primary border-4 rounded-circle" style={{ width: '100%', boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }} src={user.avatar} alt={user.username} />
            </div>
            <div className="row col m-0">
              <div className="col text-center border-end">
                <h5 className="fw-bold">{assets.length}</h5>
                <small className="text-muted">{assets.length !== 1 ? 'posts' : 'post'}</small>
              </div>
              <div onClick={() => handleShowFollows('followers')} className="col text-center text-dark cursor-pointer border-end">
                <h5 className="fw-bold">{user.followersCount}</h5>
                <small className="text-muted">{user.followersCount !== 1 ? 'followers' : 'follower'}</small>
              </div>
              <div onClick={() => handleShowFollows('following')} className="col text-center text-dark cursor-pointer">
                <h5 className="fw-bold">{user.followingCount}</h5>
                <small className="text-muted">following</small>
              </div>
            </div>
          </div>
          <div className="mb-3 mt-4">
            <h6 className="fw-bold mb-1">{user.fullName}</h6>
            <p className="text-muted lh-2 pe-3 mb-2" style={{ fontSize: 14 }}>{user.bio}</p>
            <a target="_blank" rel="noreferrer nofollow" className="fw-bold" href={user.website}>{user.displayUrl}</a>
          </div>
          <div className="row g-2">
            {isFollowing
              ? <button className="btn btn-success w-100 col" style={{ boxShadow: '0px 10px 20px -2px rgba(25,135,84,0.5)' }} onClick={handleFollowers}>Following</button>
              : (currentUser && currentUser.id === user.id)
                ? <>
                  <Link to={`/${currentUser.username}/edit`} style={{ boxShadow: '0px 10px 20px -2px rgba(33,37,41,0.5)' }} className="btn btn-dark w-100 fw-bold col">Edit profile</Link>,
                <button className="btn btn-outline-dark col ms-1 fw-bold"  onClick={handleLogout}>Logout</button>
                </>
                : <button className="btn btn-primary w-100 col" style={{ boxShadow: '0px 10px 20px -2px rgba(10,88,202,0.5)' }} onClick={handleFollowers}>Follow</button>
            }
          </div>
          <div className="mt-5 row row-cols-3 g-0">
            {assets.map(asset => (
              <Link to={`/assets/${asset.id}`} >
                <img key={asset.id} src={asset.image} alt={asset.title} style={{ width: '100%', height: 125, objectFit: 'cover', borderRadius: 5 }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

}

export default Profile;
