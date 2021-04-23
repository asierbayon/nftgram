import { useState } from 'react';
import assetsService from '../../services/assets-service'
import LikeButton from '../buttons/LikeButton';
import ShareButton from '../buttons/ShareButton';
import UserChip from '../users/UserChip';

function Asset({ asset }) {
  const { owner, image, title, id } = asset;

  const [state, setState] = useState({
    likes: asset.likes,
    likedByMe: asset.likedByMe
  })

  const handleLike = async () => {
    if (!state.likedByMe) {
      await assetsService.like(id)
      setState({
        likes: likes + 1,
        likedByMe: true
      })
    } else {
      await assetsService.unlike(id)
      setState({
        likes: likes - 1,
        likedByMe: false
      })
    }
  }

  const { likes, likedByMe } = state;

  return (
    <div className="pt-2 pb-3" style={{ borderRadius: 20 }}>
      <div className="d-flex justify-content-between">
        <UserChip user={owner} className="mb-2" />
        <ShareButton id={id} className="me-2"/>
      </div>
      <img src={image} alt={title} className="w-100 mb-3" onDoubleClick={handleLike} style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px' }} />
      <LikeButton handleLike={handleLike} likedByMe={likedByMe} likes={likes} />
    </div >
  )
}

export default Asset;
