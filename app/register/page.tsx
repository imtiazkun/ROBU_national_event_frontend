"use client";
import React, { useState } from 'react';

const TeamForm = () => {
  const [formData, setFormData] = useState({
    isTeam: false,
    segment: {
      documentId: '',
      name: '',
      description: '',
    },
    payment: {
      identifier: '',
      method: '',
    },
    applicant: {
      name: '',
      email: '',
      phone_number: '',
      institution_name: '',
      student_id: '',
      session: '',
      tshirt_size: '',
    },
    team_members: [
      {
        name: '',
        email: '',
        phone_number: '',
        institution_name: '',
        student_id: '',
        session: '',
        tshirt_size: '',
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, path: string[]) => {
    const newFormData = { ...formData };
    path.reduce((acc, key, idx) => {
      if (idx === path.length - 1) acc[key] = e.target.value;
      return acc[key];
    }, newFormData);
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Team Form</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Is Team</label>
        <input
          type="checkbox"
          checked={formData.isTeam}
          onChange={(e) => setFormData({ ...formData, isTeam: e.target.checked })}
          className="w-5 h-5"
        />
      </div>
      {/* Segment Section */}
      <h3 className="text-lg font-semibold mb-2">Segment</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Segment Document ID</label>
        <input
          type="text"
          value={formData.segment.documentId}
          onChange={(e) => handleChange(e, ['segment', 'documentId'])}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Segment Name</label>
        <input
          type="text"
          value={formData.segment.name}
          onChange={(e) => handleChange(e, ['segment', 'name'])}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      {/* Payment Section */}
      <h3 className="text-lg font-semibold mb-2">Payment</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Identifier</label>
        <input
          type="text"
          value={formData.payment.identifier}
          onChange={(e) => handleChange(e, ['payment', 'identifier'])}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Method</label>
        <input
          type="text"
          value={formData.payment.method}
          onChange={(e) => handleChange(e, ['payment', 'method'])}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      {/* Applicant Section */}
      <h3 className="text-lg font-semibold mb-2">Applicant</h3>
      {Object.keys(formData.applicant).map((key) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium mb-1 capitalize">{key.replace('_', ' ')}</label>
          <input
            type="text"
            value={(formData.applicant as any)[key]}
            onChange={(e) => handleChange(e, ['applicant', key])}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      ))}
      {/* Team Members Section */}
      <h3 className="text-lg font-semibold mb-2">Team Members</h3>
      {formData.team_members.map((member, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded-lg">
          <h4 className="text-md font-bold mb-2">Member {idx + 1}</h4>
          {Object.keys(member).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium mb-1 capitalize">{key.replace('_', ' ')}</label>
              <input
                type="text"
                value={(member as any)[key]}
                onChange={(e) => {
                  const updatedMembers = [...formData.team_members];
                  updatedMembers[idx][key as keyof typeof member] = e.target.value;
                  setFormData({ ...formData, team_members: updatedMembers });
                }}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default TeamForm;
