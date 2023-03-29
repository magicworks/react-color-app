import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import draggableColorBoxStyles from './styles/DraggableColorBoxStyles';

export default function DraggableColorBox(props) {
  const { handleClick, name, color, id } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: color,
  };

  const styles = draggableColorBoxStyles(color);

  return (
    <Box ref={setNodeRef} style={style} sx={styles.root}>
      <DragIcon {...attributes} {...listeners} sx={styles.dragIcon} />
      <Box sx={styles.boxContent}>
        <Box>{name}</Box>
        <DeleteIcon sx={styles.deleteIcon} onClick={handleClick} />
      </Box>
    </Box>
  );
}
