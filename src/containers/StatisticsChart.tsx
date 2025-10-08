import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { FC, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../utils';
import { Card, CardBody } from 'reactstrap';

interface MetricData {
  timestamp: number;
  value: number;
}

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  PieController,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  BarController,
  BarElement,
);

export const StatisticsChart: FC = () => {
  const theme = useTheme();
  Chart.defaults.color = theme === `dark` ? `#f0f0e6` : `#231f20`;
  const metrics: MetricData[] = useMemo(() => {
    const result: MetricData[] = [];

    for (let i = 0; i < 100; i++) {
      // Create an entry for once every 10 seconds
      result.push({
        timestamp: Date.now() - 10000 * i,
        value: Math.floor(Math.random() * 3) + 90,
      } satisfies MetricData);
    }

    return result.sort((a, b) => a.timestamp - b.timestamp);
  }, []);

  const labels = metrics.map((m) => new Date(m.timestamp).toLocaleTimeString());
  const data = metrics.map((m) => m.value);

  return (
    <Card className={`border-success-subtle bg-success-subtle`}>
      <CardBody>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: 'API Latency',
                backgroundColor: `#f0f0e6`,
                borderColor: `#008555`,
                borderJoinStyle: 'round',
                data: data,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
            },
            responsive: true,
            scales: {
              y: {
                min: 85,
                max: 100,
                title: { display: true, text: 'Response Time (ms)' },
              },
              x: {
                title: { display: true, text: 'Timestamp' },
              },
            },
          }}
        />
      </CardBody>
    </Card>
  );
};
