import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchFromAPI } from '../utils/fetchFromAPI';

export default function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]));
  }, [id]);

  if (!videoDetail?.snippet) return <Typography color="white" p={5}>Loading...</Typography>;

  const { snippet: { title, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh" p={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" width="100%" height="100%" controls playing config={{ youtube: { playerVars: { showinfo: 1 } } }} />
          </Box>
          <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
            <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color="#fff">
              {channelTitle}
              <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
            </Typography>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant="body1" sx={{ opacity: 0.7 }}>{parseInt(viewCount).toLocaleString()} Views</Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>{parseInt(likeCount).toLocaleString()} Likes</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
