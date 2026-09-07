import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateTimeSeries } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DeformationChart({ zone, animateForecast = false }) {
  if (!zone) return null;

  const timeSeries = generateTimeSeries(zone);

  const data = {
    labels: timeSeries.labels,
    datasets: [
      // Observed SBAS-InSAR Time Series
      {
        label: 'Observed Displacement (InSAR)',
        data: timeSeries.observed,
        borderColor: '#06b6d4', // Cyan
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderWidth: 2.5,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#0b0f19',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#06b6d4',
        pointRadius: 3,
        pointHoverRadius: 6,
        tension: 0.25,
        fill: true,
      },
      // 30-Day LSTM Forecast Curve (Dashed line)
      {
        label: '30-Day LSTM Forecast',
        data: timeSeries.forecast,
        borderColor: zone.riskLevel === 'CRITICAL' || zone.riskLevel === 'HIGH' ? '#f97316' : '#f59e0b',
        borderDash: [6, 4],
        borderWidth: 2.5,
        pointBackgroundColor: zone.riskLevel === 'CRITICAL' || zone.riskLevel === 'HIGH' ? '#f97316' : '#f59e0b',
        pointBorderColor: '#0b0f19',
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.25,
        fill: false,
      },
      // Upper Confidence Interval
      {
        label: '95% Confidence Upper',
        data: timeSeries.confidenceUpper,
        borderColor: 'rgba(249, 115, 22, 0.25)',
        borderDash: [2, 2],
        borderWidth: 1,
        pointRadius: 0,
        fill: '+1', // fill down to confidence lower
        backgroundColor: 'rgba(249, 115, 22, 0.08)',
      },
      // Lower Confidence Interval
      {
        label: '95% Confidence Lower',
        data: timeSeries.confidenceLower,
        borderColor: 'rgba(249, 115, 22, 0.25)',
        borderDash: [2, 2],
        borderWidth: 1,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: animateForecast ? 1500 : 800,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: '#9ca3af',
          font: {
            family: "'JetBrains Mono', monospace",
            size: 10,
          },
          usePointStyle: true,
          boxWidth: 8,
          filter: (legendItem) => !legendItem.text.includes('Confidence'),
        },
      },
      tooltip: {
        backgroundColor: 'rgba(11, 15, 25, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#38bdf8',
        borderColor: 'rgba(6, 182, 212, 0.4)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const val = context.parsed.y;
            if (val === null) return '';
            return ` Displacement: ${val} mm`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: "'JetBrains Mono', monospace",
            size: 9,
          },
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.06)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: "'JetBrains Mono', monospace",
            size: 10,
          },
          callback: (value) => `${value} mm`,
        },
        title: {
          display: true,
          text: 'Surface Displacement (mm)',
          color: '#6b7280',
          font: {
            size: 10,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-52 relative">
      <Line data={data} options={options} />
    </div>
  );
}
