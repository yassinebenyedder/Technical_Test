import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SectionOne from './components/SectionOne/SectionOne';
import Course from './components/Course/Course';
import ContactUs from './components/ContactUs/ContactUs';
import Adminpage from './components/Adminpage/Adminpage';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header />
              <SectionOne />
              <Course />
              <ContactUs />
            </>
          } 
        />
        {/* This is the route for "/admin" protected */}
        <Route path="/admin" element={<ProtectedRoute element={<Adminpage />} />} />
        <Route path='/adminlogin' element={<LoginAdmin/>}/>
      </Routes>
    </div>
  );
}

export default App;


