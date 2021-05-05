import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  CardContent
} from '@material-ui/core';
//
import SvgIconStyle from '../SvgIconStyle';
import LikeButton from '../buttons/LikeButton';
import AssetOptionsButton from '../buttons/AssetOptionsButton';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none'
  },
  overflow: 'hidden',
  textOverflow: "ellipsis"
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

export default function Asset({ asset }) {
  const { image, title, owner, likes, likedByMe, id, url } = asset;
  const linkTo = `/assets/${id}`;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
    >
      <Card
        sx={{
          position: 'relative',
          borderRadius: '1.5rem',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}>
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
            }}
          />
          <RouterLink to={`/${owner.username}`}>
            <AvatarStyle
              alt={owner.name}
              src={owner.avatar}
            />
          </RouterLink>
          <RouterLink to={linkTo}>
            <CoverImgStyle alt={title} src={image} />
          </RouterLink>
        </CardMediaStyle>

        <CardContent sx={{ pt: 4 }} >
          <Box sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            <TitleStyle
              to={linkTo}
              color="inherit"
              variant="subtitle2"
              fontWeight="fontWeightBold"
              component={RouterLink}
              noWrap
            >
              {title}
            </TitleStyle>
          </Box>

          <InfoStyle>
            <LikeButton
              id={id}
              likedByMe={likedByMe}
              likes={likes}
              sx={{ paddingLeft: '5px' }}
            />
            <AssetOptionsButton openseaUrl={url} id={id} />
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
