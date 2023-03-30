import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles/MiniPaletteStyles';

const MiniPalette = memo(
  (props) => {
    const {
      id,
      paletteName,
      emoji,
      colors,
      openDialog,
      goToPalette,
    } = props;
    const miniColorBoxes = colors.map((color) => (
      <Box
        sx={styles.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));

    const deletePalette = (e) => {
      e.stopPropagation();
      openDialog(id);
    };

    const handleClick = () => {
      goToPalette(id);
    };

    return (
      <Box sx={styles.root} onClick={handleClick}>
        <DeleteIcon
          sx={styles.deleteIcon}
          style={{ transition: 'all 0.3s ease-in-out' }}
          onClick={deletePalette}
        />

        <Box sx={styles.colors}>{miniColorBoxes}</Box>
        <Typography variant='h5' sx={styles.title}>
          {paletteName}
          <Box sx={styles.emoji}>{emoji}</Box>
        </Typography>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }
);

export default MiniPalette;
