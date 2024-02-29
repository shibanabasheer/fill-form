import React, { useState, useRef, useEffect } from 'react';
import './App.css';

export default function UserDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (!formData.username || !formData.email || !formData.phone || !formData.dob) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert(`Invalid email format. Please enter a valid email address.`);
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10 digit phone number.');
      return;
    }
    const currentDate = new Date();
    const enteredDate = new Date(formData.dob);
    if (enteredDate > currentDate) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form data
    setFormData({ username: '', email: '', phone: '', dob: '' });
    // Close modal
    closeModal();
  };

  return (
    <div className="center">
      <h1>User Details Modal</h1>
      <button 
        onClick={openModal} 
        className="open-form-button"
      >
        Open Form
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <span className="modal-close" onClick={closeModal}>&times;</span>
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required /><br />
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required /><br />
                <label htmlFor="phone">Phone number:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required /><br />
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required /><br />
                <button type="submit" className='submit-button'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
