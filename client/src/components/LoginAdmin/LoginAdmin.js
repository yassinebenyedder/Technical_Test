import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import img1 from '../../assets/sectiononepic.jpg';
import styles from './LoginAdmin.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookies] = useCookies(['access_token']);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const res = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/login`, {
        email: email,
        password: password,
      });
      if (res.status === 201) {
        setCookies('access_token', res.data.token, { path: '/', maxAge: 3600 });
        window.localStorage.setItem('adminID', res.data.id);
        window.localStorage.setItem('adminname', res.data.username);
        setSuccessMessage('Login successful!');

        // Redirect after setting cookies
        setTimeout(() => {
          // Clear the cookie
          setCookies('access_token', '', { path: '/', maxAge: -1 });
          navigate('/adminlogin'); 
        }, 3600000); // After one hour the token expires and redirect you to /adminlogin

        navigate('/admin');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-container']}>
        <img src={img1} alt='login img' className={styles['login-image']} />
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Please login to your account</p>

          {errorMessage && <p className={styles['error-message']} style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p className={styles['success-message']} style={{ color: 'green' }}>{successMessage}</p>}
          
          <div className={styles['input-group']}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
              minLength="8"
            />
          </div>

          <button type="submit" className={styles['login-button']}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
