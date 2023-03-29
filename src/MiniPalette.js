import { memo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles/MiniPaletteStyles';

const MiniPalette = memo((props) => {
  const { id, paletteName, emoji, colors, openDialog, goToPalette } =
    props;
  const miniColorBoxes = colors.map((color) => (
    <Box
      sx={styles.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  console.log('rerender');
  const deletePalette = useCallback(
    (e) => {
      e.stopPropagation();
      openDialog(id);
    },
    [openDialog, id]
  );

  const handleClick = useCallback(() => {
    goToPalette(id);
  }, [goToPalette, id]);

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
});

export default MiniPalette;
