import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [disc, setCoursedisc] = useState('');
  const [duration, setDuration] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch instructors from the backend
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v2/instructors');
        setInstructors(response.data);
        // console.log("omnssssssssssssss",instructors);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };
    fetchInstructors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const courseData = {
      title: courseName,
      type: courseType,
      description: disc,
      duration: duration,
      instructorId: instructors, // Ensure this matches the server-side expectation
    };
  
    console.log('Submitting course data:', courseData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/v2/courses', courseData);
      alert('Course added successfully!');
      setIsSubmitting(false);
      setCourseName('');
      setCourseType('');
      setCoursedisc('');
      setDuration('');
      setSelectedInstructor('');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="courseName">
              Course Title
            </label>
            <input
              id="courseName"
              type="text"
              className="w-full p-3 bg-gray-700 rounded "
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
            <label className="block text-sm font-medium mb-2" htmlFor="courseName">
              Course Description
            </label>
            <input
              id="Description"
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={disc}
              onChange={(e) => setCoursedisc(e.target.value)}
              required
            />
            <label className="block text-sm font-medium mb-2" htmlFor="courseName">
              Course Duration (In Months)
            </label>
            <input
              id="duration"
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="courseType">
              Course Type
            </label>
            <select
              id="courseType"
              className="w-full p-2 bg-gray-700 rounded"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              required
            >
              <option value="">Select a type</option>
              <option value="MERN Stack">Web Development</option>
              <option value="Java Full Stack">Java Full Stack</option>
              <option value="Python Full Stack">Python Full Stack</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="instructor">
              Assign Instructor
            </label>
            <select
              id="instructor"
              className="w-full p-2 bg-gray-700 rounded"
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
              required
            >
              <option value="">Select an instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>
          <motion.button
            type="submit"
            className="w-full p-3 bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Course'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCourse;
