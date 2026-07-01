import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import VideoCard from './VideoCard'; 
import { fetchFromAPI } from '../utils/fetchFromAPI';

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // 1. Reset current array to avoid rendering mixed data during transit
    setVideos([]); 

    // 2. Query data safely
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        if (data?.items) {
          setVideos(data.items);
        }
      })
      .catch((err) => {
        console.error("API error encountered:", err);
      });
  }, [selectedCategory]); // 🚀 Only runs EXACTLY once per category click

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Box sx={{ width: { xs: '100%', md: '240px' }, borderRight: '1px solid #e3e3e3', px: 2, py: 2 }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      <Box p={3} sx={{ overflowY: 'auto', height: '90vh', flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: '#000' }}>
          {selectedCategory} <span style={{ color: '#F31503' }}>Videos</span>
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'flex-start' }}>
          {videos?.map((item, idx) => (
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