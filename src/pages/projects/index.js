import React from 'react';
import { useEffect } from 'react';

import '../../styles.css';
import '../../styles/index.css';
import '../../styles/projects.css';

import _portfolio from '../../images/portfolio.svg';

import projects from '../../data/projects.json';

const Projects = () => {
    let imgs = require.context('../../images/projects', false, /\.(png|jpe?g|svg)$/);
    var images = {};
    imgs.keys().forEach((item, index) => { images[item.replace('./', '').slice(0, item.indexOf('-') - 2)] = []; })
    imgs.keys().forEach((item, index) => { images[item.replace('./', '').slice(0, item.indexOf('-') - 2)].push(imgs(item)); })

    function Gallery(props) {
        useEffect(() => {
            const gallery = document.querySelector(".gallery");
            const projects = document.getElementsByClassName("project");
            gallery.onmousemove = (e) => {
                for (const project of projects) {
                    const rect = project.getBoundingClientRect(),
                        x = e.clientX - rect.left,
                        y = e.clientY - rect.top;
                    // console.log(`(${e.clientX}, ${e.clientY}) ... (${rect.left}, ${rect.top})`);
                    project.style.setProperty("--mouse-x", `${x}px`);
                    project.style.setProperty("--mouse-y", `${y}px`);
                };
            }
        }, [])

        return (
            <div className="gallery">
                { props.children }
            </div>
        )
    }

    function Project(props) {
        var [icon, image] = ["", ""];
        (images[props.id]) && ([icon, image] = images[props.id]);

        return (
            <a className="project" href={(props.link) ? props.link : "#"} target="_blank" rel="noreferrer">
                <div className="project-content">
                    <img className="project-image" src={image} alt="" />
                    <div className="project-info-wrapper">
                        <div className="project-info">
                            <img className="project-icon" src={icon} alt="" />
                            <div className="project-info-content">
                                <h3>{(props.name) ? props.name : "Project Name"}</h3>
                                <h4>{(props.description) ? props.description : "Description..."}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        )
    }

    return (
        <>
            <div className="main">
                <div className="main__container">
                    <div className="main__content">
                        <h1>PORTFOLIO</h1>
                        <h2>&gt; MY PROJECTS</h2>
                        <p>&lt;Side/Hackathon Projects&gt;</p>
                    </div>
                    <div className="main__img--container">
                        <img src={_portfolio} alt="pic" className="main__img" />
                    </div>
                </div>
            </div>
            <div className="projects">
                <Gallery>
                    { projects.map((project, index) => <Project {...project} key={`project-${index}`} />) }
                </Gallery>
            </div>
        </>
    )
}

export default Projects;