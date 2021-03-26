import React from 'react';
import { Card } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './TeamMember.css';

export interface ISocialLink {
    name: string
    url: string
}

export interface ITeamMember {
    links: ISocialLink[]
    photoUrl: string
    description: string
    name: string
}

export const SocialLink = ({ link: { name, url } }: any) => (
        <div className="p-2" >
            <a
              href={url}
              className={`social-icon ${name} animate`}
              target="_blank"
              rel="noreferrer"
            >
                {name === 'github' ? <Github/> : <Linkedin/>}
            </a>
        </div>
);

function TeamMember({
  personData: {
    links, photoUrl, description, name,
  },
}: any) {
  return (
        <Card className="card">
            <Card.Img variant="top" src={photoUrl}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Body className="d-flex justify-content-around">
                {links.map((l: ISocialLink) => (
                    <SocialLink key={l.name} link={l}/>
                ))}
            </Card.Body>
        </Card>
  );
}

export default TeamMember;
