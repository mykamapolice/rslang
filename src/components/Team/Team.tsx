import React from 'react';
import { CardDeck } from 'react-bootstrap';
import TeamMember, { ITeamMember } from './TeamMember/TeamMember';

const teamMembers: ITeamMember[] = [
  {
    name: 'Vlad',
    photoUrl:
            'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    description: 'Какой-то вклад',
    links: [
      {
        name: 'github',
        imageUrl:
                    'https://www.flaticon.com/free-icon/github_733609?term=github&page=1&position=4&page=1&position=4&related_id=733609&origin=style',
        url: 'https://github.com/vladstepway',
      },
    ],
  },
  {
    name: 'Ilya',
    photoUrl:
            'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    description: 'Какой-то вклад',
    links: [
      {
        name: 'github',
        imageUrl:
                    'https://www.flaticon.com/free-icon/github_733609?term=github&page=1&position=4&page=1&position=4&related_id=733609&origin=style',
        url: 'https://github.com/mykamapolice',
      },
    ],
  },
  {
    name: 'Vasya',
    photoUrl:
            'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    description: 'Какой-то вклад',
    links: [
      {
        name: 'github',
        imageUrl:
                    'https://www.flaticon.com/free-icon/github_733609?term=github&page=1&position=4&page=1&position=4&related_id=733609&origin=style',
        url: 'https://github.com/svdfsdev',
      },
    ],
  },
  {
    name: 'Danik',
    photoUrl:
            'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    description: 'Какой-то вклад',
    links: [
      {
        name: 'github',
        imageUrl:
                    'https://www.flaticon.com/free-icon/github_733609?term=github&page=1&position=4&page=1&position=4&related_id=733609&origin=style',
        url: 'https://github.com/sixstringer91',
      },
    ],
  },
];

function Team() {
  return (
        <CardDeck>
            {teamMembers.map((t) => (
                <TeamMember key={t.name} personData={t} />
            ))}
        </CardDeck>
  );
}

export default Team;
