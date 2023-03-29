const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid #444444ā',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: 1,
    },
  },
  colors: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: '#dae1e4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },
  miniColor: {
    height: '25%',
    width: '20%',
    position: 'relative',
  },
  deleteIcon: {
    color: 'white',
    backgroundColor: '#eb3d30',
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '0px',
    top: '0px',
    padding: '10px',
    zIndex: 10,
    opacity: 0,
  },
};

export default styles;
