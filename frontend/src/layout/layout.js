import React from 'react'
import styled from 'styled-components';
import Footer from './footer/Footer'
import Header from './header/Header'
import { color, layout } from 'styled-system';

const Layout = ({
    children,
    leftSide = null, rightSide = null,
    leftSideChildren, rightSideChildren
}) => {
    return (
        <>
            <Header />
            <MainContainer
                display={['flex']}>

                <AsideStyled
                    bg={'red'}
                    display={['none', , `${leftSide ? 'block' : 'none'}`]}
                    width={[2 / 12]}>
                    {leftSideChildren && leftSideChildren()}
                </AsideStyled>

                <MainStyled>
                    {children}
                </MainStyled>

                <AsideStyled
                    bg={'pink'}
                    display={['none', , , `${rightSide ? 'block' : 'none'}`]}
                    width={[3 / 12]}>
                    {rightSideChildren && rightSideChildren()}
                </AsideStyled>

            </MainContainer>
            <Footer />
        </>
    )
};

export default Layout;

const MainContainer = styled.main`
${layout}
${color}
margin: 9vh 3rem 0 3rem;
min-height: 70vh;
`;

const MainStyled = styled.div`
${layout}
width:100%;
flex-grow: 0;
`;

const AsideStyled = styled.aside`
margin: 0, 1rem;
${layout}
${color}
`;
