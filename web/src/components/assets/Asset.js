import { useState } from 'react';
import { Link } from 'react-router-dom';
import assetsService from '../../services/assets-service'

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
    <div>
      <Link to={`/${owner.username}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="d-flex flex-row align-items-center p-2">
          <img src={owner.avatar} alt={owner.fullName} className="rounded-circle me-3" style={{ width: 25 }} />
          <h6>{owner.username}</h6>
        </div>
      </Link>
      <img src={image} alt={title} style={{ width: 400 }} onDoubleClick={handleLike} />
      <div className="d-flex flex-row align-items-center p-2">
        <h6 className="me-4">
          <i className={`fs-5 ${likedByMe ? 'text-danger fas fa-heart me-2' : 'far fa-heart me-2'}`}
            onClick={handleLike} />
          {likes}
        </h6>
        <h6><i className="fs-5 far fa-comment me-2"></i>{comments}</h6>
      </div>

    </div >
  )
}

export default Asset
