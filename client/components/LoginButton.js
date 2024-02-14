'use client'
import styled from "styled-components";
import { AppContext } from "@/context";
import { useContext } from "react";

/*const style = {
    loginBtn: `
    border-[var(--primary-1)] 0 0 
    text-[var(--primary-1)] 
        hover:text-[var(--primary-2)] 
        hover:border-2 rounded-full px-10 py-4`
}*/

export const LoginButton = (props) => {
    const { connectWallet } = useContext(AppContext);
    return (
        <button className="" onClick={connectWallet}>Log in</button>
    );
}