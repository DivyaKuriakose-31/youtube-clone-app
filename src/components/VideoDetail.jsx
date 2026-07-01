import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'; 
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import VideoCard from './VideoCard';

export default function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    // 1. Fetch current video playback information details
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        if (data?.items?.[0]) {
          setVideoDetail(data.items[0]);
        }
      })
      .catch((err) => console.error("Error fetching video metadata details:", err));

    // 2. Fetch related video recommendations on the side column
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        if (data?.items) {
          setRelatedVideos(data.items);
        }
      })
      .catch((err) => console.error("Error fetching related video recommendations:", err));
  }, [id]);

  if (!videoDetail?.snippet) {
    return (
      <Box sx={{ backgroundColor: '#000', minHeight: '95vh', p: 4 }}>
        <Typography sx={{ color: '#fff' }}>Loading player engine...</Typography>
      </Box>
    );
  }

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '95vh', p: { xs: 2, md: 4 } }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
        
        {/* Left Side: Playable Video Screen Container */}
        <Box flex={1}>
          <Box sx={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', mb: 2 }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`} 
              className="react-player" 
              controls 
              width="100%"
              height="100%"
              playing={true} 
              muted={true} // 🚀 Bypasses browser security locks to let the video play immediately
            />
          </Box>
          
          {/* Video Title */}
          <Typography color="#fff" variant="h5" fontWeight="bold" p={1}>
            {title}
          </Typography>

          {/* Channel Info, Views & Likes bar */}
          {/* ✅ FIX: Moved justifyContent and flexWrap cleanly inside sx to fix line 69 error! */}
          <Stack 
            direction="row" 
            py={1} 
            px={1} 
            gap={2}
            sx={{ color: '#fff', justifyContent: 'space-between', flexWrap: 'wrap' }} 
          >
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
                {viewCount ? parseInt(viewCount).toLocaleString() : '0'} views
              </Typography>
              <Typography variant="body1">
                {likeCount ? parseInt(likeCount).toLocaleString() : '0'} likes
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Right Side: Sidebar Recommendations Column List */}
        <Box 
          px={2} 
          py={{ xs: 5, md: 1 }} 
          sx={{ width: { xs: '100%', lg: '400px' }, height: '85vh', overflowY: 'auto' }}
        >
          <Typography color="#fff" variant="h6" fontWeight="bold" mb={2}>
            Next Up
          </Typography>
          <Stack direction="column" gap={3}>
            {relatedVideos?.map((item, idx) => (
              <Box key={idx} sx={{ width: '100%' }}>
                {item.id?.videoId && <VideoCard video={item} />}
              </Box>
            ))}
          </Stack>
        </Box>

      </Stack>
    </Box>
  );
}