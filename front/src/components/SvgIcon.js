import React from 'react';
import PropTypes from 'prop-types';

export const ICONS_CONSTS = {
  setaEsquerda: 'M13.69,21l-2.42-2.43H29V14.19H11.27l2.42-2.43L10.63,8.7,3,16.35,10.63,24ZM9.11,16.34v0Z',
};

const SvgIcon = ({
  title, desc, type, ...otherProps
}) => (
  <svg
    {...otherProps}
  >
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d={type} style={{ pointerEvents: 'none' }} />
  </svg>
);

SvgIcon.propTypes = {
  type: PropTypes.string.isRequired,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
};

SvgIcon.defaultProps = {
  viewBox: '0 0 32 32',
  fill: '',
  width: '32px',
  height: '32px',
  title: '',
  desc: 'Um icone',
};

export default SvgIcon;
