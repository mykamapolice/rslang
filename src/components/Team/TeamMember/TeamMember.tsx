import React from 'react';
import { Card } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';
import styles from './TeamMember.module.css';

export interface ISocialLink {
    name: string
    imageUrl: string
    url: string
}

export interface ITeamMember {
    links: ISocialLink[]
    photoUrl: string
    description: string
    name: string
}

function TeamMember({
  personData: {
    links, photoUrl, description, name,
  },
}: any) {
  return (
        <Card className={styles.card}>
            <Card.Img variant="top" src={photoUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Body>
                {links.map((l: any) => (
                    <Card.Link href={l.url} target="_blank">
                        <Github />
                        {l.name}
                    </Card.Link>
                ))}
            </Card.Body>
        </Card>
  );
}

export default TeamMember;
