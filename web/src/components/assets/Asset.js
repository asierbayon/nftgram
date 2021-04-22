import { useState } from 'react';
import assetsService from '../../services/assets-service'
import LikeButton from '../buttons/LikeButton';
import ShareButton from '../buttons/ShareButton';
import UserChip from '../users/UserChip';

function Asset({ asset }) {

  const { owner, image, comments, title, id } = asset;

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
    <div className="border pt-2 pb-3" style={{ borderRadius: 20 }}>
      <UserChip user={owner} className="mb-2"/>
      <img src={image} alt={title} className="w-100" onDoubleClick={handleLike} />
      <div className="d-flex flex-row align-items-center justify-content-between mt-3 px-2">
        <LikeButton handleLike={handleLike} likedByMe={likedByMe} likes={likes} />
        <ShareButton id={id}/>
      </div>
    </div >
  )
}

export default Asset;
