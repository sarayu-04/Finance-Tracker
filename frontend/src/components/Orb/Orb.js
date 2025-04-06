import React from "react";
import styled, { keyframes } from 'styled-components'
import { useWindowSize } from "../../utils/useWindowSize";

function Orb() {

    const {width, height} = useWindowSize()

    console.log(width, height)
//(actual line 16 =>)       transform: translate(${width/1.2}px, ${height}px);
    const moveOrb = keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(700px, 500px);
        }
        100%{
            transform: translate(0, 0);
        }
    `;

    const OrbStyled = styled.div`
        width: 100vh;
        height: 100vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg,rgb(241, 45, 124) 0%,rgb(221, 38, 38) 100%);
        filter: blur(400px);
        animation: ${moveOrb} 15s alternate linear infinite;
    `;

    return (
        <OrbStyled>Orb</OrbStyled>
    )
}

export default Orb