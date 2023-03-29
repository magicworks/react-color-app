import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuid } from 'uuid';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';
import { DRAWER_WIDTH } from './constants';
import seedColors from './seedColors';

const drawerWidth = DRAWER_WIDTH;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  flexGrow: 1,
  padding: 0,
  paddingTop: '64px',
  height: 'calc(100vh - 64px)',
  alignItems: 'center',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => {
    return prop !== 'open';
  },
})(({ theme, open }) => ({
  backgroundColor: '#f3f3f3',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${theme.spacing(0, 1)}`,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  width: '100%',
  position: 'relative',
  top: '-6px',
}));

export default function NewPaletteForm(props) {
  const maxColors = 20;
  const { palettes } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const savePalette = (newPalette) => {
    newPalette.id = newPalette.paletteName
      .toLowerCase()
      .replace(/ /g, '-');
    newPalette.colors = colors;
    props.savePalette(newPalette);

    navigate(`/`);
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const handleDragEnd = ({ active, over }) => {
    const oldIndex = colors.findIndex((el) => el.id === active.id);
    const newIndex = colors.findIndex((el) => el.id === over.id);
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
    }
    randomColor = { ...randomColor, id: uuid() };
    setColors([...colors, randomColor]);
  };

  const paletteIsFull = colors.length >= maxColors;

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        AppBar={AppBar}
        palettes={palettes}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            alignItems: 'center',
            padding: '10px',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box role='presentation' sx={styles.container}>
          <Typography variant='h4' gutterBottom>
            Design Your Palette
          </Typography>
          <Box sx={styles.buttons}>
            <Button
              variant='contained'
              color='secondary'
              onClick={clearColors}
              sx={styles.button}
            >
              Clear Palette
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={addRandomColor}
              disabled={paletteIsFull}
              sx={styles.button}
            >
              Random Color
            </Button>
          </Box>

          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            colors={colors}
            addColor={addNewColor}
            width={drawerWidth}
          />
        </Box>
      </Drawer>
      <Main open={open}>
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          handleDragEnd={handleDragEnd}
        />
      </Main>
    </Box>
  );
}
