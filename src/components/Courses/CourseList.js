import React from 'react';
import FavoriteButton from '../FavoriteButton';
import { useFavorites } from '../../hooks/useFavorites';
import { BASE_COURSE_INFO } from './courseIds';
import Course1 from './Course1';
import Course2 from './Course2';
import Course3 from './Course3';
import Course4 from './Course4';
import Course5 from './Course5';
import Course6 from './Course6';
import Course7 from './Course7';
import Course8 from './Course8';
import Course9 from './Course9';
import Course10 from './Course10';
import Course11 from './Course11';

// Course components mapping
const COURSE_COMPONENTS = [
  Course1,
  Course2,
  Course3,
  Course4,
  Course5,
  Course6,
  Course7,
  Course8,
  Course9,
  Course10,
  Course11
];

const CourseList = ({ interactive = true, courseIds, linkPattern }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const renderCourse = (CourseComponent, index) => {
    const courseNumber = index + 1;
    const courseId = courseIds ? courseIds[courseNumber] : null;
    const info = BASE_COURSE_INFO[index];

    const courseElement = <CourseComponent key={index} />;

    const favoriteToggle = info && (
      <FavoriteButton
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
        active={isFavorite(info.id)}
        onToggle={() => toggleFavorite(info)}
      />
    );

    if (!interactive && courseId && linkPattern) {
      return (
        <div key={index} style={{ position: 'relative', maxWidth: 500, margin: '0 auto' }}>
          {favoriteToggle}
          <a 
            href={`${linkPattern}/${courseId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            {courseElement}
          </a>
          <br />
        </div>
      );
    }

    return (
      <div key={index} style={{ position: 'relative', maxWidth: 500, margin: '0 auto' }}>
        {favoriteToggle}
        {courseElement}
        <br />
      </div>
    );
  };

  return (
    <div>
      {COURSE_COMPONENTS.map((CourseComponent, index) => 
        renderCourse(CourseComponent, index)
      )}
    </div>
  );
};

export default CourseList;