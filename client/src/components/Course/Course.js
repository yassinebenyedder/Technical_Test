import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Course.module.css';

function Course() {
  const [courses, setCourses] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/course/allcourses`); // Update with your API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Only show the first 6 courses
  const displayedCourses = showMore ? courses : courses.slice(0, 6);

  return (
    <div>
      <div className={styles.courseHeader}>
        <h1>Discover Our Courses</h1>
        {courses.length > 6 && (
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'View Less' : 'View More'}
          </button>
        )}
      </div>

      <div className={styles.courseSection}>
        {displayedCourses.map((course, index) => (
          <div key={index} className={styles.courseCard}>
            <img src={course.image} alt={course.title} />
            <div className={styles.courseContent}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.coursePrice}>{course.price}TND /Month</p>
              <button className={styles.courseButton}>Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
