import sizes from './sizes';
import chroma from 'chroma-js';

export default function draggableColorBoxStyles(color) {
  return {
    root: {
      width: '20%',
      height: '25%',
      position: 'relative',
      cursor: 'pointer',
      '&:hover svg': {
        color: 'white',
        transform: 'scale(1.5)',
      },
      [sizes.down('lg')]: {
        width: '25%',
        height: '20%',
      },
      [sizes.down('md')]: {
        width: '50%',
        height: '10%',
      },
      [sizes.down('sm')]: {
        width: '100%',
        height: '10%',
      },
    },
    boxContent: {
      position: 'absolute',
      width: '100%',
      left: '0px',
      bottom: '0px',
      padding: '10px',
      color: () =>
        chroma(color).luminance() <= 0.08
          ? 'rgba(255,255,255,0.8)'
          : 'rgba(0,0,0,0.6)',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    dragIcon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      transition: 'all 0.3s ease-in-out',
      opacity: '.7',
      '&:focus': {
        outline: 'none',
      },
      [sizes.down('md')]: {
        right: '35px',
        top: '14px',
      },
    },
    deleteIcon: {
      transition: 'all 0.3s ease-in-out',
    },
  };
}
