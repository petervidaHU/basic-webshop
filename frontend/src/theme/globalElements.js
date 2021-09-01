import styled from 'styled-components';
import { color, layout, flexbox, space } from 'styled-system';
import { Box, Card, Text, Button } from 'rebass/styled-components';

export const H1 = styled.h1`
${color}
font-size: 12rem;
`;

export const Row = styled(Box)`
box-sizing: border-box;
margin-left: 1rem; 
margin-right: 1rem; 
margin-bottom: 2rem;
margin-top: ${(({first}) => first ? '6vh' : '2vh')};
max-width: 100vw;
//display: flex;
flex-wrap: wrap;
flex-direction: ${(({row}) => row ? 'row' : 'column')};
`;

export const Table = styled.table`
${color}
${layout}
${flexbox}
`;

export const Img = styled.img`
${layout}
${flexbox}
`;