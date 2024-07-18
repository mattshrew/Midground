import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <div className="footer__container">
            <div className="social__media">
                <div className="social__media--wrap">
                    <div className="footer__logo">
                        <Link to="/" id="footer__logo"><i className="fas fa-moon"></i>MIDGROUND</Link>
                    </div>
                    <p className="website__info">Built by Matthew Yang with React</p>
                    {/* <p className="website__info">Designed by Matthew Yang &nbsp; • &nbsp; Template by&nbsp;<a className="website__attribution" href="https://www.youtube.com/@briandesign">Brian Design</a></p> */}
                    <div className="social__icons">
                        <a className="social__icon--link" href="https://discord.com/users/672173302373941256" target="_blank" rel="noreferrer" aria-label="Discord">
                            <i className="fab fa-discord discord"></i>
                            <span className="tooltip">minuitt</span>
                        </a>
                        <a className="social__icon--link" href="https://www.instagram.com/mattshrewy" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram insta"></i>
                            <span className="tooltip">mattshrewy</span>
                        </a>
                        <a className="social__icon--link" href="https://github.com/mattshrew" target="_blank" rel="noreferrer" aria-label="Github">
                            <i className="fab fa-github github"></i>
                            <span className="tooltip">mattshrew</span>
                        </a>
                        <a className="social__icon--link" href="https://devpost.com/mattshrewy" target="_blank" rel="noreferrer" aria-label="Devpost">
                        <svg className="devpost" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="white" d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853Z"></path>
                        </svg>
                            <span className="tooltip">mattshrewy</span>
                        </a>
                        <a className="social__icon--link" href="https://www.linkedin.com/in/matthew-y/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin linkedin"></i>
                            <span className="tooltip">matthew-y</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
