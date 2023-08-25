import React from 'react';
import { Link } from 'react-router-dom';

import _pic1 from '../images/pic1.svg';
import _pic2 from '../images/pic2.svg';
import _profile from '../images/profile.svg';

import '../styles.css';
import '../styles/index.css';
 
const Home = () => {
    return (
        <div>
            <div class="main">
                <div class="main__container">
                    <div class="main__content">
                        <h1>GAMES</h1>
                        <h2>&gt; TIC TAC TOE</h2>
                        <p>&lt;Play vs Player/Computer&gt;</p>
                        <button class="main__btn"><Link to="/ttt">PLAY NOW</Link></button>
                    </div>
                    <div class="main__img--container">
                        <img src={_pic1} alt="pic" class="main__img" />
                    </div>
                </div>
                <div class="main__container">
                    <div class="main__img--container">
                        <img src={_pic2} alt="pic" class="main__img" />
                    </div>
                    <div class="main__content">
                        <h1>GAMES</h1>
                        <h2>&gt; CONNECT 4</h2>
                        <p>&lt;Play vs Player/Computer&gt;</p>
                        <button class="main__btn"><Link to="/c4">PLAY NOW</Link></button>
                    </div>
                </div>
                <div class="main__container">
                    <div class="main__content">
                        <h1>ABOUT ME</h1>
                        <h2>&gt; MATTHEW YANG</h2>
                        <p>&lt;Student/Programmer<br />/Guitarist/Chess Player&gt;</p>
                        <button class="main__btn"><Link to="/about-me">LEARN MORE</Link></button>
                    </div>
                    <div class="main__img--container">
                        <img src={_profile} alt="pic" class="main__img" />
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default Home;