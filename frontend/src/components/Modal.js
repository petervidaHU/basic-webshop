import React from 'react';
import { layout } from 'styled-system';
import styled from 'styled-components';

const Modal = ({ open, children }) => {
console.log('modalban:', open);

    return (<Backdrop open={open} >
        <ModalDiv open={open}
            
        >
            {children}
        </ModalDiv>
        </Backdrop>
    )
}

export default Modal

const ModalDiv = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
height: 300px;
width: 400px;
display: ${({ open }) => open === true ? 'block' : 'none' };
${layout};
margin: 0 0;
background-color: lightcoral;
z-index: 1000;
`;

const Backdrop = styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
  right: 0;
width: 100vw;
height: 100vh;
display: ${({ open }) => open === true ? 'block' : 'none' };
${layout};
margin: auto;
background-color: rgba(0,0,0,.6);
z-index: 999;
`;

