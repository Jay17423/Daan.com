// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28">
    <div className="absolute inset-0">
        <img 
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2940&auto=format&fit=crop" 
            alt="Hands holding various donation items like clothes and canned food" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1600x900/e2e8f0/4a5568?text=DAAN'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
    </div>
    <div className="relative max-w-4xl mx-auto text-center px-4">
       <div className="inline-flex items-center bg-green-200/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
        Live in Prayagraj: Ready to collect your donations
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
        Give Your Surplus Items <span className="text-green-400">a Second Life</span>
      </h1>
      <p className="mt-6 text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
        Don't let good food, clothes, electronics, and other useful items go to waste. We connect your donations with those who need them most in our community.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link to="/#categories" className="w-full sm:w-auto bg-green-600 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-xl">
          See What to Donate
        </Link>
        <Link to="/#volunteer" className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/30 transition-colors">
          Become a Volunteer
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;