import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export default function PaletteMetaForm(props) {
  const { palettes, hideForm } = props;
  const [stage, setStage] = useState('form');
  const [newPaletteName, setNewPaletteName] = useState('');

  const handleChange = (event) => {
    setNewPaletteName(event.target.value);
  };

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    props.savePalette(newPalette);
    setStage('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule(
      'isPaletteNameUnique',
      (value) => {
        return palettes.every(
          ({ paletteName }) =>
            paletteName.toLowerCase() !== value.toLowerCase()
        );
      }
    );
  });

  return (
    <>
      <Dialog open={stage === 'emoji'} onClose={hideForm}>
        <Picker
          title='Pick a Palette Emoji'
          data={data}
          onEmojiSelect={savePalette}
          theme='light'
        />
      </Dialog>
      <Dialog open={stage === 'form'} onClose={hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make
              sure it's unique!
            </DialogContentText>
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Enter a palette name',
                'Palette name must be unique',
              ]}
              fullWidth
              margin='normal'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
            <Button type='submit' variant='contained' color='primary'>
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}
