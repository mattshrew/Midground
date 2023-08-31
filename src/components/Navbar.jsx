import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

import '../styles.css';
import '../styles/Navbar.css';

import pages from '../data/pages.json';

/* global google */
const Navbar = () => {
    const [user, setUser] = useState({});
    const [curPage, setCurPage] = useState("Home");

    function handleCallbackResponse(response) {
        const userObject = jwt_decode(response.credential);
        setUser(userObject);
        console.log(userObject);
    }

    async function createOAuthButton() {
        try {
            await google.accounts.id.initialize({
                client_id: "490372009770-m79o5oh24301qsvnsbeftqkm70t5c0r6.apps.googleusercontent.com",
                callback: handleCallbackResponse
            });
        } catch (e) {
            console.log("Error:", e);
        }
    }

    async function renderOAuthButton() {
        try {
            await google.accounts.id.renderButton(
                document.querySelector(".g_id_signin"),
                { theme: "filled_black", size: "large", text: "signin", logo_alignment: "right" }
            );
        } catch (e) {
            console.log("Error:", e);
        }
    }

    // async function logout() {
    //     setUser({});
    //     await createOAuthButton();
    //     await renderOAuthButton();
    // }

    useEffect(() => {
        createOAuthButton();
        renderOAuthButton();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        async function OAuthButton() {
            if (Object.keys(user).length === 0) {
                await createOAuthButton();
                await renderOAuthButton();
            }
        }
        OAuthButton();
        // eslint-disable-next-line
    }, [user, curPage]);

    useEffect(() => {
        document.title = `${curPage} - Midground`;
    }, [curPage])

    function Nav(props) {
        return (
            <nav className="navbar">
                <div className="navbar__container">
                    {props.children}
                </div>
            </nav>
        )
    }

    function NavLogo() {
        return <Link to="/" id="navbar__logo"><i className="fas fa-moon"></i>MIDGROUND</Link>
    }

    function NavToggle() {
        function menuToggle() {
            let menu = document.querySelector('#mobile-menu');
            let menuLinks = document.querySelector('.navbar__menu');
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        }

        return (
            <div className="navbar__toggle" id="mobile-menu" onClick={menuToggle}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
            </div>
        )
    }

    function NavMenu() {
        function NavItem(props) {
            const [open, setOpen] = useState(false);

            return (
                <li className="navbar__item">
                    {(props.children.length) ? (
                        <Link to={props.path} className={`navbar__links${(props.children.map(child => child.name).includes(curPage)) ? " navbar__links--current" : ""}`} onClick={() => setOpen(!open)}>{props.name}&nbsp;{(open) ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}</Link>
                    ) : (
                        <Link to={props.path} className={`navbar__links${(curPage === props.name) ? " navbar__links--current" : ""}`} onClick={() => setCurPage(props.name)}>{props.name}</Link>
                    )}
                    
                    {open && <DropdownMenu {...props} />}
                </li>
            )
        }

        function DropdownMenu(props) {
            return (
                <div className="navbar__dropdown">
                    { props.children.map((child) => <NavItem {...child} key={child.name} />) }
                </div>
            )
        }

        function NavAccount() {
            return (
                <>
                    {(Object.keys(user).length === 0) ? (
                        <li className="navbar__btn">
                            <div className="g_id_signin"></div>
                        </li>
                    ) : (
                        <li className="navbar__account">
                            <img className="navbar__picture" src={user.picture} alt="profile_pic" />
                            <p onClick={() => {setUser({})}}>{user.name}<br />{"< Logout />"}</p>
                        </li>
                    )}
                </>
            )
        }

        return (
            <ul className="navbar__menu">
                { pages.map((page) => <NavItem {...page} key={page.name} />) }
                <NavAccount />
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
    //     <nav className="navbar">
    //         <div className="navbar__container">
    //             <Link to="/" id="navbar__logo"><i className="fas fa-moon"></i>MIDGROUND</Link>
    //             <div className="navbar__toggle" id="mobile-menu" onClick={menuToggle}>
    //                 <span className="bar"></span>
    //                 <span className="bar"></span>
    //                 <span className="bar"></span>
    //             </div>
    //             <ul className="navbar__menu">
    //                 { pages.map((page) => {
    //                     return (
    //                         <li className="navbar__item">
    //                             <Link to={page.path} key={page.name} className={`navbar__links${(curPage === page.name) ? " navbar__links--current" : ""}`} onClick={() => setCurPage(page.name)}>{page.name}</Link>
    //                         </li>
    //                     );
    //                 }) }
    //                 <li className="navbar__btn">
    //                     <Link to="/" className="sign-in" onClick={() => {setCurPage("Home")}}>Sign In</Link>
    //                 </li>
    //             </ul>
    //         </div>
    //     </nav>
    // );
}


export default Navbar;

