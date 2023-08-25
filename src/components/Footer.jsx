import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <div class="footer__container">
            <div class="social__media">
                <div class="social__media--wrap">
                    <div class="footer__logo">
                        <Link to="/" id="footer__logo"><i class="fas fa-moon"></i>MIDGROUND</Link>
                    </div>
                    <p class="website__info">Built by Matthew Yang with React</p>
                    {/* <p class="website__info">Designed by Matthew Yang &nbsp; • &nbsp; Template by&nbsp;<a class="website__attribution" href="https://www.youtube.com/@briandesign">Brian Design</a></p> */}
                    <div class="social__icons">
                        <a class="social__icon--link" href="https://discord.com/users/672173302373941256" target="_blank" rel="noreferrer" aria-label="Discord">
                            <i class="fab fa-discord discord"></i>
                            <span class="tooltip">@minuitt</span>
                        </a>
                        <a class="social__icon--link" href="https://www.instagram.com/mattshrewy" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <i class="fab fa-instagram insta"></i>
                            <span class="tooltip">@mattshrewy</span>
                        </a>
                        <a class="social__icon--link" href="https://github.com/mattshrew" target="_blank" rel="noreferrer" aria-label="Github">
                            <i class="fab fa-github github"></i>
                            <span class="tooltip">mattshrew</span>
                        </a>
                        <a class="social__icon--link" href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
                            <i class="fab fa-twitter twitter"></i>
                            <span class="tooltip">???</span>
                        </a>
                        <a class="social__icon--link" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <i class="fab fa-linkedin linkedin"></i>
                            <span class="tooltip">???</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;