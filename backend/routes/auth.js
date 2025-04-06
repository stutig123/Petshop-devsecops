const express = require('express');
const { readJSON, writeJSON } = require('../utils/fileHandler');
const router = express.Router();
const path = require('path');
const USERS_FILE = 'users.json';

// Signup
router.post('/signup', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ message: 'All fields required' });

  const users = readJSON(USERS_FILE);
  const userExists = users.find(u => u.username === username);
  if (userExists) return res.status(409).json({ message: 'User already exists' });

  users.push({ username, password, role });
  writeJSON(USERS_FILE, users);
  res.status(201).json({ message: 'Signup successful' });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(USERS_FILE);
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', role: user.role });
});

module.exports = router;
