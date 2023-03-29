import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box } from '@mui/system';
import colorBoxStyles from './styles/ColorBoxStyles';

export default function ColorBox(props) {
  const { name, background, id, showFullPalette } = props;
  const [copied, setCopied] = useState(false);

  const changeCopyState = () => {
    setCopied(true);

    setTimeout(() => setCopied(false), 800);
  };
  const styles = colorBoxStyles(background, showFullPalette, copied);

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <Box style={{ background }} sx={styles.ColorBox}>
        <Box style={{ background }} sx={styles.copyOverlay} />
        <Box sx={styles.copyMessage}>
          <h1>copied!</h1>
          <Box sx={styles.copyText}>{background}</Box>
        </Box>
        <Box>
          <Box sx={styles.boxContent}>
            <Box sx={styles.colorName}>{name}</Box>
          </Box>
          <Box className='copy-button' sx={styles.copyButton}>
            Copy
          </Box>
          {showFullPalette && (
            <Link to={`${id}`} onClick={(e) => e.stopPropagation()}>
              <Box sx={styles.seeMore}>MORE</Box>
            </Link>
          )}
        </Box>
      </Box>
    </CopyToClipboard>
  );
}
