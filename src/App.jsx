import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/scenes/Login/Login';
import Topbar from './components/scenes/global/Topbar';
import Sidebar from './components/scenes/global/Sidebar';
import Student from './components/scenes/students/Student';
import Financial from './components/scenes/Financial/Financial';
import Program from './components/scenes/Program/Program';
import Course from './components/scenes/Courses/Courses';
import Class from './components/scenes/Class/Class';
import Ebook from './components/scenes/Ebook/Ebook';
import AddPost from './components/scenes/AddPost/AddPost';
import ViewPost from './components/scenes/ViewPost/ViewPost';
import Notification from './components/scenes/Notifications/Notifications';
import WhatsNew from './components/scenes/whatsNew/WhatsNew';
import Exam from './components/scenes/exams/Exam';
import Announcement from './components/announcement/Announcement';
import Admissions from './components/scenes/Admissions/Admissions';
import Applications from './components/scenes/Admissions/Applications';
import Interview from './components/scenes/Admissions/Interview';
import Calender from './components/scenes/calender/Calender';
import Cookies from 'js-cookie';
import ForgotPasswordRouter from './components/scenes/global/ForgotPasswordRouter';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is logged in
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (location.pathname !== '/forgot-password') {
        navigate('/login');
      }
    }
  }, [navigate, location.pathname]);

  const showSidebarAndTopbar = isLoggedIn && location.pathname !== '/forgot-password' && location.pathname !== '/login';
  const showDashboard = isLoggedIn && !['/login', '/forgot-password'].includes(location.pathname);

  return (
    <>
      <div className='app'>
        {showSidebarAndTopbar && <Sidebar />}
        <main className='content'>
          {showSidebarAndTopbar && <Topbar />}
          <Routes>
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/forgot-password' element={<ForgotPasswordRouter />} />
            {showDashboard && (
              <>
                <Route path='/students' element={<Student setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/financial' element={<Financial />} />
                <Route path='/programs' element={<Program />} />
                <Route path='/courses' element={<Course />} />
                <Route path='/classes' element={<Class />} />
                <Route path='/ebooks' element={<Ebook />} />
                <Route path='/calender' element={<Calender />} />
                <Route path='/addpost' element={<AddPost />} />
                <Route path='/viewpost' element={<ViewPost />} />
                <Route path='/notifications' element={<Notification />} />
                <Route path='/whatsNew' element={<WhatsNew />} />
                <Route path='/announcements' element={<Announcement />} />
                <Route path='/exams' element={<Exam />} />
                <Route path='/admissions' element={<Admissions />} />
                <Route path='/applications' element={<Applications />} />
                <Route path='/interview' element={<Interview />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
