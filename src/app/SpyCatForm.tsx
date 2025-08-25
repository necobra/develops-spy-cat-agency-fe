"use client";
import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SpyCatForm({ onAdd }) {
  const [name, setName] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [breed, setBreed] = useState('');
  const [salary, setSalary] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/breeds/`)
      .then(res => res.json())
      .then(setBreeds)
      .catch(() => setBreeds([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !yearsOfExperience || !breed || !salary) {
      setError('All fields are required');
      return;
    }
    onAdd({ name, experience: Number(yearsOfExperience), breed, salary: Number(salary) });
    setName('');
    setYearsOfExperience('');
    setBreed('');
    setSalary('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <div className="mb-2">
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} className="border p-1 w-full" />
      </div>
      <div className="mb-2">
        <label>Years of Experience:</label>
        <input type="number" value={yearsOfExperience} onChange={e => setYearsOfExperience(e.target.value)} className="border p-1 w-full" />
      </div>
      <div className="mb-2">
        <label>Breed:</label>
        <select value={breed} onChange={e => setBreed(e.target.value)} className="border p-1 w-full">
          <option value="">Select breed</option>
          {breeds.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label>Salary:</label>
        <input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="border p-1 w-full" />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Spy Cat</button>
    </form>
  );
}

