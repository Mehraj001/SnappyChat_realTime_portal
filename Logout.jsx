import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'
export default function Logout() {
  const navigate=useNavigate();
  const handleClick= async ()=>{
    localStorage.clear();
    navigate("/login")

  }
  return (
    <Button onClick={handleClick}>
      <BiPowerOff/>
    </Button>
  )
}
const Button=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    background-color: #60a1aa;
    border: none;
    svg{
      font: 1.3rem;
      color: #8d06cc;

    }
`;

