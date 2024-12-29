import React, { useState, useEffect } from 'react';
import CourseCard from './Coursecard';
import AdminPageModal from './Adminpagemodal';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './AdminStyles.css';
import Header from './../Header/Header';
import AdminForm from './AdminForm';
import AdminsTable from './AdminsTable';

function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [cookies] = useCookies(['access_token']);
  const [admins, setAdmins] = useState([]);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      const token = cookies.access_token;
      if (!token) return console.error("No token found");

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/course/allcourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [cookies.access_token,courses]);

  // Delete a course
  const deleteCourse = async (id) => {
    const token = cookies.access_token;
    if (!token) return console.error("No token found");

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/course/deletecourse/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div>
       <Header />
       <h1 className='title'>Courses</h1>
      <div className="coursesGrid">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            title={course.title}
            price={course.price}
            image={course.image}
            onClick={() => openModal(course)}
            onDelete={() => deleteCourse(course._id)}
          />
        ))}
      </div>
      <button className="addCourseButton" onClick={() => openModal(null)}>+</button>
      <AdminPageModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedCourse={selectedCourse}
        setCourses={setCourses}
        courses={courses}
      />
        <div>
      <h1 className='title'>Manage Admins</h1>
      <AdminForm setAdmins={setAdmins} />
      <AdminsTable setAdmins={setAdmins} />
    </div>
    </div>
  );
}

export default AdminPage;
