import React, { FC, useEffect, useMemo, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { NavBar } from './components/NavBar';
import { ServiceStatusCard } from './components/ServiceStatusCard';
import { ApplicationContext, ApplicationData, DEFAULT_APP_VALUES, useApp } from './utils';
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

export const App: FC = () => {
  const [application, setApplication] = useState<ApplicationData>(DEFAULT_APP_VALUES);

  useEffect(() => {
    const settings = localStorage.getItem('prototypeSettings');
    if (settings) {
      setApplication(JSON.parse(settings) as ApplicationData);
    }
  }, [setApplication]);

  useEffect(() => {
    localStorage.setItem('prototypeSettings', JSON.stringify(application));
  }, [application]);

  return (
    <ApplicationContext.Provider value={{ application, setApplication }}>
      <Container>
        <a href="#main" className="sr-only">
          Skip to main content
        </a>
        <NavBar />
        <main>
          <Row>
            {/* Spacer */}
            <Col xl="1" lg="1" />
            <Col xl="10" md="12">
              {/* General Status Indicator */}
              <h3>Current Status</h3>
              <ServiceStatusMessage />
              {/* Service matrix */}
              <br />
              <h3>Individual Services</h3>
              <ServiceMatrix />
              {/* Statistical graphs */}
              <br />
              <h3>Statistics</h3>
              <StatisticGraph />
            </Col>
            {/* Spacer */}
            <Col xl="1" />
          </Row>
        </main>
      </Container>
    </ApplicationContext.Provider>
  );
};

const ServiceStatusMessage: FC = () => {
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

const ServiceMatrix: FC = () => {
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

interface MetricData {
  timestamp: number;
  value: number;
}

const StatisticGraph: FC = () => {
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

  return (
    <Line
      data={{
        labels: metrics.map((m) => new Date(m.timestamp).toLocaleTimeString()),
        datasets: [
          {
            label: 'API Latency',
            backgroundColor: `rgb(255, 255, 255)`,
            borderColor: `rgb(255, 255, 255)`,
            data: metrics.map((m) => m.value),
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
            min: 80,
            max: Math.max(...metrics.map((m) => m.value)) + 30,
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
