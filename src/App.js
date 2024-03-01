import React, { useState, useRef, useEffect } from 'react';
import './App.css';

export default function UserDtails() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
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

  const handleSubmit = (username, email, phone, dob) => {
    // if (!username || !email || !phone || !dob) {
    //   alert(``);
    //   return;
    // }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Invalid email. Please check your email address.');
      return;
    }
    else if (phone.length !== 10 || isNaN(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }
    const currentDate = new Date();
    const enteredDate = new Date(dob);
    if (enteredDate > currentDate) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }
    // Handle form submission
    console.log('Form submitted:', { username, email, phone, dob });
    // Reset form data
    setUsername('');
    setEmail('');
    setPhone('');
    setDob('');
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
              <h2>Fill Details</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(username, email, phone, dob);
              }}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/><br />
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  required/><br />
                <label htmlFor="phone">Phone number:</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}  required/><br />
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}  required/><br />
                <button type="submit" className='submit-button'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}