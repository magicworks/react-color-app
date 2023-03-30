import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { blue, red } from '@mui/material/colors';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import styles from './styles/PaletteListStyles';

const PaletteList = (props) => {
  const { palettes, deletePalette } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const navigate = useNavigate();

  const goToPalette = function (id) {
    navigate(`/palette/${id}`);
  };

  const openDialog = (id) => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId('');
  };

  const handleDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  };

  const nodeRef = useRef(null);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        <Box sx={styles.nav}>
          <Typography variant='h1' sx={styles.heading}>
            React Colors
          </Typography>
          <Link to='/palette/new'>Create Palette</Link>
        </Box>
        <Box sx={styles.palettes}>
          <TransitionGroup>
            {palettes.map((palette) => (
              <CSSTransition
                key={palette.id}
                classNames='fade'
                timeout={3000}
                nodeRef={nodeRef}
              >
                <div ref={nodeRef}>
                  <MiniPalette
                    key={palette.id}
                    id={palette.id}
                    goToPalette={goToPalette}
                    {...palette}
                    openDialog={openDialog}
                  />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Box>
      </Box>

      <Dialog
        open={openDeleteDialog}
        aria-labelledby='delete-dialog-title'
        onClose={closeDialog}
      >
        <DialogTitle id='delete-dialog-title'>
          Delete This Palette?
        </DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor: blue[100],
                  color: blue[600],
                }}
              >
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Delete' />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar
                style={{ backgroundColor: red[100], color: red[600] }}
              >
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Cancel' />
          </ListItem>
        </List>
      </Dialog>
    </Box>
  );
};

export default PaletteList;
