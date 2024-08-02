import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';
import AddCourse from './pages/AddCourse';

import Sidebar from './partials/Sidebar';
// Import pages
import Dashboard from './pages/Dashboard';
import ManageCourses from './pages/ManageCourse';
import Header from './partials/Header';
import ManageStudent from './pages/Community/Student';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      {/* <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/" element={<Sidebar/>} />
        <Route path="/addcourse" element={<AddCourse/>} />
        

      </Routes> */}
      <Sidebar/>
      <Header/>
      <Routes>

        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/addcourse' element={<AddCourse/>}></Route>
        <Route path='/managecourse' element={<ManageCourses/>}></Route>
        <Route path='/managestudent' element={<ManageStudent/>}></Route>
        

      </Routes>
    </>
  );
}

export default App;
