import './App.css';
// import Login from './components/Login';
import '../src/components/Fontawesome'
import Topbar from './components/scenes/global/Topbar';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/scenes/global/Sidebar';
import Dashboard from './components/scenes/dashboard/Dashboard';
import Student from './components/scenes/students/Student';
import Teacher from './components/scenes/teacher/Teacher';
// import Financial from './components/scenes/dashboard/Financial';
// import Course from './components/scenes/dashboard/Course';
// import Calender from './components/scenes/dashboard/Calender';
import Anouncements from './components/scenes/anouncements/Anouncements';
import PublicUser from './components/scenes/publicUser/PublicUser';
import Exam from './components/scenes/exams/Exam';

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
            <Route path='/teachers' element={<Teacher/> } />
            <Route path='/publicusers' element={<PublicUser/> } />
            {/* <Route path='/financial' element={<Financial/> } /> */}
            {/* <Route path='/courses' element={<Course/> } /> */}
            {/* <Route path='/calender' element={<Calender/> } /> */}
            <Route path='/anouncements' element={<Anouncements/> } />
            <Route path='/exams' element={<Exam/> } />
          </Routes>
        </main>
    </div>
    </>
  )
}

export default App
