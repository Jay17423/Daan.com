// src/components/DonationCategories.js
import React from 'react';

// --- Category Icons ---
const FoodIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.993.883L4 8v10a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z" clipRule="evenodd" />
    </svg>
);
const ClothesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 4.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 11.586l7.293-7.293z" />
    </svg>
);
const ElectronicsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H7zM6 6h8v2H6V6zm0 4h8v2H6v-2zm0 4h5v2H6v-2z" clipRule="evenodd" />
    </svg>
);
const OtherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1.586l3.293-3.293a1 1 0 111.414 1.414L12.414 6H14a1 1 0 110 2h-1.586l3.293 3.293a1 1 0 11-1.414 1.414L11 8.414V10a1 1 0 11-2 0V8.414l-3.293 3.293a1 1 0 11-1.414-1.414L7.586 6H6a1 1 0 110-2h1.586L4.293 2.707a1 1 0 011.414-1.414L9 4.586V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


const DonationCategories = () => {
    const categories = [
        { name: 'Food', description: 'Surplus from events, non-perishables, and packaged meals.', icon: <FoodIcon/> },
        { name: 'Clothes & Apparel', description: 'Gently used clothing, footwear, and accessories for all ages.', icon: <ClothesIcon/> },
        { name: 'Electronics', description: 'Functional old phones, laptops, and small home appliances.', icon: <ElectronicsIcon/> },
        { name: 'Other Necessities', description: 'Books, toys, kitchenware, and other essential household items.', icon: <OtherIcon/> },
    ];

    return (
        <section id="categories" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Make a Difference</h2>
                    <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                        What You Can Donate
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map(category => (
                        <div key={category.name} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600">
                                    {category.icon}
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                                <p className="mt-2 text-gray-600">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DonationCategories;