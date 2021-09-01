import React from 'react';
import PropTypes from 'prop-types';

const Sorter = ({ handler, type, title }) => (
  <div className="d-flex">
    <span className="pe-2">{title}</span>
    <span className="d-inline" name={type}>
      <div
        className="up-arrow"
        name="1"
        role="button"
        onClick={handler}
        onKeyDown={handler}
        tabIndex={0}
        aria-label="ascending"
      />
      <div
        className="down-arrow mt-1"
        name="-1"
        onClick={handler}
        onKeyDown={handler}
        role="button"
        tabIndex={0}
        aria-label="descending"
      />
    </span>
  </div>
);

export default Sorter;

Sorter.propTypes = {
  handler: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};