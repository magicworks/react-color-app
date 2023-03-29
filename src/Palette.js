import { useState } from 'react';
import ColorBox from './ColorBox';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { generatePalette } from './colorHelpers';
import { Box } from '@mui/system';
import styles from './styles/PaletteStyles';

const Palette = (props) => {
  const { palettes } = props;
  const [select, setSelect] = useState({ level: 500, format: 'hex' });
  const params = useParams();
  const palette = generatePalette(
    palettes.find(function (palette) {
      return palette.id === params.id;
    })
  );
  const { colors, paletteName, emoji } = palette;
  const colorBoxes = colors[select.level].map((color) => (
    <ColorBox
      background={color[select.format]}
      name={color.name}
      key={uuid()}
      id={color.id}
      showFullPalette={true}
    />
  ));

  const changeLevel = (level) => {
    setSelect({ ...select, level });
  };
  const changeFormat = (format) => {
    setSelect({ ...select, format });
  };

  return (
    <Box sx={styles.Palette}>
      <Navbar
        level={select.level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showingAllColors
      />
      <Box sx={styles.colors}>{colorBoxes}</Box>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </Box>
  );
};

export default Palette;
