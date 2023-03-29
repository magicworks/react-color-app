import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import { Box } from '@mui/system';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';

function SingleColorPalette(props) {
  const { palettes } = props;
  const params = useParams();
  const [format, setFormat] = useState('hex');
  const palette = generatePalette(
    palettes.find(function (palette) {
      return palette.id === params.paletteId;
    })
  );
  const { paletteName, emoji, id } = palette;
  const gatherShades = function (palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  };
  const shades = gatherShades(palette, params.colorId);

  const colorBoxes = shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showFullPalette={false}
    />
  ));

  const changeFormat = function (format) {
    setFormat(format);
  };

  return (
    <Box sx={styles.Palette}>
      <Navbar changeFormat={changeFormat} showingAllColors={false} />
      <Box sx={styles.colors}>
        {colorBoxes}
        <Box sx={styles.goBack}>
          <Link to={`/palette/${id}`}>Go Back</Link>
        </Box>
      </Box>

      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </Box>
  );
}

export default SingleColorPalette;
