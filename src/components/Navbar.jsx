import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import { logo } from '../utils/constants';

export default function Navbar() {
  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      p={2} 
      sx={{ 
        position: 'sticky', 
        background: '#000', 
        top: 0, 
        // Pushes the YouTube logo to the far left and the SearchBar to the far right
        justifyContent: 'space-between', 
        // Ensures a minimum 16px safety gap between components on ultra-small screens
        gap: 2, 
        zIndex: 10
      }}
    >
      {/* YouTube Logo Section */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      
      {/* Search Bar Section */}
      <SearchBar />
    </Stack>
  );
}