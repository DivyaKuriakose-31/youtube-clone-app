import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import Feed from './components/Feed';
import VideoDetail from './components/VideoDetail';
import SearchFeed from './components/SearchFeed';

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: '#000',
          minHeight: '100vh',
          color: '#fff',
        }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}