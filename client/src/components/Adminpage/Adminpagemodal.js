import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import './AdminStyles.css';

function AdminPageModal({ isOpen, closeModal, selectedCourse, setCourses, courses }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [cookies] = useCookies(['access_token']);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title);
      setPrice(selectedCourse.price);
      setImage(selectedCourse.image);
    } else {
      setTitle('');
      setPrice('');
      setImage('');
    }
  }, [selectedCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.access_token;

    try {
      const endpoint = selectedCourse
        ? `${process.env.REACT_APP_API_BASE_URL}/course/updatecourse/${selectedCourse._id}`
        : `${process.env.REACT_APP_API_BASE_URL}/course/createcourse`;

      const method = selectedCourse ? 'patch' : 'post';

      if (!title || !price) {
        setErrorMessage("Title and price are required");
        return;
      }

      const response = await Axios[method](endpoint, { title, price, image }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const updatedCourses = selectedCourse
          ? courses.map(course => (course._id === selectedCourse._id ? response.data : course))
          : [...courses, response.data];
        setCourses(updatedCourses);
        closeModal();
      }
    } catch (error) {
      console.error("Error saving course:", error);
      setErrorMessage("Failed to save the course");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
      <form className="courseForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <button type="submit">Save</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
}

export default AdminPageModal;
