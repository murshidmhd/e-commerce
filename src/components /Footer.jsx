import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0 md:flex-1">
          <h2 className="text-2xl font-bold mb-3">AwesomeSite</h2>
          <p className="text-gray-400">Making your web experience amazing.</p>
        </div>
        <div className="md:flex md:space-x-12 md:flex-2">
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © 2025 AwesomeSite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
