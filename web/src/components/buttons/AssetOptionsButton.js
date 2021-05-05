import { useState } from 'react';
import { Icon } from '@iconify/react';
import paperPlaneFill from '@iconify-icons/eva/paper-plane-fill';
import externalLinkFill from '@iconify-icons/eva/external-link-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Menu, MenuItem, IconButton, Box } from '@material-ui/core';
import ShareDialog from '../dialogs/ShareDialog';

// ------------------------------------------------------

export default function AssetOptionsButton({ openseaUrl, id }) {
  const [isOpen, setOpen] = useState(null);
  const handleClose = () => setOpen(null);
  const handleClick = (event) => setOpen(event.currentTarget);

  const IconStyle = styled(Box)(() => ({
    marginRight: 15,
    width: 20,
    height: 20
  }));

  return (
    <div>
      <IconButton onClick={handleClick} >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={isOpen}
        onClose={handleClose}
        open={Boolean(isOpen)}
      >

        <ShareDialog id={id}>
          <MenuItem
            sx={{
              mx: 1,
              borderRadius: '0.5rem',
              typography: 'subtitle2',
              fontWeight: 'fontWeightBold'
            }}
          >
            <IconStyle
              component={Icon}
              icon={paperPlaneFill}
            />
              Share
          </MenuItem>
        </ShareDialog>

        <a href={openseaUrl} target="_blank">
          <MenuItem
            sx={{
              mx: 1,
              borderRadius: '0.5rem',
              typography: 'subtitle2',
              fontWeight: 'fontWeightBold'
            }}
            onClick={handleClose}
          >
            <IconStyle
              component={Icon}
              icon={externalLinkFill}
            />
          View on Opensea
        </MenuItem>
        </a>

      </Menu>
    </div >
  )
}
