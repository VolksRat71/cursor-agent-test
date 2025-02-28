import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

/**
 * MetricsChart component
 * Displays various charts for visualizing campaign metrics
 * Uses recharts library for rendering charts
 */
const MetricsChart = ({ data, campaignName, chartType = 'bar' }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Format data for pie chart
  const preparePieData = () => {
    return [
      { name: 'Views', value: data.totalViews },
      { name: 'Completions', value: data.totalCompletions },
      { name: 'Clicks', value: data.totalClicks || 0 }
    ];
  };

  // Format label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${payload.name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Sample data for daily trend chart
  const dailyTrendData = [
    {
      name: 'Day 1',
      views: data.dailyViews ? data.dailyViews[0] : 1000,
      completions: data.dailyCompletions ? data.dailyCompletions[0] : 600,
    },
    {
      name: 'Day 2',
      views: data.dailyViews ? data.dailyViews[1] : 1200,
      completions: data.dailyCompletions ? data.dailyCompletions[1] : 700,
    },
    {
      name: 'Day 3',
      views: data.dailyViews ? data.dailyViews[2] : 900,
      completions: data.dailyCompletions ? data.dailyCompletions[2] : 500,
    },
  ];

  // Render bar chart for daily trends
  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={dailyTrendData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="views" fill="#8884d8" name="Views" />
        <Bar dataKey="completions" fill="#82ca9d" name="Completions" />
      </BarChart>
    </ResponsiveContainer>
  );

  // Render pie chart for overall metrics
  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={preparePieData()}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {preparePieData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {campaignName} - Performance Metrics
      </Typography>
      {chartType === 'bar' ? renderBarChart() : renderPieChart()}
    </Paper>
  );
};

export default MetricsChart;
