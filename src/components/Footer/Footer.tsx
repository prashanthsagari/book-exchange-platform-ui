import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>© {currentYear} Book Exchange Platform. All rights reserved.</p>
        </footer>
    );
};


export default Footer;
