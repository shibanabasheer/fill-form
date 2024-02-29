import React, { useState, useRef, useEffect } from 'react';
import './App.css';

export default function UserDtails() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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
    
    if (!formData.name || !formData.email || !formData.phone || !formData.dob) {
      alert('Please fill out all fields.');
      return;
    }
    if (!formData.email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }
    const currentDate = new Date();
    const enteredDate = new Date(formData.dob);
    if (enteredDate > currentDate) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', dob: '' });
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
                <label htmlFor="username">Userame:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required /><br />
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required /><br />
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required /><br />
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required /><br />
                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
