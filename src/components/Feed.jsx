import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import VideoCard from './VideoCard'; 
import { fetchFromAPI } from '../utils/fetchFromAPI';

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items || []));
  }, [selectedCategory]);

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Sidebar Box Component */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '240px' }, 
          borderRight: { xs: 'none', md: '1px solid #e3e3e3' },
          borderBottom: { xs: '1px solid #e3e3e3', md: 'none' },
          px: 2, 
          py: 2,
          maxHeight: { xs: '200px', md: 'none' }, // Caps mobile height with independent scrolling down
          overflowY: 'auto'
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      {/* Main Video Section */}
      <Box p={3} sx={{ overflowY: 'auto', height: '90vh', flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: '#000' }}>
          {selectedCategory} <span style={{ color: '#F31503' }}>Videos</span>
        </Typography>

        <Box 
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'flex-start'
          }}
        >
          {videos.map((item, idx) => (
            <Box 
              key={idx}
              sx={{
                width: {
                  xs: '100%', 
                  sm: 'calc(50% - 12px)', 
                  md: 'calc(33.333% - 16px)', 
                  lg: 'calc(25% - 18px)'
                }
              }}
            >
              {item.id?.videoId && <VideoCard video={item} />}
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}