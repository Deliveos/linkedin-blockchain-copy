'use client'
import styled from "styled-components";
import { LoginButton } from "@/components/LoginButton";
import log from "./main.css"

/*const styles = {
    header: `flex justify-center items-center flex-nowrap relative`,
    nav: `max-w-6xl pt-12 pb-16 flex justify-between items-center flex-nowrap relative`,
    logoWrapper: `w-[700] absolute bottom-[-2] right-[150] z-[-1]`,
    section: `flex align-start min-h-[700] pb-[138] pt-[40] px-[60] relative flex-wrap w-full max-w-1128 mx-auto items-center`,
    hero: `w-full h-1/2 flex flex-col justify-center items-center`,
    h1: `pb-0 w-55% text-5xl font-semibold text-[var(--primary-1)] leading-70`,
}*/

const Home = (props) => {

  return (
      <section>
          <img src="/images/login-logo.svg" alt="" />
        <div className="container">
            <header>
                <a href="#">add friends</a>
                <div id="search">
                    <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
                        <rect className="bar"/>

                        <g className="magnifier">
                            <circle className="glass"/>
                            <line className="handle" x1="32" y1="32" x2="44" y2="44"></line>
                        </g>

                        <g className="sparks">
                            <circle className="spark"/>
                            <circle className="spark"/>
                            <circle className="spark"/>
                        </g>

                        <g className="burst pattern-one">
                            <circle className="particle circle"/>
                            <path className="particle triangle"/>
                            <circle className="particle circle"/>
                            <path className="particle plus"/>
                            <rect className="particle rect"/>
                            <path className="particle triangle"/>
                        </g>
                        <g className="burst pattern-two">
                            <path className="particle plus"/>
                            <circle class="particle circle"/>
                            <path class="particle triangle"/>
                            <rect class="particle rect"/>
                            <circle class="particle circle"/>
                            <path class="particle plus"/>
                        </g>
                        <g class="burst pattern-three">
                            <circle class="particle circle"/>
                            <rect class="particle rect"/>
                            <path class="particle plus"/>
                            <path class="particle triangle"/>
                            <rect class="particle rect"/>
                            <path class="particle plus"/>
                        </g>
                    </svg>
                    <input type="search" name="q" aria-label="Search for inspiration"/>
                </div>
                <div className="action">
                    <div className="profile" /*onClick={}*/>
                        <img src="./assets/avatar.jpg" />
                    </div>
                    <div className="menu">
                        <h3>Someone Famous<br /><span>Website Designer</span></h3>
                        <ul>
                            <li>
                                <img src="/images/log-out.png" /><a href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="firstCard">
                    <h1>Asylkhan Miras</h1>
                    <p>as;lda;sd;asd;a</p>
                </div>
                <div className="secondCard">
                    main-content
                </div>
                <div className="thirdCard">
                    some sidebar
                </div>
            </div>
        </div>
      </section>
  );
};

/*
function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.className.toggle("active");
}
*/

export default Home;