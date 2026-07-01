import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import VideoCard from './VideoCard'; 
import { fetchFromAPI } from '../utils/fetchFromAPI';

export default function SearchFeed() {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams(); // 👈 Captures the words (like 'fifa') from the address bar path

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}&maxResults=50`)
      .then((data) => {
        if (data?.items) {
          setVideos(data.items);
        }
      })
      .catch((err) => console.error("Search API Error:", err));
  }, [searchTerm]); // 🚀 Refreshes the display list instantly whenever a user types a new word

  return (
    <Box p={3} sx={{ overflowY: 'auto', height: '90vh', flex: 1, backgroundColor: '#fff' }}>
      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: '#000' }}>
        Search Results for: <span style={{ color: '#F31503' }}>{searchTerm}</span> videos
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'flex-start' }}>
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