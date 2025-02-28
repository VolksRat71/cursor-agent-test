import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  Grid
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getMetricsByVideoId } from '../utils/dataUtils';

/**
 * VideoAdCard component
 * Displays information about a video ad with thumbnail, duration,
 * target audience, and performance metrics
 */
const VideoAdCard = ({ videoAd }) => {
  const [expanded, setExpanded] = useState(false);
  const metrics = getMetricsByVideoId(videoAd.id);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={videoAd.thumbnail}
          alt={videoAd.title}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" sx={{ color: 'white', mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: 'white' }}>
              {videoAd.duration}s
            </Typography>
          </Box>
          <IconButton
            aria-label="play"
            sx={{ color: 'white' }}
            onClick={() => alert('Video player would open here')}
          >
            <PlayArrowIcon />
          </IconButton>
        </Box>
      </Box>

      <CardContent>
        <Typography variant="h6" component="div">
          {videoAd.title}
        </Typography>

        <Box sx={{ mt: 1, mb: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Target Audience:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {videoAd.targetAudience.map((audience, index) => (
              <Chip
                key={index}
                label={audience}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        {metrics && (
          <>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Views
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {metrics.views.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Completions
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {metrics.completions.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  CTR
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {metrics.ctr}%
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={handleExpandClick} size="small">
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Daily Performance (Last 3 Days):
              </Typography>
              {metrics.dailyData.map((day, index) => (
                <Box key={index} sx={{ mt: 1, borderBottom: index < metrics.dailyData.length - 1 ? '1px solid #eee' : 'none', pb: 1 }}>
                  <Typography variant="body2">
                    {new Date(day.date).toLocaleDateString()}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Impressions
                      </Typography>
                      <Typography variant="body2">
                        {day.impressions.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Views
                      </Typography>
                      <Typography variant="body2">
                        {day.views.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Completions
                      </Typography>
                      <Typography variant="body2">
                        {day.completions.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Collapse>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoAdCard;
