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
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        if (data?.items?.[0]) {
          setVideoDetail(data.items[0]);
        }
      })
      .catch((err) => console.error("Error fetching video details:", err));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        if (data?.items) {
          setRelatedVideos(data.items);
        }
      })
      .catch((err) => console.error("Error fetching related videos:", err));
  }, [id]);

  const title = videoDetail?.snippet?.title || "Loading Video Title...";
  const channelId = videoDetail?.snippet?.channelId;
  const channelTitle = videoDetail?.snippet?.channelTitle || "";
  const viewCount = videoDetail?.statistics?.viewCount;
  const likeCount = videoDetail?.statistics?.likeCount;

  return (
    // ✅ Responsive padding: minimal on mobile (p: 1), spaced out on desktop (md: 4)
    <Box sx={{ backgroundColor: '#000', minHeight: '95vh', p: { xs: 1, md: 4 } }}>
      {/* ✅ Responsive flex direction: column on mobile (xs) so next up video list flows below, row on desktop (lg) */}
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={3}>
        
        {/* LEFT SIDE / TOP: Main Player and Metadata Container */}
        <Box sx={{ width: '100%', flex: 1 }}>
          {/* Video Aspect Ratio Box */}
          <Box sx={{ width: '100%', aspectRatio: '16/9', borderRadius: { xs: '0px', md: '12px' }, overflow: 'hidden', mb: 2, backgroundColor: '#1a1a1a' }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`} 
              className="react-player" 
              controls 
              width="100%"
              height="100%"
              playing={true} 
              muted={true} 
            />
          </Box>
          
          {/* Video Title Text */}
          <Typography color="#fff" variant={{ xs: 'subtitle1', md: 'h5' }} fontWeight="bold" p={1}>
            {title}
          </Typography>

          {/* Channel Info & Metrics Strip */}
          <Stack 
            direction="row" 
            py={1} 
            px={1} 
            gap={2}
            sx={{ color: '#fff', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }} 
          >
            {channelId && (
              <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
                <Stack direction="row" alignItems="center" gap="4px">
                  <Typography variant="body1" fontWeight="bold" color="#fff">
                    {channelTitle}
                  </Typography>
                  <CheckCircleIcon sx={{ fontSize: '14px', color: '#aaa', ml: '5px' }} />
                </Stack>
              </Link>
            )}
            
            <Stack direction="row" gap="15px" alignItems="center" sx={{ opacity: 0.7 }}>
              <Typography variant="body2">
                {viewCount ? parseInt(viewCount).toLocaleString() : '0'} views
              </Typography>
              <Typography variant="body2">
                {likeCount ? parseInt(likeCount).toLocaleString() : '0'} likes
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* RIGHT SIDE / BOTTOM: Sidebar Video Recommendations */}
        <Box 
          px={{ xs: 1, md: 2 }} 
          py={{ xs: 2, md: 1 }} 
          sx={{ 
            width: { xs: '100%', lg: '400px' }, 
            // ✅ Mobile height defaults to auto so it flows normally, limits to scrollbox height on desktop
            height: { xs: 'auto', lg: '85vh' }, 
            overflowY: 'auto' 
          }}
        >
          <Typography color="#fff" variant="h6" fontWeight="bold" mb={2}>
            Next Up
          </Typography>
          {/* ✅ Renders column layout cleanly on mobile views */}
          <Stack direction="column" gap={2}>
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