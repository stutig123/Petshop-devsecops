import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const AddPet = () => {
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    location: '',
    price: ''
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    data.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/pets', data);
      alert('Pet added successfully!');
      navigate('/pets');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add pet');
    }
  };

  return (
    <Dashboard>
      <h2>Add New Pet</h2>
      <div className="container">
        <input name="name" onChange={handleChange} placeholder="Name" />
        <input name="breed" onChange={handleChange} placeholder="Breed" />
        <input name="age" onChange={handleChange} placeholder="Age" />
        <input name="location" onChange={handleChange} placeholder="Location" />
        <input name="price" onChange={handleChange} placeholder="Price" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleAdd}>Add Pet</button>
      </div>
    </Dashboard>
  );
};

export default AddPet;
