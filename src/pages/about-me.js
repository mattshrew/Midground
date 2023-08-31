import React from 'react';

import '../styles.css';
import '../styles/about-me.css'

import _profile from '../images/profile.svg';
import _hello from '../images/hello.svg';
import _graduation from '../images/graduation.svg';
import _app from '../images/app.svg';
import _math from '../images/math.svg';
import _celebration from '../images/celebration.svg';
 
const AboutMe = () => {
    return (
        <div className="about-me">
            <div className="main">
                <div className="main__container">
                    <div className="main__content">
                        <h1>ABOUT ME</h1>
                        <h2>&gt; MATTHEW YANG</h2>
                        <p>&lt;Student/Programmer<br />/Guitarist/Chess Player&gt;</p>
                    </div>
                    <div className="main__img--container">
                        <img src={_profile} alt="pic" className="main__img" />
                    </div>
                </div>
            </div>

            <div className="about">
                <div className="about__container">
                    <div className="about__content" id="introduction">
                        <h1>Introduction</h1>
                        <p>My name is Matthew Yang. I am a Grade 11 Extended French student at Waterloo Collegiate Institute with a passion for all things STEM and a dream of working in computer science. I am positive, hardworking, collaborative, a critical thinker, and a leader. In my spare time, I enjoy programming, playing chess, practicing guitar, learning advanced mathematics, and solving logic puzzles.</p>
                    </div>
                    <div className="about__img--container">
                        <img src={_hello} alt="pic" className="about__img" />
                    </div>

                    <div className="about__img--container">
                        <img src={_graduation} alt="pic" className="about__img" />
                    </div>
                    <div className="about__content" id="education">
                        <h1>Education</h1>

                        <p><b>Lester B. Pearson</b> was my elementary school. During grades 1-8, I was a full-time French Immersion student.</p>
                        
                        <p>From 2018 to 2021, I went to <b>Waterloo Area Enrichment Class</b>, an exclusive one-day-a-week program for gifted learners.</p>
                        
                        <p>Since 2021, I have been enrolled in <b>Waterloo Collegiate Institute (WCI)</b>'s Extended French Program. Currently, I am almost exclusively taking Pre-AP and AP courses.</p>

                        <p>I have also gone to <b>KW Chinese School</b> for the past 12 years. Every Saturday, I attend a 4-hour class to improve my Mandarin speaking, listening, reading, and writing skills.</p>
                    </div>

                    <div className="about__content" id="stem">
                        <h1>STEM</h1>
                        
                        <h2>Science</h2>
                        <p>Science has been one of my favourite subjects since elementary school. In Grade 6, after making a presentation on black holes, I became obsessed with spacetime and general/special relativity. To this day, astronomy and physics remain my favourite branches of science. In Grade 11, I will be taking Physics (AP) and Chemistry (AP).</p>

                        <h2>Technology</h2>
                        <p>Technology has played a great role in my education and everyday activities. Technology allows me to learn, research, communicate, and game. I was always interested in how electronics (specifically computers) worked as a kid, and am currently taking Grade 10 Introduction to Computer Studies.</p>
                        <p>During my elementary years, I was not very interested in programming, occasionally doing a bit of Scratch and Elm (McMaster's Outreach Program). My passion greatly grew during the pandemic, in the summer of 2020, when I took an online course for Python. In June of 2022, I began co-developing a custom discord bot for a server with over 700 members. I am currently learning C++, developing my own website (this one), and participating in every hackathon that I can.</p>

                        <h2>Engineering</h2>
                        <p>My love for engineering began when my uncle bought me a KiwiCo subscription during the COVID-19 pandemic. Every month, I was sent a crate with instructions and materials for a unique and fun hands-on project. Last semester, I took Grade 11 Computer Engineering. I learned how to build PCs, create networks, and use many electrical components. During this course, I combined science with mathematics to construct complex circuits, and combined programming with engineering to build Arduino projects.</p>

                        <h2>Mathematics</h2>
                        <p>I love mathematics. In kindergarten, my sister decided (for some reason) to teach me how to multiply numbers, sparking my interest in mathematics and inspiring me to keep learning ahead. I improved my skills with Beestar from 2014 to 2016 and began learning more advanced mathematics on Khan Academy in 2016. For the past 6 years, I have attended Math Circles for higher grades at the University of Waterloo. I am currently a member of my school's Math Club and a regular participant in many CEMC math contests (Gauss, Pascal, CIMC, Cayley, Galois, etc.), consistently achieving distinction.</p>
                    </div>
                    <div className="about__img--container">
                        <img src={_app} alt="pic" className="about__img about__img--multiple" />
                        <img src={_math} alt="pic" className="about__img about__img--multiple" />
                    </div>

                    <div className="about__img--container">
                        <img src={_celebration} alt="pic" className="about__img" />
                    </div>
                    <div className="about__content" id="achievements">
                        <h1>Achievements</h1>
                        <ul>
                            <h3>Hackathons</h3>
                            <li><b>JAMHacks 7 (2023):</b> Best Beginner Hack, 4th Overall</li>

                            <h3>CEMC Math Contests</h3>
                            <li><b>Galois Contest (2023):</b> Distinction, Grade 10</li>
                            <li><b>Cayley Contest (2023):</b> Distinction, Grade 10</li>
                            <li><b>CIMC (2022):</b> Distinction, Grade 10</li>
                            <li><b>Beaver Computing Challenge (2019-2022):</b> 4x Distinction, Grades 7-10</li>
                            <li><b>Pascal Contest (2022):</b> Distinction, Grade 9</li>
                            <li><b>Gauss Contest (2020-2021):</b> 2x Distinction, Grades 7-8</li>
                            <li><b>Caribou Contests (2016-2021):</b> 5x Global Top 2-8%</li>

                            <h3>CEMC Canadian Computing Competition</h3>
                            <li><b>Junior Contest (2023):</b> Honour Roll - Group 1, Grade 10</li>

                            <h3>Chess Contests</h3>
                            <li><b>KW Youth Chess Tournaments (2017-2020):</b> 13x Champion</li>
                            <li><b>Waterloo Region Chess Championship (2016-2019):</b> 4x Champion</li>
                            <li><b>National Championship (2018):</b> Qualifier</li>

                            <h3>Other</h3>
                            <li><b>Ontario DECA (2023):</b> 6th, Hospitality and Tourism Operations Event</li>
                            <li><b>Let's Talk Science Challenge (2021):</b> 3rd in Quiz</li>
                            <li><b>Victoria D'Agostino Award (2019):</b> Awarded to Grade 6 Students with academic excellence, and contributions to the community</li>
                            <li><b>Polar Expressions National Writing Contest (2018):</b> Published Writer</li>
                        </ul>                                                                               
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default AboutMe;