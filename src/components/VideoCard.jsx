import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function VideoCard({ video: { id: { videoId }, snippet } }) {
  return (
    <Card
       sx={{ width:'100%',maxWidth:'360px',background:'#181818',borderRadius:'12px'}}>
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK3I`}>
        <CardMedia image={snippet?.thumbnails?.high?.url} sx={{ width: { xs: '100%', sm: '358px'}, height: 202 }} />
      </Link>
      <CardContent sx={{ height: '106px' }}>
        <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK3I`}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF" className="line-clamp-2">
            {snippet?.title.slice(0, 60)}
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="gray" sx={{ display: 'flex', alignItems: 'center', mt: '5px' }}>
          {snippet?.channelTitle}
          <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
        </Typography>
      </CardContent>
    </Card>
  );
}