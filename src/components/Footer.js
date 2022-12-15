import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

const Footer = (props) => {
    return (
        <footer className="Footer">
            <div className="footer__content">
                <a
                    href="https://github.com/vladklen/"
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubIcon />
                    @vladklen
                </a>
            </div>
        </footer>
    );
};

export default Footer;
