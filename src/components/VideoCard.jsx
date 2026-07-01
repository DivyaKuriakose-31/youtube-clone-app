import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function VideoCard({ video: { id: { videoId }, snippet } }) {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        boxShadow: 'none', 
        borderRadius: '0px', // YouTube standard card layout
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      {/* Video Thumbnail Wrapper */}
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK3U`} style={{ textDecoration: 'none' }}>
        <Box sx={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
          <CardMedia 
            component="img"
            image={snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url} 
            alt={snippet?.title} 
            sx={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'cover' // 👈 Clean crop rule ensuring absolute image uniformity
            }} 
          />
        </Box>
      </Link>

      {/* Video Details */}
      <CardContent sx={{ backgroundColor: 'transparent', p: '12px 0px 0px 0px !important' }}>
        <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK3U`} style={{ textDecoration: 'none' }}>
          <Typography 
            variant="subtitle1" 
            fontWeight="600" 
            sx={{
              color: '#0f0f0f !important',
              display: '-webkit-box',
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: '1.4rem',
              fontSize: '0.95rem',
              height: '2.8rem', // Locks title text bounding height uniform
              mb: '4px'
            }}
          >
            {snippet?.title || "Video Title"}
          </Typography>
        </Link>

        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : '/channel/UCmXmlB4-HJytD7wek0Uo97A'} style={{ textDecoration: 'none' }}>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" fontWeight="500" sx={{ color: '#606060 !important', fontSize: '0.82rem' }}>
              {snippet?.channelTitle || "Channel Name"}
            </Typography>
            <CheckCircleIcon sx={{ fontSize: '12px', color: '#606060', ml: '4px' }} />
          </Box>
        </Link>
      </CardContent>
    </Card>
  );
}