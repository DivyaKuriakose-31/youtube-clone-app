import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import VideoCard from './VideoCard'; 
import { fetchFromAPI } from '../utils/fetchFromAPI';

export default function SearchFeed() {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items || []));
  }, [searchTerm]);

  return (
    // 👈 No Sidebar elements inside this layout container for full-width view
    <Box p={4} sx={{ overflowY: 'auto', height: '90vh', backgroundColor: '#fff' }}>
      <Typography variant="h5" fontWeight="bold" mb={4} sx={{ color: '#000' }}>
        Search Results for: <span style={{ color: '#F31503' }}>{searchTerm}</span> videos
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
  );
}