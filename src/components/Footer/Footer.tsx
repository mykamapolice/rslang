import React from 'react'
import { Card } from 'react-bootstrap'
import { teamMembers } from '../Team/Team'
import { SocialLink } from '../Team/TeamMember/TeamMember'

function Footer(): JSX.Element {
    return (
        <div className="footer col-lg-12 mt-3 bg-light d-flex mt-auto justify-content-around">
            <div className={"d-flex align-items-center"}>
                <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
                    <img
                        style={{ height: '2rem' }}
                        src="https://rs.school/images/rs_school_js.svg"
                        alt="rs-logo"
                        className="img-fluid"
                    />
                </a>
                <h1>2021</h1>
            </div>
            <div className={"members"}>{teamMembers.map((t) => (
                <Card key={t.name} style={{ width: '10rem',padding:'5px', margin: '5px' }}>
                    <Card.Body className="d-flex p-0">
                        <Card.Title className="m-2">{t.name}</Card.Title>
                        {t.links.map((l) => (
                            <SocialLink key={l.name} link={l}/>
                        ))}
                    </Card.Body>
                </Card>
            ))}</div>
        </div>
    )
}

export default Footer
