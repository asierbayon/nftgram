function LikeButton({ handleLike, likes, likedByMe }) {
  return (
    <div className="cursor-pointer ps-2 py-1" onClick={handleLike}>
      <h6 className={`fw-bold d-flex ${likedByMe ? '' : 'text-muted' }`}>
        <i className={`me-2 fs-5 ${likedByMe ? 'text-danger fas fa-heart' : 'far fa-heart'}`} />
        {likes} {(likes == 1) ? 'like' : 'likes' }
      </h6>
    </div>
  )
}

export default LikeButton
