import React from 'react';
import { color, layout, flexbox } from 'styled-system';
import styled from 'styled-components';

const Main = ({children}) => {
    return (
        <MainStyled
        display={['flex']}
        >
            {children}
        </MainStyled>
    )
};

export default Main;

const MainStyled = styled.main`
${layout}
`;
