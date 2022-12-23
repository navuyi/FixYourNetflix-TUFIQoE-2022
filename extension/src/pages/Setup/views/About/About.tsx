import React from "react";
import style from "./style.module.scss"

import logo from "../../../../assets/img/norway-grants-logo.png"
import { useNavigate } from "react-router";


const About = () => {
    const navigate = useNavigate()
    return(
        <>
        <div className={style.about}>
            <div className={style.wrapper}>
                <img className={style.logo} src={logo} alt=""/>
                <span className={style.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </span>
                <button className={style.return_btn} onClick={() => {navigate("/", {replace: true})}}>Return</button>
            </div>
        </div>
        </>   
    )
}

export default About