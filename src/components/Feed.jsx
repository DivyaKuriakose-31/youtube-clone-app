import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import VideoCard from './VideoCard';

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Dynamically queries based on whatever category is currently selected
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items || []))
      .catch((err) => console.error("Error fetching data: ", err));
  }, [selectedCategory]); // Refetches whenever selectedCategory shifts

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      {/* Sidebar Container */}
      <Box sx={{ height: { sx: 'auto', md: '92vh' }, px: { sx: 0, md: 2 } }}>
        <Sidebar 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      </Box>

      {/* Main Video Feed Container */}
      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: 'white' }}>
          {selectedCategory} <span style={{ color: '#FC1503' }}>Videos</span>
        </Typography>

        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
          {videos.map((item, idx) => (
            <Box key={idx}>
              {item.id.videoId && <VideoCard video={item} />}
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}