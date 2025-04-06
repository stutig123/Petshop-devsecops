const express = require('express');
const multer = require('multer');
const { readJSON, writeJSON } = require('../utils/fileHandler');
const path = require('path');
const router = express.Router();

const PETS_FILE = 'pets.json';

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Get all pets
router.get('/', (req, res) => {
  const pets = readJSON(PETS_FILE);
  res.json(pets);
});

// Add a pet (manager only)
router.post('/', upload.single('image'), (req, res) => {
  const { name, breed, age, location, price } = req.body;
  if (!name || !breed || !age || !location || !price || !req.file) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const pets = readJSON(PETS_FILE);
  const newPet = {
    id: Date.now(),
    name,
    breed,
    age,
    location,
    price,
    image: `/uploads/${req.file.filename}`
  };

  pets.push(newPet);
  writeJSON(PETS_FILE, pets);
  res.status(201).json({ message: 'Pet added successfully', pet: newPet });
});

// Buy (delete) a pet by ID
router.delete('/:id', (req, res) => {
  const petId = parseInt(req.params.id);
  const pets = readJSON(PETS_FILE);
  const filteredPets = pets.filter(pet => pet.id !== petId);

  if (pets.length === filteredPets.length) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  writeJSON(PETS_FILE, filteredPets);
  res.json({ message: 'Pet bought and removed' });
});

module.exports = router;
