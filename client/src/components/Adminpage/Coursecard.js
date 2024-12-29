import React from 'react';
import './AdminStyles.css';
function CourseCard({ title, price, image, onClick, onDelete }) {
  return (
    <div className="courseCard">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price} TND /Month</p>
      <button onClick={onClick}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default CourseCard;
