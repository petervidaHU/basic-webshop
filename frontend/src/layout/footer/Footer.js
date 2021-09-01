import React from 'react'
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterCont>
            <FooterDiv>
           footer 
            </FooterDiv>
        </FooterCont>
    )
}

export default Footer;

const FooterCont = styled.footer`
min-height: 25vh;
background-color: darkslategray;
`;

const FooterDiv = styled.footer`
color: white;
margin: 3rem;
padding: 2rem 0;
`;
