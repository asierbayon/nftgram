function LikeButton({ handleLike, likes, likedByMe }) {
  return (
    <div>
      <h6 className="me-4">
        <i className={`fs-5 ${likedByMe ? 'text-danger fas fa-heart me-2' : 'far fa-heart me-2'}`}
          onClick={handleLike} />
        {likes}
      </h6>
    </div>
  )
}

export default LikeButton
