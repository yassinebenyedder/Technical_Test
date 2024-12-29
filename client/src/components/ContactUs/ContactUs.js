import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactUs.module.css';
import img from '../../assets/Contact.png';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to Express server
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/contact/contactus`, formData);
      
      if (response.status === 201) {
        setSubmitStatus('Message sent successfully');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus('Error sending message, please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.contactUs}>
      <div className={styles.contactUsContent}>
        <div className={styles.contactImage}>
          <img src={img} alt="Contact" />
        </div>
        <div className={styles.contactForm}>
          <h2>Contact Us</h2>
           {/* Display status message */}
          {submitStatus && <p style={{ color: 'green' }}>{submitStatus}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
