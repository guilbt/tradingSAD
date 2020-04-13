import PropTypes from 'prop-types';

export const camposDefaultPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  setValue: PropTypes.func.isRequired,
};
