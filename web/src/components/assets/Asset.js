import { Link } from 'react-router-dom';

function Asset({ asset: { title, image, likes, likedByMe, comments, owner, id } }) {

  return (
    <div>
      <Link to={`/${owner.username}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="d-flex flex-row align-items-center p-2">
          <img src={owner.avatar} alt={owner.fullName} className="rounded-circle me-3" style={{ width: 25 }} />
          <h6>{owner.username}</h6>
        </div>
      </Link>
      <img src={image} alt={title} style={{ width: 400 }} />
      <div className="d-flex flex-row align-items-center p-2">
        <h6 className="me-4"><i class={`fs-5 ${likedByMe ? 'text-danger fas fa-heart me-2' : 'far fa-heart me-2'}`}></i>{likes}</h6>
        <h6><i class="fs-5 far fa-comment me-2"></i>{comments}</h6>
      </div>

    </div >
  )
}

export default Asset
