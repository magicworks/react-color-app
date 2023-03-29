import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ChromePicker } from 'react-color';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import { v4 as uuid } from 'uuid';
import styles from './styles/ColorPickerStyles';

export default function ColorPickerForm(props) {
  const { paletteIsFull, colors, addColor, width } = props;
  const [currentColor, setCurrentColor] = useState('pink');
  const [newColorName, setNewColorName] = useState('');

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleColorChangeComplete = (color) => {
    setCurrentColor(color.hex);
  };

  const handleNewNameChange = (event) => {
    setNewColorName(event.target.value);
  };

  const handleSubmit = () => {
    const newColor = {
      id: uuid(),
      color: currentColor,
      name: newColorName,
    };

    addColor(newColor);
    setNewColorName('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return colors.every(
        ({ color }) =>
          color.toLowerCase() !== currentColor.toLowerCase()
      );
    });
  });

  return (
    <>
      <Box sx={styles.picker}>
        <ChromePicker
          width={`${width - 40}px`}
          color={currentColor}
          onChange={handleColorChange}
          onChangeComplete={handleColorChangeComplete}
        />
      </Box>

      <ValidatorForm instantValidate={false} onSubmit={handleSubmit}>
        <TextValidator
          variant='filled'
          margin='normal'
          onChange={handleNewNameChange}
          value={newColorName}
          placeholder='Color Name'
          validators={[
            'required',
            'isColorNameUnique',
            'isColorUnique',
          ]}
          errorMessages={[
            'Enter a color name',
            'Color name must be unique',
            'Color already used',
          ]}
          sx={styles.colorNameInput}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={paletteIsFull}
          style={{
            backgroundColor: paletteIsFull ? '' : currentColor,
          }}
          sx={styles.addColor}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </>
  );
}
