import React from 'react';
import { CardDeck } from 'react-bootstrap';
import TeamMember, { ITeamMember } from './TeamMember/TeamMember';
import { publicFolder } from '../../utils/constants';


export const teamMembers: ITeamMember[] = [
  {
    name: 'Vlad',
    photoUrl:
            'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    description: 'Структура приложения, дизайн приложения, вёрстка, адаптив',
    links: [
      {
        name: 'github',
        url: 'https://github.com/vladstepway',
      },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/vlad-stepovoy/',
      },
    ],
  },
  {
    name: 'Ilya',
    photoUrl:
            `${publicFolder}/ilya.jpg`,
    description: 'Авторизация пользователя, логика игрового блока, блок статистики, игра Аудиовызов, игра "Swoja Igra"',
    links: [
      {
        name: 'github',
        url: 'https://github.com/mykamapolice',
      },
    ],
  },
  {
    name: 'Vasya',
    photoUrl:
            'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    description: 'Бэкенд, логика блока статистики, авторизация, игра "Спринт" ',
    links: [
      {
        name: 'github',
        url: 'https://github.com/svdfsdev',
      },
    ],
  },
  {
    name: 'Danik',
    photoUrl:
            `${publicFolder}/danik.jpg`,
    description: 'Электронный учебник, словарь, настройки, игра "Саванна", логика игрового блока',
    links: [
      {
        name: 'github',
        url: 'https://github.com/sixstringer91',
      },
    ],
  },
];

function Team() {
  return (
        <CardDeck className='container mx-auto flex-wrap align-items-center' style={{flexGrow:1}}>
            {teamMembers.map((t) => (
                <TeamMember key={t.name} personData={t} />
            ))}
        </CardDeck>
  );
}

export default Team;
