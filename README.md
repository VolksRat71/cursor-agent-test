# Video Ad Campaign Dashboard Implementation Prompt

## Project Brief
Create a simple React video ad campaign dashboard using create-react-app and Material UI (MUI).

This should be a client-only application with the following features:
1. A dashboard overview page showing key metrics for video ad campaigns
2. A video preview component to display sample video ads
3. Basic filtering functionality
4. Use the provided mock data JSON files for all data needs (no API calls)

## Technical Requirements
- Start with npx create-react-app@latest .
- Use Material UI (@mui/material, @mui/icons-material)
- Create straightforward components with minimal nesting
- Use React hooks for state management (no Redux)
- Include comments explaining key functionality
- Ensure all components mount correctly on first run

## Implementation Steps
Please implement step-by-step, starting with:
1. Project setup and folder structure
2. Basic components
3. Dashboard layout
4. Data integration
5. Styling and refinement

## Mock Data
The implementation should use the following mock data files:

### campaigns.json
```json
{
  "campaigns": [
    {
      "id": "c001",
      "name": "Summer Sale Promotion",
      "startDate": "2023-06-01",
      "endDate": "2023-08-31",
      "budget": 25000,
      "spent": 18750,
      "status": "active"
    },
    {
      "id": "c002",
      "name": "Product Launch - UltraView Pro",
      "startDate": "2023-07-15",
      "endDate": "2023-10-15",
      "budget": 50000,
      "spent": 22500,
      "status": "active"
    },
    {
      "id": "c003",
      "name": "Holiday Special",
      "startDate": "2023-11-01",
      "endDate": "2023-12-31",
      "budget": 35000,
      "spent": 0,
      "status": "scheduled"
    },
    {
      "id": "c004",
      "name": "Brand Awareness Q2",
      "startDate": "2023-04-01",
      "endDate": "2023-06-30",
      "budget": 18000,
      "spent": 18000,
      "status": "completed"
    }
  ]
}
```

### videoAds.json
```json
{
  "videoAds": [
    {
      "id": "v001",
      "campaignId": "c001",
      "title": "Summer Deals Promo",
      "duration": 30,
      "thumbnail": "https://via.placeholder.com/320x180?text=Summer+Promo",
      "videoUrl": "https://example.com/videos/summer-promo.mp4",
      "targetAudience": ["18-34", "shoppers", "mobile users"]
    },
    {
      "id": "v002",
      "campaignId": "c001",
      "title": "Beach Collection",
      "duration": 15,
      "thumbnail": "https://via.placeholder.com/320x180?text=Beach+Collection",
      "videoUrl": "https://example.com/videos/beach-collection.mp4",
      "targetAudience": ["25-40", "fashion", "summer"]
    },
    {
      "id": "v003",
      "campaignId": "c002",
      "title": "UltraView Pro - Features",
      "duration": 45,
      "thumbnail": "https://via.placeholder.com/320x180?text=UltraView+Features",
      "videoUrl": "https://example.com/videos/ultraview-features.mp4",
      "targetAudience": ["25-50", "tech enthusiasts", "professionals"]
    },
    {
      "id": "v004",
      "campaignId": "c002",
      "title": "UltraView Pro - Testimonials",
      "duration": 60,
      "thumbnail": "https://via.placeholder.com/320x180?text=UltraView+Testimonials",
      "videoUrl": "https://example.com/videos/ultraview-testimonials.mp4",
      "targetAudience": ["30-55", "business users", "tech buyers"]
    },
    {
      "id": "v005",
      "campaignId": "c003",
      "title": "Holiday Gift Guide",
      "duration": 30,
      "thumbnail": "https://via.placeholder.com/320x180?text=Holiday+Gift+Guide",
      "videoUrl": "https://example.com/videos/holiday-guide.mp4",
      "targetAudience": ["all ages", "holiday shoppers", "gift givers"]
    },
    {
      "id": "v006",
      "campaignId": "c004",
      "title": "Brand Story",
      "duration": 90,
      "thumbnail": "https://via.placeholder.com/320x180?text=Brand+Story",
      "videoUrl": "https://example.com/videos/brand-story.mp4",
      "targetAudience": ["all demographics", "new customers", "brand discovery"]
    }
  ]
}
```

