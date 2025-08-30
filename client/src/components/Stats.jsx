// src/components/Stats.js
import React from 'react';

// --- SVG Icons (Self-contained components) ---
const PlateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 12c-1.5 5.5-6.5 9-10 9s-8.5-3.5-10-9" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 006 15a5.975 5.975 0 00-3-1.197z" />
  </svg>
);


const Stats = () => (
  <section className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <div className="flex items-center justify-center text-green-600"><PlateIcon /></div>
          <p className="text-4xl font-bold text-gray-800 mt-4">15,000+</p>
          <p className="text-lg text-gray-600 mt-2">Meals Served</p>
        </div>
        <div className="p-6">
           <div className="flex items-center justify-center text-green-600"><CalendarIcon /></div>
          <p className="text-4xl font-bold text-gray-800 mt-4">2,500+</p>
          <p className="text-lg text-gray-600 mt-2">Families Helped</p>
        </div>
        <div className="p-6">
           <div className="flex items-center justify-center text-green-600"><UsersIcon /></div>
          <p className="text-4xl font-bold text-gray-800 mt-4">150+</p>
          <p className="text-lg text-gray-600 mt-2">Active Volunteers</p>
        </div>
      </div>
    </div>
  </section>
);

export default Stats;