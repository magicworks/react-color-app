import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Box } from '@mui/system';
import styles from './styles/NavbarStyles';

export default function Navbar(props) {
  const [format, setFormat] = useState('hex');
  const [open, setOpen] = useState(false);
  const { level, changeLevel, changeFormat, showingAllColors } =
    props;

  const handleFormatChange = function (e) {
    setFormat(e.target.value);
    changeFormat(e.target.value);
    setOpen(true);
  };

  const closeSnackbar = function () {
    setOpen(false);
  };
  return (
    <Box sx={styles.Navbar}>
      <Box sx={styles.logo}>
        <Link to='/'>reactcolorpicker</Link>
      </Box>

      {showingAllColors && (
        <div>
          <span>Level: {level}</span>
          <Box sx={styles.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </Box>
        </div>
      )}

      <Box sx={styles.selectContainer} className='selectContainer'>
        <Select
          value={format}
          variant='standard'
          onChange={handleFormatChange}
        >
          <MenuItem value='hex'>HEX - #ffffff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value='rgba'>
            RGBA - rgba(255,255,255, 1.0)
          </MenuItem>
        </Select>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id='message-id'>
            Format Changed To {format.toUpperCase()}
          </span>
        }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={closeSnackbar}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color='inherit'
            key='close'
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Box>
  );
}
