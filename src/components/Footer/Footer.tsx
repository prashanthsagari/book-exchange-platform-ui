import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className='font-monospace'>© {currentYear} Book Exchange Platform. Developed by Prashanth Sagari sagari.prashanth@gmail.com</p>
        </footer>
    );
};


export default Footer;
