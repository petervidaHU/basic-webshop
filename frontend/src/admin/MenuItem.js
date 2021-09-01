import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({
  isActive, clickHandler, text, targetroute,
}) => (
  <div
    className={`${isActive === text ? 'active' : null}`}
    onClick={clickHandler}
    onKeyDown={clickHandler}
    data-text={text}
    role="button"
    aria-hidden
    data-targetroute={targetroute}
  >
    {text}
  </div>
);

export default MenuItem;

MenuItem.propTypes = {
  isActive: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  targetroute: PropTypes.string.isRequired,
};
