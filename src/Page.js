import { Box } from '@mui/system';
import './styles/Page.css';

export default function Page({ children }) {
  return <Box className='page'>{children}</Box>;
}
