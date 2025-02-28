// Import mock data
import campaignsData from '../data/campaigns.json';
import videoAdsData from '../data/videoAds.json';
import metricsData from '../data/metrics.json';

// Function to get all campaigns
export const getCampaigns = () => {
  return campaignsData.campaigns;
};

// Function to get all video ads
export const getVideoAds = () => {
  return videoAdsData.videoAds;
};

// Function to get all ad metrics
export const getAdMetrics = () => {
  return metricsData.adMetrics;
};

// Function to get all campaign summaries
export const getCampaignSummaries = () => {
  return metricsData.campaignSummaries;
};

// Function to get video ads for a specific campaign
export const getVideoAdsByCampaignId = (campaignId) => {
  return videoAdsData.videoAds.filter(
    (videoAd) => videoAd.campaignId === campaignId
  );
};

// Function to get metrics for a specific video
export const getMetricsByVideoId = (videoId) => {
  return metricsData.adMetrics.find(
    (metric) => metric.videoId === videoId
  );
};

// Function to get summary for a specific campaign
export const getSummaryByCampaignId = (campaignId) => {
  return metricsData.campaignSummaries.find(
    (summary) => summary.campaignId === campaignId
  );
};

// Function to get a campaign by id
export const getCampaignById = (campaignId) => {
  return campaignsData.campaigns.find(
    (campaign) => campaign.id === campaignId
  );
};

// Function to filter campaigns by status
export const getCampaignsByStatus = (status) => {
  return campaignsData.campaigns.filter(
    (campaign) => campaign.status === status
  );
};

// Function to calculate budget utilization as a percentage
export const calculateBudgetUtilization = (campaign) => {
  return (campaign.spent / campaign.budget) * 100;
};
