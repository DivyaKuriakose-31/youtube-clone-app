import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'; // 👈 Powers the actual play functionality
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import VideoCard from './VideoCard';

export default function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams(); // Gets the unique videoId from the URL address bar

  useEffect(() => {
    // 1. Fetch current video playback information details
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    // 2. Fetch related video recommendations on the side column
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setRelatedVideos(data.items || []));
  }, [id]);

  if (!videoDetail?.snippet) return <Typography sx={{ color: '#fff', p: 4 }}>Loading player engine...</Typography>;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: '#000', p: { xs: 2, md: 4 } }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
        
        {/* Left Side: The Actual Playable Video Screen Container */}
        <Box flex={1}>
          <Box sx={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', mb: 2 }}>
            <ReactPlayer 
  url={`https://www.youtube.com/watch?v=${id}`} 
  className="react-player" 
  controls
  width="100%"
  height="100%"
  playing={true} // Tries to auto-start the stream on render
  config={{
    youtube: {
      playerVars: { showinfo: 1 }
    }
  }}
/>
          </Box>
          
          {/* Video Title */}
          <Typography color="#fff" variant="h5" fontWeight="bold" p={1}>
            {title}
          </Typography>

          {/* Channel Info, Views & Likes bar */}
          <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={1} flexWrap="wrap" gap={2}>
            <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center" gap="4px">
                <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                  {channelTitle}
                </Typography>
                <CheckCircleIcon sx={{ fontSize: '14px', color: '#aaa', ml: '5px' }} />
              </Stack>
            </Link>
            
            <Stack direction="row" gap="20px" alignItems="center" sx={{ opacity: 0.7 }}>
              <Typography variant="body1">
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body1">
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Right Side: Sidebar Recommendations Column List */}
        <Box 
          px={2} 
          py={{ xs: 5, md: 1 }} 
          justifyContent="center" 
          alignItems="center"
          sx={{ width: { xs: '100%', lg: '400px' }, height: '85vh', overflowY: 'auto' }}
        >
          <Typography color="#fff" variant="h6" fontWeight="bold" mb={2}>
            Next Up
          </Typography>
          <Stack direction="column" gap={3}>
            {relatedVideos.map((item, idx) => (
              <Box key={idx} sx={{ width: '100%' }}>
                {item.id.videoId && <VideoCard video={item} />}
              </Box>
            ))}
          </Stack>
        </Box>

      </Stack>
    </Box>
  );
}