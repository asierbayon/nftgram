import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CopyToClipboard from '../CopyClipboard';
import { Box, Typography } from '@material-ui/core';

// -----------------------------------------------------------

ShareDialog.propTypes = {
  id: PropTypes.string.isRequired
};

// -----------------------------------------------------------

export default function ShareDialog({ id, children }) {
  const [open, setOpen] = useState(false);
  const url = `https://localhost:3000/assets/${id}`; // TODO

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen}>
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title" disableTypography={true} >
          <Typography variant="h5">
              Share this NFT
          </Typography>
          </DialogTitle>
        <DialogContent>
          <CopyToClipboard value={url} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}