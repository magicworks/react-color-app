import { Box } from '@mui/system';
import styles from './styles/PaletteFooterStyles';

export default function PaletteFooter(props) {
  const { paletteName, emoji } = props;
  return (
    <Box sx={styles.PaletteFooter}>
      {paletteName}
      <Box sx={styles.emoji}>{emoji}</Box>
    </Box>
  );
}
