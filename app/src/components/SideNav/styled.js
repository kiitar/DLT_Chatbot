import styled from "styled-components"


 
export const Hamburker = styled.div`
  background: #384c61;
  width: 255px !important;
  // left: -255px;
  height: 100vh;
  display: block;
  z-index: 999;
  position: fixed;

  @media screen and (max-width: 480px){
    width: ${props => props.animateNav} !important;
    transition: 0.1s;
  }
  `
export const HamburkerNone = styled.div`
  display: block;

  @media screen and (max-width: 480px){
    transition: 0.2s;
    display: ${props => props.display};
  }
  `


export const SelectBot = styled.div`
display: ${props => props.select ? "block":"none"};
`

export const SelectBotWidth = styled.div`
height: ${props => props.selectWidth ? "120px":"0"};
transition: 0.1s;
`
