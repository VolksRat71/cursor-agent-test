import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Divider
} from '@mui/material';
import {
  MonetizationOn,
  Visibility,
  CheckCircle,
  Campaign
} from '@mui/icons-material';

/**
 * DashboardSummary component
 * Displays a summary of key metrics across all campaigns
 */
const DashboardSummary = ({ campaignSummaries }) => {
  // Calculate total values across all campaigns
  const totalImpressions = campaignSummaries.reduce(
    (sum, campaign) => sum + campaign.totalImpressions,
    0
  );

  const totalViews = campaignSummaries.reduce(
    (sum, campaign) => sum + campaign.totalViews,
    0
  );

  const totalCompletions = campaignSummaries.reduce(
    (sum, campaign) => sum + campaign.totalCompletions,
    0
  );

  // Calculate overall averages
  const overallViewRate = totalImpressions > 0
    ? ((totalViews / totalImpressions) * 100).toFixed(1)
    : 0;

  const overallCompletionRate = totalViews > 0
    ? ((totalCompletions / totalViews) * 100).toFixed(1)
    : 0;

  // Define summary items with icons
  const summaryItems = [
    {
      title: 'Total Impressions',
      value: totalImpressions.toLocaleString(),
      icon: <Campaign color="primary" sx={{ fontSize: 40 }} />,
      color: '#e3f2fd'
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: <Visibility color="secondary" sx={{ fontSize: 40 }} />,
      color: '#e8f5e9'
    },
    {
      title: 'Total Completions',
      value: totalCompletions.toLocaleString(),
      icon: <CheckCircle color="success" sx={{ fontSize: 40 }} />,
      color: '#fff8e1'
    },
    {
      title: 'Overall View Rate',
      value: `${overallViewRate}%`,
      icon: <MonetizationOn color="warning" sx={{ fontSize: 40 }} />,
      color: '#ffebee'
    }
  ];

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Campaign Performance Summary
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {summaryItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: item.color,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {item.icon}
                <Box sx={{ ml: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h5" component="div" fontWeight="medium">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default DashboardSummary;
