import './App.css';
// import Login from './components/Login';
import '../src/components/Fontawesome'
import Topbar from './components/scenes/global/Topbar';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/scenes/global/Sidebar';
import Dashboard from './components/scenes/dashboard/Dashboard';
import Student from './components/scenes/students/Student';
// import Teacher from './components/scenes/dashboard/Teacher';
import Financial from './components/scenes/Financial/Financial';
import Program from './components/scenes/Program/Program';
import Course from './components/scenes/Courses/Courses';
import Class from './components/scenes/Class/Classes';
import Ebook from './components/scenes/Ebook/Ebook';
// import Calender from './components/scenes/dashboard/Calender';
import AddPost from './components/scenes/AddPost/AddPost';
import ViewPost from './components/scenes/ViewPost/ViewPost';
import Notification from './components/scenes/Notifications/Notifications';
import Admissions from './components/scenes/Admissions/Admisions';
import Applications from './components/scenes/Admissions/Applications';
import Interview from './components/scenes/Admissions/Interview';



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
            {/* <Route path='/teachers' element={<Teacher/> } /> */}
            <Route path='/financial' element={<Financial/> } />
            <Route path='/program' element={<Program/> } />
            <Route path='/course' element={<Course/> } />
            <Route path='/class' element={<Class/> } />
            <Route path='/ebook' element={<Ebook/> } />
            {/* <Route path='/calender' element={<Calender/> } /> */}
            <Route path='/addpost' element={<AddPost/> } />
            <Route path='/viewpost' element={<ViewPost/> } />
            <Route path='/notifications' element={<Notification/> } />
            <Route path ='/admissions' element={<Admissions/>}/>
            <Route path='/applications' element={<Applications/>}/>
            <Route path ='/interview' element={<Interview/>}/>
            {/* <Route path='/' element={<Dashboard/> } /> */}
          </Routes>
        </main>
    </div>
    </>
  )
}

export default App
