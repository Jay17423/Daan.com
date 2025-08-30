// src/components/HowItWorks.js
import React from 'react';

const HowItWorks = () => {
  const steps = [
    { number: 1, title: "Sign Up & List Items", description: "Create an account and tell us about the surplus goods you have. It only takes a few minutes.", icon: '✍️' },
    { number: 2, title: "We Verify & Collect", description: "Our dedicated volunteers will arrive at your location at the specified time to carefully inspect and collect the items.", icon: '🚚' },
    { number: 3, title: "Items are Distributed", description: "The collected goods are immediately transported to our network of local shelters, reaching those who need them most.", icon: '❤️' },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Simple & Seamless</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Sharing in 3 Easy Steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {steps.map((step) => (
            <div key={step.number} className="text-center p-6 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-3xl mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="mt-4 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;