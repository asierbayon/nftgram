function LikeButton({ handleLike, likes, likedByMe }) {
  return (
    <div className="cursor-pointer px-4 py-2 rounded-pill text-center border" onClick={handleLike}>
      <h6 className={`d-flex ${likedByMe ? '' : 'text-muted' }`}>
        <i className={`me-2 fs-5 ${likedByMe ? 'text-danger fas fa-heart' : 'far fa-heart'}`} />
        {likes}
      </h6>
    </div>
  )
}

export default LikeButton
