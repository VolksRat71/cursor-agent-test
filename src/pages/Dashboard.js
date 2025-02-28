import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Tab, Tabs, Divider } from '@mui/material';
import CampaignCard from '../components/CampaignCard';
import VideoAdCard from '../components/VideoAdCard';
import FilterBar from '../components/FilterBar';
import DashboardSummary from '../components/DashboardSummary';
import MetricsChart from '../components/MetricsChart';
import {
  getCampaigns,
  getVideoAdsByCampaignId,
  getCampaignSummaries,
  getSummaryByCampaignId
} from '../utils/dataUtils';

/**
 * Dashboard page component
 * Main page of the application that displays campaign information,
 * video ads, and performance metrics
 */
const Dashboard = () => {
  // State for filtered and displayed campaigns
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [videoAds, setVideoAds] = useState([]);
  const [campaignSummaries, setCampaignSummaries] = useState([]);

  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // State for tab control
  const [tabValue, setTabValue] = useState(0);

  // Load data on component mount
  useEffect(() => {
    const allCampaigns = getCampaigns();
    setCampaigns(allCampaigns);
    setFilteredCampaigns(allCampaigns);
    setCampaignSummaries(getCampaignSummaries());

    // Set default selected campaign if any exist
    if (allCampaigns.length > 0) {
      handleCampaignSelect(allCampaigns[0]);
    }
  }, []);

  // Handle campaign selection
  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setVideoAds(getVideoAdsByCampaignId(campaign.id));
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Apply filters when filter criteria change
  useEffect(() => {
    let results = campaigns;

    // Filter by status
    if (statusFilter !== 'all') {
      results = results.filter(campaign => campaign.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(campaign =>
        campaign.name.toLowerCase().includes(query)
      );
    }

    // Filter by date range
    if (startDate) {
      results = results.filter(campaign =>
        new Date(campaign.startDate) >= new Date(startDate)
      );
    }

    if (endDate) {
      results = results.filter(campaign =>
        new Date(campaign.endDate) <= new Date(endDate)
      );
    }

    setFilteredCampaigns(results);

    // Update selected campaign if it's filtered out
    if (selectedCampaign && !results.find(c => c.id === selectedCampaign.id)) {
      if (results.length > 0) {
        handleCampaignSelect(results[0]);
      } else {
        setSelectedCampaign(null);
        setVideoAds([]);
      }
    }
  }, [statusFilter, searchQuery, startDate, endDate, campaigns]);

  // Format campaign data for charts
  const getChartData = () => {
    if (!selectedCampaign) return null;

    const summary = getSummaryByCampaignId(selectedCampaign.id);
    if (!summary) return null;

    return {
      totalViews: summary.totalViews,
      totalCompletions: summary.totalCompletions,
      totalClicks: 0, // Not available in the mock data
      averageViewRate: summary.averageViewRate,
      averageCompletionRate: summary.averageCompletionRate
    };
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Filter Bar */}
      <FilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* Dashboard Summary */}
      <DashboardSummary campaignSummaries={campaignSummaries} />

      {/* Main Content Area */}
      <Grid container spacing={3}>
        {/* Campaigns Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Campaigns ({filteredCampaigns.length})
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map(campaign => (
              <Box
                key={campaign.id}
                onClick={() => handleCampaignSelect(campaign)}
                sx={{
                  cursor: 'pointer',
                  border: selectedCampaign && selectedCampaign.id === campaign.id
                    ? '2px solid #1976d2'
                    : 'none'
                }}
              >
                <CampaignCard campaign={campaign} />
              </Box>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              No campaigns match the current filters.
            </Typography>
          )}
        </Grid>

        {/* Campaign Details Section */}
        <Grid item xs={12} md={8}>
          {selectedCampaign ? (
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Videos" />
                  <Tab label="Metrics" />
                </Tabs>
              </Box>

              {/* Videos Tab */}
              {tabValue === 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Videos for {selectedCampaign.name}
                  </Typography>
                  <Grid container spacing={2}>
                    {videoAds.length > 0 ? (
                      videoAds.map(videoAd => (
                        <Grid item xs={12} sm={6} key={videoAd.id}>
                          <VideoAdCard videoAd={videoAd} />
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography variant="body1" color="text.secondary">
                          No videos available for this campaign.
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}

              {/* Metrics Tab */}
              {tabValue === 1 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics for {selectedCampaign.name}
                  </Typography>

                  {getChartData() ? (
                    <>
                      <MetricsChart
                        data={getChartData()}
                        campaignName={selectedCampaign.name}
                        chartType="bar"
                      />
                      <MetricsChart
                        data={getChartData()}
                        campaignName={selectedCampaign.name}
                        chartType="pie"
                      />
                    </>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No metrics available for this campaign.
                    </Typography>
                  )}
                </>
              )}
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Select a campaign to view details.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
