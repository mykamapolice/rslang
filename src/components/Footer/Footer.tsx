import React from 'react';
import { Card } from 'react-bootstrap';
import { teamMembers } from '../Team/Team';
import { SocialLink } from '../Team/TeamMember/TeamMember';

function Footer(): JSX.Element {
  return (
        <div className="col-lg-12 mt-3 bg-light d-flex mt-auto justify-content-around">
            <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
                <img
                    style={{ height: '2rem' }}
                    src="https://rs.school/images/rs_school_js.svg"
                    alt="rs-logo"
                    className="img-fluid"
                />
            </a>
            {teamMembers.map((t) => (
                <Card key={t.name} style={{ width: '10rem' }}>
                    <Card.Body className="d-flex p-0">
                        <Card.Title className="m-2">{t.name}</Card.Title>
                        {t.links.map((l) => (
                            <SocialLink key={l.name} link={l} />
                        ))}
                    </Card.Body>
                </Card>
            ))}
        </div>
  );
}

export default Footer;
