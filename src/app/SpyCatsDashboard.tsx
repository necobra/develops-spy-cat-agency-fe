"use client";
import React, { useEffect, useState } from 'react';
import SpyCatForm from './SpyCatForm';
import SpyCatList from './SpyCatList';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SpyCatsDashboard() {
  const [spyCats, setSpyCats] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSpyCats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/spycats/`);
      if (!res.ok) throw new Error('Failed to fetch spy cats');
      const data = await res.json();
      setSpyCats(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpyCats();
  }, []);

  const handleAddCat = async (cat: { name: string; years_of_experience: number; breed: string; salary: number }) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/spycats/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Failed to add spy cat');
      }
      fetchSpyCats();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    }
  };

  const handleEditSalary = async (id: number, salary: number) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/spycats/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Failed to update salary');
      }
      fetchSpyCats();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    }
  };

  const handleDeleteCat = async (id: number) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/spycats/${id}/`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete spy cat');
      fetchSpyCats();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spy Cats Management</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <SpyCatForm onAdd={handleAddCat} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SpyCatList cats={spyCats} onEditSalary={handleEditSalary} onDelete={handleDeleteCat} />
      )}
    </div>
  );
}
