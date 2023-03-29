import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Box from '@mui/material/Box';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav(props) {
  const { AppBar, open, handleDrawerOpen, savePalette, palettes } =
    props;
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <Box sx={styles.root}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={styles.AppBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            style={{ color: 'black' }}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            style={{ color: 'black' }}
          >
            Create a Palette
          </Typography>
        </Toolbar>
        <Box sx={styles.navBtns}>
          <Link to='/'>
            <Button
              variant='contained'
              color='secondary'
              sx={styles.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant='contained'
            onClick={showForm}
            sx={styles.button}
          >
            Save Palette
          </Button>
        </Box>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          savePalette={savePalette}
          hideForm={hideForm}
        />
      )}
    </Box>
  );
}
