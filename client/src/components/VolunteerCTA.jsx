// src/components/VolunteerCTA.js
import React from 'react';
import { Link } from 'react-router-dom';

const VolunteerCTA = () => (
  <section id="volunteer" className="bg-green-700">
    <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        <span className="block">Be the bridge between plenty and need.</span>
      </h2>
      <p className="mt-4 text-lg leading-6 text-green-100">
        Join our team of passionate volunteers and make a tangible impact in our community. Your time and effort can help us serve our city better.
      </p>
      <Link
        to="/volunteer-signup"
        className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-green-700 bg-white hover:bg-green-50 sm:w-auto transition-transform transform hover:scale-105"
      >
        Become a Volunteer
      </Link>
    </div>
  </section>
);

export default VolunteerCTA;