import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';
import '../styles/Navbar.css';

import pages from '../data/pages.json';

function Navbar() {
    const [curPage, setCurPage] = useState("Home");

    useEffect(() => {
        document.title = `${curPage} - Midground`;
    }, [curPage])

    function Nav(props) {
        return (
            <nav class="navbar">
                <div class="navbar__container">
                    {props.children}
                </div>
            </nav>
        )
    }

    function NavLogo() {
        return <Link to="/" id="navbar__logo"><i class="fas fa-moon"></i>MIDGROUND</Link>
    }

    function NavToggle() {
        function menuToggle() {
            let menu = document.querySelector('#mobile-menu');
            let menuLinks = document.querySelector('.navbar__menu');
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        }

        return (
            <div class="navbar__toggle" id="mobile-menu" onClick={menuToggle}>
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
            </div>
        )
    }

    function NavMenu() {
        function NavItem(props) {
            const [open, setOpen] = useState(false);

            return (
                <li class="navbar__item">
                    {(props.children.length) ? (
                        <Link to={props.path} class={`navbar__links${(props.children.map(child => child.name).includes(curPage)) ? " navbar__links--current" : ""}`} onClick={() => setOpen(!open)}>{props.name}&nbsp;{(open) ? <i class="fas fa-caret-up"></i> : <i class="fas fa-caret-down"></i>}</Link>
                    ) : (
                        <Link to={props.path} class={`navbar__links${(curPage === props.name) ? " navbar__links--current" : ""}`} onClick={() => setCurPage(props.name)}>{props.name}</Link>
                    )}
                    
                    {open && <DropdownMenu {...props} />}
                </li>
            )
        }

        function DropdownMenu(props) {
            return (
                <div class="navbar__dropdown">
                    { props.children.map((child) => <NavItem {...child} />) }
                </div>
            )
        }

        function NavBtn() {
            return (
                <li class="navbar__btn">
                    <Link to="/" class="sign-in" onClick={() => {setCurPage("Home")}}>Sign In</Link>
                </li>
            )
        }

        return (
            <ul class="navbar__menu">
                { pages.map((page) => <NavItem {...page} />) }
                <NavBtn />
            </ul>
        )
    }

    return (
        <Nav>
            <NavLogo />
            <NavToggle />
            <NavMenu />
        </Nav>
    )
    
    // return (
    //     <nav class="navbar">
    //         <div class="navbar__container">
    //             <Link to="/" id="navbar__logo"><i class="fas fa-moon"></i>MIDGROUND</Link>
    //             <div class="navbar__toggle" id="mobile-menu" onClick={menuToggle}>
    //                 <span class="bar"></span>
    //                 <span class="bar"></span>
    //                 <span class="bar"></span>
    //             </div>
    //             <ul class="navbar__menu">
    //                 { pages.map((page) => {
    //                     return (
    //                         <li class="navbar__item">
    //                             <Link to={page.path} key={page.name} class={`navbar__links${(curPage === page.name) ? " navbar__links--current" : ""}`} onClick={() => setCurPage(page.name)}>{page.name}</Link>
    //                         </li>
    //                     );
    //                 }) }
    //                 <li class="navbar__btn">
    //                     <Link to="/" class="sign-in" onClick={() => {setCurPage("Home")}}>Sign In</Link>
    //                 </li>
    //             </ul>
    //         </div>
    //     </nav>
    // );
}


export default Navbar;

