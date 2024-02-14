'use client'
import styled from "styled-components";
import { LoginButton } from "@/components/LoginButton";
import log from "./login.css"

/*const styles = {
    header: `flex justify-center items-center flex-nowrap relative`,
    nav: `max-w-6xl pt-12 pb-16 flex justify-between items-center flex-nowrap relative`,
    logoWrapper: `w-[700] absolute bottom-[-2] right-[150] z-[-1]`,
    section: `flex align-start min-h-[700] pb-[138] pt-[40] px-[60] relative flex-wrap w-full max-w-1128 mx-auto items-center`,
    hero: `w-full h-1/2 flex flex-col justify-center items-center`,
    h1: `pb-0 w-55% text-5xl font-semibold text-[var(--primary-1)] leading-70`,
}*/

const Login = (props) => {
  return (
      <section>
        <div className="container">
            <img src="/images/login-logo.svg" alt="" />
            <div className="content">
                <h1>Welcome to your professional community</h1>
                <LoginButton/>
            </div>
                <img src="/images/login-hero.svg" alt="" />
        </div>
      </section>
  );
};


const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1428px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    position: absolute;
    top: 0;
    width: 55%;
    font-size: 30px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    /* z-index: -1; */
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);

  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

export default Login;