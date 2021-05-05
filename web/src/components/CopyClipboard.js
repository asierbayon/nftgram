import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import copyFill from '@iconify-icons/eva/copy-fill';
import checkmarkCircle2Outline from '@iconify-icons/eva/checkmark-circle-2-outline';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import {
  Tooltip,
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

CopyClipboard.propTypes = {
  value: PropTypes.string.isRequired
};

export default function CopyClipboard({ value }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <TextField
      fullWidth
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CopyToClipboard text={value} onCopy={onCopy}>
              <Tooltip title="Copy URL">
                <IconButton>
                  {copied
                    ? <Icon icon={checkmarkCircle2Outline} width={24} height={24} color="green" />
                    : <Icon icon={copyFill} width={24} height={24} />
                  }
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </InputAdornment>
        )
      }}
    />
  );
}
