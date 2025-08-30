// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex justify-center space-x-6 md:order-2">
                    {/* Placeholder for social icons */}
                    <Link to="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    </Link>
                    <Link to="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm0 1.62c-2.403 0-2.73.01-3.688.053-1.03.048-1.597.2-1.99.36a3.272 3.272 0 00-1.15 1.15c-.16.393-.312.96-.36 1.99-.043.958-.053 1.285-.053 3.688s.01 2.73.053 3.688c.048 1.03.2 1.597.36 1.99a3.272 3.272 0 001.15 1.15c.393.16.96.312 1.99.36.958.043 1.285.053 3.688.053s2.73-.01 3.688-.053c1.03-.048 1.597-.2 1.99-.36a3.272 3.272 0 001.15-1.15c.16-.393.312-.96.36-1.99.043-.958.053-1.285.053-3.688s-.01-2.73-.053-3.688c-.048-1.03-.2-1.597-.36-1.99a3.272 3.272 0 00-1.15-1.15c-.393-.16-.96-.312-1.99-.36-.958-.043-1.285-.053-3.688-.053z" clipRule="evenodd" /><path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-1.622a4.378 4.378 0 110-8.756 4.378 4.378 0 010 8.756zM16.88 7.12a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" /></svg>
                    </Link>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">&copy; {new Date().getFullYear()} DAAN. All rights reserved.</p>
                       <p className="text-center text-sm text-gray-500 mt-1">Proudly serving Prayagraj, Uttar Pradesh.</p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;