import React from 'react';
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
  const renderCourse = (CourseComponent, index) => {
    const courseNumber = index + 1;
    const courseId = courseIds ? courseIds[courseNumber] : null;

    const courseElement = <CourseComponent key={index} />;

    if (!interactive && courseId && linkPattern) {
      return (
        <div key={index}>
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
      <div key={index}>
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