import React, { FC, useMemo } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { ServiceStatusCard } from '../components/ServiceStatusCard';
import { useApp } from '../utils';
import { Line } from 'react-chartjs-2';
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

interface MetricData {
  timestamp: number;
  value: number;
}

export const ServiceStatusMessage: FC = () => {
  const { globalServiceStatus: status, serviceMessage: messageOverride } = useApp();

  let color: string;
  let message: string;
  switch (status) {
    case 'up': {
      color = 'success';
      message = 'All services are operational.';
      break;
    }
    case 'partial': {
      color = 'warning';
      message = 'Some services are experiencing degraded performance.';
      break;
    }
    case 'down': {
      color = 'danger';
      message = 'Most or all services are experiencing a major outage.';
      break;
    }
  }

  message = messageOverride ?? message;

  return (
    <Card className={`text-bg-${color}`}>
      <CardBody className="align-middle">
        <CardTitle tag="h5" className="m-0 text-white">
          {message}
        </CardTitle>
      </CardBody>
    </Card>
  );
};

export const ServiceMatrix: FC = () => {
  const { serviceMap } = useApp();
  const serviceList = Object.keys(serviceMap);

  return (
    <Container>
      <Row className="row-cols-2">
        {serviceList.map((s, idx) => (
          <Col className="p-1" key={idx}>
            <ServiceStatusCard serviceName={s} status={serviceMap[s]} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

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

export const StatisticGraph: FC = () => {
  const metrics: MetricData[] = useMemo(() => {
    const result: MetricData[] = [];

    for (let i = 0; i < 100; i++) {
      // Create an entry for once every 10 seconds
      result.push({
        timestamp: Date.now() - 10000 * i,
        value: Math.floor(Math.random() * 5) + 90,
      } satisfies MetricData);
    }

    return result.sort((a, b) => a.timestamp - b.timestamp);
  }, []);

  console.log(metrics);

  const labels = metrics.map((m) => new Date(m.timestamp).toLocaleTimeString())
  const data = metrics.map((m) => m.value)
  const min = Math.min(...metrics.map((m) => m.value))
  const max = Math.max(...metrics.map((m) => m.value))
  const padding = (max - min) / 2;

  const scaleYmin = min - padding;
  const scaleYmax = max + padding;

  return (
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
            // fill: true,
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          // title: { display: true, text: 'API Uptime - Response in Milliseconds' },
          // tooltip: { mode: 'index', intersect: false },
        },
        responsive: true,
        scales: {
          y: {
            min: scaleYmin,
            max: scaleYmax,
            title: { display: true, text: 'Response Time (ms)' },
          },
          x: {
            title: { display: true, text: 'Timestamp' },
          },
        },
      }}
    />
  );
};
