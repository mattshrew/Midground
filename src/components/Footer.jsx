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
                            <span className="tooltip">@minuitt</span>
                        </a>
                        <a className="social__icon--link" href="https://www.instagram.com/mattshrewy" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram insta"></i>
                            <span className="tooltip">@mattshrewy</span>
                        </a>
                        <a className="social__icon--link" href="https://github.com/mattshrew" target="_blank" rel="noreferrer" aria-label="Github">
                            <i className="fab fa-github github"></i>
                            <span className="tooltip">mattshrew</span>
                        </a>
                        <a className="social__icon--link" href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
                            <i className="fab fa-twitter twitter"></i>
                            <span className="tooltip">???</span>
                        </a>
                        <a className="social__icon--link" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin linkedin"></i>
                            <span className="tooltip">???</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;