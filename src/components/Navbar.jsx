import { useState } from 'react';
import { Stack, Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      p={2} 
      sx={{ 
        position: 'sticky', 
        background: '#000', 
        top: 0, 
        // Changed to justify-content 'space-between' so logo sits on left, search on right
        justifyContent: 'space-between', 
        borderBottom: '1px solid #1e1e1e', 
        zIndex: 10 
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#F31503', letterSpacing: '-1px' }}>▶ YouTubeClone</span>
      </Link>

      <Paper 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          borderRadius: 20, 
          border: '1px solid #e3e3e3', 
          pl: 2, 
          boxShadow: 'none', 
          background: '#fff', 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <input 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ 
            border: 'none', 
            outline: 'none', 
            width: '250px', 
            background: 'transparent',
            // Explicitly set the text color inside the white input background to black
            color: '#000000' 
          }} 
        />
        <IconButton type="submit" sx={{ p: '10px', color: 'red' }}>
          <Search />
        </IconButton>
      </Paper>
    </Stack>
  );
}