### metrics.json
```json
{
  "adMetrics": [
    {
      "videoId": "v001",
      "impressions": 145678,
      "views": 89432,
      "completions": 52145,
      "clicks": 4521,
      "ctr": 3.1,
      "dailyData": [
        {"date": "2023-06-01", "impressions": 4521, "views": 2678, "completions": 1540},
        {"date": "2023-06-02", "impressions": 5125, "views": 3254, "completions": 1876},
        {"date": "2023-06-03", "impressions": 4876, "views": 3021, "completions": 1745}
      ]
    },
    {
      "videoId": "v002",
      "impressions": 98452,
      "views": 67234,
      "completions": 48721,
      "clicks": 3254,
      "ctr": 3.3,
      "dailyData": [
        {"date": "2023-06-01", "impressions": 3245, "views": 2154, "completions": 1532},
        {"date": "2023-06-02", "impressions": 3521, "views": 2365, "completions": 1702},
        {"date": "2023-06-03", "impressions": 3421, "views": 2284, "completions": 1648}
      ]
    },
    {
      "videoId": "v003",
      "impressions": 76543,
      "views": 45231,
      "completions": 28765,
      "clicks": 2876,
      "ctr": 3.8,
      "dailyData": [
        {"date": "2023-07-15", "impressions": 5432, "views": 3212, "completions": 2102},
        {"date": "2023-07-16", "impressions": 5876, "views": 3521, "completions": 2234},
        {"date": "2023-07-17", "impressions": 5432, "views": 3198, "completions": 2051}
      ]
    },
    {
      "videoId": "v004",
      "impressions": 54328,
      "views": 32156,
      "completions": 18976,
      "clicks": 1876,
      "ctr": 3.5,
      "dailyData": [
        {"date": "2023-07-15", "impressions": 3298, "views": 1945, "completions": 1154},
        {"date": "2023-07-16", "impressions": 3521, "views": 2087, "completions": 1232},
        {"date": "2023-07-17", "impressions": 3289, "views": 1965, "completions": 1143}
      ]
    },
    {
      "videoId": "v006",
      "impressions": 238976,
      "views": 156432,
      "completions": 98543,
      "clicks": 8765,
      "ctr": 3.7,
      "dailyData": [
        {"date": "2023-04-01", "impressions": 7654, "views": 5021, "completions": 3157},
        {"date": "2023-04-02", "impressions": 8123, "views": 5287, "completions": 3321},
        {"date": "2023-04-03", "impressions": 7896, "views": 5154, "completions": 3254}
      ]
    }
  ],
  "campaignSummaries": [
    {
      "campaignId": "c001",
      "totalImpressions": 244130,
      "totalViews": 156666,
      "totalCompletions": 100866,
      "averageViewRate": 64.2,
      "averageCompletionRate": 64.4
    },
    {
      "campaignId": "c002",
      "totalImpressions": 130871,
      "totalViews": 77387,
      "totalCompletions": 47741,
      "averageViewRate": 59.1,
      "averageCompletionRate": 61.7
    },
    {
      "campaignId": "c003",
      "totalImpressions": 0,
      "totalViews": 0,
      "totalCompletions": 0,
      "averageViewRate": 0,
      "averageCompletionRate": 0
    },
    {
      "campaignId": "c004",
      "totalImpressions": 238976,
      "totalViews": 156432,
      "totalCompletions": 98543,
      "averageViewRate": 65.5,
      "averageCompletionRate": 63.0
    }
  ]
}
```

## Expected Features
The dashboard should include:

1. **Campaign Overview Section**
   - Display active, scheduled, and completed campaigns
   - Show budget utilization and timeline
   - Summary of key performance metrics per campaign

2. **Video Ad Component**
   - Thumbnail display with basic playback controls
   - Video metadata (duration, target audience, etc.)
   - Performance metrics for each video

3. **Metrics Visualization**
   - Charts showing view rates, completion rates, and CTR
   - Daily performance trends
   - Comparison across campaigns

4. **Filtering Options**
   - By campaign status (active, scheduled, completed)
   - By date range
   - By performance metrics

## Design Guidelines
- Use a clean, professional design suitable for a business dashboard
- Implement responsive layouts that work on desktop and tablet
- Follow MUI design patterns and component guidelines
- Use a consistent color scheme throughout the application
