import './App.css';
// import Login from './components/Login';
import '../src/components/Fontawesome'
import Topbar from './components/scenes/global/Topbar';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/scenes/global/Sidebar';
import Dashboard from './components/scenes/dashboard/Dashboard';
import Student from './components/scenes/students/Student';
import Financial from './components/scenes/Financial/Financial';
import Program from './components/scenes/Program/Program';
import Course from './components/scenes/Courses/Courses';
import Ebook from './components/scenes/Ebook/Ebook';
import Class from './components/scenes/Class/Class';
import AddPost from './components/scenes/AddPost/AddPost';
import ViewPost from './components/scenes/ViewPost/ViewPost';
import Notification from './components/scenes/Notifications/Notifications';
import WhatsNew from './components/scenes/whatsNew/WhatsNew';
import Exam from './components/scenes/exams/Exam';
import Announcement from './components/announcement/Announcement';

function App() {

  return (
    <>
      <div className='app'>
        <Sidebar/>
        <main className='content'>
          <Topbar />
          <Routes>
            <Route path='/' element={<Dashboard/> } />
            <Route path='/students' element={<Student/> } />
            <Route path='/ebook' element={<Ebook/> } />
            <Route path='/financial' element={<Financial/> } />
            <Route path='/programs' element={<Program/> } />
            <Route path='/courses' element={<Course/> } />
            <Route path='/classes' element={<Class/> } />
            <Route path='/ebooks' element={<Ebook/> } />
            {/* <Route path='/calender' element={<Calender/> } /> */}
            <Route path='/addpost' element={<AddPost/> } />
            <Route path='/viewpost' element={<ViewPost/> } />
            <Route path='/notifications' element={<Notification/> } />
            <Route path='/whatsNew' element={<WhatsNew/> } />
            <Route path='/announcements' element={<Announcement/> } />
            <Route path='/exams' element={<Exam/> } />
          </Routes>
        </main>
    </div>
    </>
  )
}

export default App
