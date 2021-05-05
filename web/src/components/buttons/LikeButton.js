import { Icon } from '@iconify/react';
import heartOutline from '@iconify-icons/eva/heart-outline';
import heartFill from '@iconify-icons/eva/heart-fill';
import { useState } from 'react';
// material
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
// services
import { like, unlike } from '../../services/assets-service';
// utils
import { fShortenNumber } from '../../utils/formatNumber';


export default function LikeButton({ likes, likedByMe, id, sx }) {

  let [likesNumber, setLikesNumber] = useState(likes);
  let [liked, setLiked] = useState(likedByMe);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlike(id);
        setLikesNumber(likesNumber -= 1);
      }
      else {
        await like(id);
        setLikesNumber(likesNumber += 1);
      }
      setLiked((prev) => !prev);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControlLabel
      sx={sx}
      control={
        <Checkbox
          onClick={handleLike}
          defaultChecked={liked}
          icon={<Icon icon={heartOutline} color='black' />}
          checkedIcon={<Icon icon={heartFill} />}
        />
      }
      label={
        <Typography variant="subtitle1" fontWeight="fontWeightBold" sx={{ marginTop: '2px', color: 'black' }}>
          {fShortenNumber(likesNumber)}
        </Typography>
      }
    />
  )
};
