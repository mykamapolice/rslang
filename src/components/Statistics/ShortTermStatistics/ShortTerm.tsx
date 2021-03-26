import React from 'react';
import {
  Accordion, Button, Card, Table,
} from 'react-bootstrap';
import StatItem from './StatItem/StatItem';
import GeneralStatistic from './GeneralStatistic/GeneralStatistics';

const ShortTermStatistics = () => (
  <div>
    <Accordion defaultActiveKey="0">
      <Card style={{
        margin: '0 auto',
        width: '100%',
      }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Общая статистика за день
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <GeneralStatistic />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={{
        margin: '0 auto',
        width: '100%',
      }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            Саванна
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body><StatItem /></Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={{
        margin: '0 auto',
        width: '100%',
      }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="2">
            Аудиовызов
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body><StatItem /></Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={{
        margin: '0 auto',
        width: '100%',
      }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="3">
            Спринт
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body><StatItem /></Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={{
        margin: '0 auto',
        width: '100%',
      }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="4">
            Своя игра
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body><StatItem /></Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </div>
);

export default ShortTermStatistics;
