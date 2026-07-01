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
      {/* Dynamic Sidebar Container */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '240px' }, 
          borderRight: { xs: 'none', md: '1px solid #e3e3e3' }, 
          borderBottom: { xs: '1px solid #e3e3e3', md: 'none' }, // Divider shift for mobile
          px: 2, 
          pt: 1,
          position: { xs: 'sticky', md: 'static' },
          top: { xs: '0px', md: 'auto' },
          backgroundColor: '#fff',
          zIndex: 10
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      {/* Video Content Grid Section */}
      <Box p={3} sx={{ overflowY: 'auto', height: { xs: 'calc(100vh - 60px)', md: '90vh' }, flex: 1 }}>
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
                  xs: '100%',             // 1 Full-width Video item per row on mobile screens
                  sm: 'calc(50% - 12px)', // 2 Columns on intermediate viewports
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