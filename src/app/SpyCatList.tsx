"use client";
import React, { useState } from 'react';

export default function SpyCatList({ cats, onEditSalary, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [salary, setSalary] = useState('');

  const startEdit = (id, currentSalary) => {
    setEditId(id);
    setSalary(currentSalary);
  };

  const handleEdit = (id) => {
    onEditSalary(id, Number(salary));
    setEditId(null);
    setSalary('');
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Experience</th>
          <th>Breed</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cats.map(cat => (
          <tr key={cat.id}>
            <td className='text-center'>{cat.name}</td>
            <td className='text-center'>{cat.experience}</td>
            <td className='text-center'>{cat.breed}</td>
            <td className='text-center'>
              {editId === cat.id ? (
                <input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="border p-1 w-20" />
              ) : (
                cat.salary
              )}
            </td>
            <td className='text-center'>
              {editId === cat.id ? (
                <button onClick={() => handleEdit(cat.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
              ) : (
                <button onClick={() => startEdit(cat.id, cat.salary)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              )}
              <button onClick={() => onDelete(cat.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
