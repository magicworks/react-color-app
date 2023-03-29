import sizes from './sizes';
import bg from './bg.svg';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#394bad',
    backgroundImage: `url(${bg})`,
    paddingBottom: '40px',
    minHeight: 'calc(100vh - 55px)',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '80%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    minHeight: '84px',
    '& a': {
      color: 'white',
    },
  },
  palettes: {
    width: '100%',
    '& > div': {
      boxSizing: 'border-box',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 30%)',
      gridGap: '2.5rem',
      columnGap: '5%',
      [sizes.down('md')]: {
        gridTemplateColumns: 'repeat(2, 47%)',
        columnGap: '6%',
      },
      [sizes.down('xs')]: {
        gridTemplateColumns: 'repeat(1, 100%)',
        gridGap: '1rem',
      },
    },
  },
};

export default styles;
