import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('username', form.username); // Save name
      alert(`Welcome, ${form.username}!`);
      navigate('/pets');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🐾 PetShop</h1>
        <h2 style={styles.title}>Login</h2>
        <input name="username" onChange={handleChange} placeholder="Username" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
        <p style={styles.foot}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  outer: {
    height: '100vh',
    background: 'linear-gradient(135deg, #cce6ff, #ffffff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  logo: {
    marginBottom: '10px',
    fontSize: '2.5rem',
    color: '#0077cc',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  foot: {
    marginTop: '16px',
    fontSize: '0.9rem',
  }
};

export default Login;
