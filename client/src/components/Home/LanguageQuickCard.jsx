import React from 'react';
import { Link } from 'react-router-dom';
import './LanguageQuickCards.css';

export default function LanguageQuickCard(props) {
  return (
    <Link
      to={{
        pathname: '/tutor/list/courses',
        courseName: `${props.langName.toLowerCase()}`,
      }}
      className='languageCard'
    >
      <div>
        <img
          className='langIcon'
          src={props.urlToImg}
          width='35vw'
          alt={props.langName + '-language-card'}
        />
        {props.langName[0].toUpperCase() + props.langName.slice(1)} tutors
        <p className='programingDescription'>{props.shortLangDescription}</p>
      </div>
    </Link>
  );
}
