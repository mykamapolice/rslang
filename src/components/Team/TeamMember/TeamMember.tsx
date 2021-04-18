import React from 'react';
import { Card } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './TeamMember.css';

export interface ISocialLink {
    name: string;
    url: string;
}

export interface ITeamMember {
    links: ISocialLink[];
    photoUrl: string;
    description: string;
    name: string;
}

export const SocialLink = ({ link: { name, url } }: any) => (
    <div className="p-2">
        <a
          href={url}
          className={`social-icon ${name} animate`}
          target="_blank"
          rel="noreferrer"
        >
            {name === 'github' ? <Github /> : <Linkedin />}
        </a>
    </div>
);

function TeamMember({
  personData: {
    links, photoUrl, description, name,
  },
}: any) {
  return (
        <div className={`card mx-auto pb-2 mt-2`} style={{height:'500px', minWidth:'250px'}}>
            <img src={`${photoUrl}`} className="card-img-top" style={{height:'250px',  objectFit:'cover'}} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
            </div>
            <div className="d-flex justify-content-around align-items-center">
                {links.map((l: ISocialLink) => (
                    <SocialLink key={l.name} link={l} />
                ))}
            </div>
        </div>
  );
}

export default TeamMember;
