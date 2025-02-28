import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
  Grid
} from '@mui/material';
import { calculateBudgetUtilization, getSummaryByCampaignId } from '../utils/dataUtils';

/**
 * CampaignCard component
 * Displays information about a single campaign including its status,
 * budget utilization, and key performance metrics
 */
const CampaignCard = ({ campaign }) => {
  const budgetUtil = calculateBudgetUtilization(campaign);
  const summary = getSummaryByCampaignId(campaign.id);

  // Function to determine color based on campaign status
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'scheduled': return 'warning';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" component="div">
            {campaign.name}
          </Typography>
          <Chip
            label={campaign.status}
            size="small"
            color={getStatusColor(campaign.status)}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
        </Typography>

        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Budget Utilization: ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={budgetUtil}
            sx={{ mt: 1, mb: 1, height: 8, borderRadius: 5 }}
          />
          <Typography variant="body2" color="text.secondary" align="right">
            {budgetUtil.toFixed(1)}%
          </Typography>
        </Box>

        {summary && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">
                Impressions
              </Typography>
              <Typography variant="h6">
                {summary.totalImpressions.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">
                View Rate
              </Typography>
              <Typography variant="h6">
                {summary.averageViewRate}%
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">
                Completion Rate
              </Typography>
              <Typography variant="h6">
                {summary.averageCompletionRate}%
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
