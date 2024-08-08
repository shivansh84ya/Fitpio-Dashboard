import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({ title: '', type: '' });

  useEffect(() => {
    // Fetch courses and instructors from the backend
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:5000/api/v2/courses');
        const instructorsResponse = await axios.get('http://localhost:5000/api/v2/instructors');
        setCourses(coursesResponse.data);
        setInstructors(instructorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleAssignInstructor = async (courseId, instructorId) => {
    try {
      await axios.put(`http://localhost:5000/api/v2/courses/${courseId}/assign`, { instructorId });
      alert('Instructor assigned successfully!');
      // Update the courses state after assignment
      const updatedCourses = courses.map(course =>
        course.id === courseId ? { ...course, instructorId } : course
      );
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error assigning instructor:', error);
      alert('Failed to assign instructor. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v2/courses/${courseId}`);
      alert('Course deleted successfully!');
      // Update the courses state after deletion
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

  const handleOpenEditModal = (course) => {
    setCurrentCourse(course);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v2/courses/${currentCourse.id}`, currentCourse);
      alert('Course updated successfully!');
      // Update the courses state after editing
      const updatedCourses = courses.map(course =>
        course.id === currentCourse.id ? currentCourse : course
      );
      setCourses(updatedCourses);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course. Please try again.');
    }
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCourses = [...courses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredCourses = filterType
    ? sortedCourses.filter(course => course.type === filterType)
    : sortedCourses;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-0/12 lg:w-0/4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="filterType">
            Filter by Course Type
          </label>
          <select
            id="filterType"
            className="w-full p-2 bg-gray-700 rounded"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="Java Full Stack">Java Full Stack</option>
            <option value="Python Full Stack">Python Full Stack</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>
        <table className="w-full bg-gray-700 rounded">
          <thead>
            <tr>
              <th className="p-2 cursor-pointer" onClick={() => handleSort('title')}>
                Course Name {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort('type')}>
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th className="p-2">Instructor</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map(course => (
              <tr key={course.id}>
                <td className="p-2">{course.title}</td>
                <td className="p-2">{course.type}</td>
                <td className="p-2">
                  <select
                    value={course.instructorId || ''}
                    onChange={(e) => handleAssignInstructor(course.id, e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded"
                  >
                    <option value="">Assign Instructor</option>
                    {instructors.map(instructor => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleOpenEditModal(course)}
                    className="p-2 bg-blue-600 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 bg-red-600 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(filteredCourses.length / coursesPerPage)).keys()].map(number => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className="p-2 bg-indigo-600 rounded mx-1"
            >
              {number + 1}
            </button>
          ))}
        </div>
      </motion.div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal bg-white p-4 rounded shadow-lg max-w-md mx-auto"
        overlayClassName="overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
        <form onSubmit={handleEditCourse}>
          <div className="mb-4">
            <label className="block text-gray-700">Course Name</label>
            <input
              type="text"
              name="title"
              value={currentCourse.title}
              onChange={handleEditChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={currentCourse.type}
              onChange={handleEditChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="p-2 bg-gray-400 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="p-2 bg-blue-600 rounded">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCourses;
