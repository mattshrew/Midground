import React from 'react';
import { Link } from 'react-router-dom';

import _portfolio from '../images/portfolio.svg';
import _pic1 from '../images/pic1.svg';
import _profile from '../images/profile.svg';

import '../styles.css';
import '../styles/index.css';
 
const Home = () => {
    return (
        <>
            <div className="main">
                <div className="main__container">
                    <div className="main__content">
                        <h1>PORTFOLIO</h1>
                        <h2>&gt; MY PROJECTS</h2>
                        <p>&lt;Side/Hackathon Projects&gt;</p>
                        <button className="main__btn"><Link to="/projects" data-target="Projects">EXPLORE</Link></button>
                    </div>
                    <div className="main__img--container">
                        <img src={_portfolio} alt="pic" className="main__img" />
                    </div>
                </div>
                <div className="main__container">
                    <div className="main__img--container">
                        <img src={_pic1} alt="pic" className="main__img" />
                    </div>
                    <div className="main__content">
                        <h1>GAMES</h1>
                        <h2>&gt; CONNECT 4</h2>
                        <p>&lt;Play vs Player/Computer&gt;</p>
                        <button className="main__btn"><Link to="/games/c4" data-target="C4">PLAY NOW</Link></button>
                    </div>
                </div>
                <div className="main__container">
                    <div className="main__content">
                        <h1>ABOUT ME</h1>
                        <h2>&gt; MATTHEW YANG</h2>
                        <p>&lt;Student/Programmer<br />/Guitarist/Chess Player&gt;</p>
                        <button className="main__btn"><Link to="/about-me" data-target="About Me">LEARN MORE</Link></button>
                    </div>
                    <div className="main__img--container">
                        <img src={_profile} alt="pic" className="main__img" />
                    </div>
                </div>
            </div>
        </>
    );
};
 
export default Home;