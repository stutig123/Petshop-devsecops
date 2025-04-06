import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const role = localStorage.getItem('role');

  const fetchPets = async () => {
    const res = await axios.get('http://localhost:5000/api/pets');
    setPets(res.data);
  };

  const handleBuy = async (id) => {
    if (confirm('Are you sure you want to buy this pet?')) {
      await axios.delete(`http://localhost:5000/api/pets/${id}`);
      fetchPets();
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <Dashboard>
      <h2>Available Pets</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pets.map((pet) => (
          <div key={pet.id} style={{
            border: '1px solid #ccc',
            margin: 10,
            padding: 10,
            width: 220,
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0 0 5px rgba(0,0,0,0.1)'
          }}>
            <img src={`http://localhost:5000${pet.image}`} alt={pet.name} width="100%" style={{ borderRadius: '8px' }} />
            <h3>{pet.name}</h3>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Location:</strong> {pet.location}</p>
            <p><strong>Price:</strong> ₹{pet.price}</p>
            {role === 'user' && <button onClick={() => handleBuy(pet.id)}>Buy</button>}
          </div>
        ))}
      </div>
    </Dashboard>
  );
};

export default PetList;
