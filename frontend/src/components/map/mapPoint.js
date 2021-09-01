import React from 'react';
import styled from 'styled-components';

const MapPoint = ({ id, text, handler, selected }) => {
  console.log(selected === id)
  return (
    <Marker
      selected={selected}
      data-id={id}
      myId={id}
      onClick={handler} tag="marker">
      <Tooltip>{text}</Tooltip>
    </Marker>
  )
}

export default MapPoint

const SIZE = 10;

const Marker = styled.div`
  // position: relative;
  // display: inline-block;
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  left: ${-SIZE / 2}px;
  top: ${-SIZE / 2}px;

  border: 5px solid ${({ selected, myId }) => selected === myId ? 'green' : 'red'};
  border-radius: 50%;
  background-color: white;
  text-align: center;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  padding: 4px;
  cursor: pointer;

  &:hover {
    border: 5px solid green;
    color: #f44336
    }

  &:hover span {
    visibility: visible;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: green;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: -15px;
  left: 160%;

  &::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent green transparent transparent;
}
`;
