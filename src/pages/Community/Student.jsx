import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';

Modal.setAppElement('#root');

const ManageStudent = () => {
    
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

 useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/v2/students', {
        params: {
          page: currentPage,
          limit: studentsPerPage,
          sortBy: sortField,
          sortOrder,
          name: filter,
        },
      });
      setStudents(res.data.students);
      setLoading(false);
    };
    fetchStudents();
  }, [currentPage, sortField, sortOrder, filter]);

  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/v2/students', newStudent);
    setModalIsOpen(false);
    setNewStudent({
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    });
    setCurrentPage(1); // Reset to first page to see the new student added
    setFilter(''); // Reset filter
    fetchStudents(); // Refresh the list
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleOpenModal}
        >
          Add Student
        </button>
      </div>

      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilter}
        className="mb-4 p-2 border rounded"
      />

      <table >
      {/* <table className="bg-gray-900 text-white min-h-screen flex items-center justify-center"> */}
      
        <thead >
          <tr className="min-w-full bg-gray-900 justify-center min-h-screen ">
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('email')}
            >
              Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('phoneNumber')}
            >
              Phone {sortField === 'phoneNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.email}</td>
                <td className="py-2 px-4 border-b">{student.phoneNumber}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className={`py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`py-2 px-4 rounded ${students.length < studentsPerPage ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={students.length < studentsPerPage}
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal bg-white p-4 rounded shadow-lg max-w-md mx-auto"
        overlayClassName="overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={newStudent.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={newStudent.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageStudent ;
