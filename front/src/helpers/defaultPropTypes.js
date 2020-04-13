import PropTypes from 'prop-types';

export const RoutedPagePropTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
