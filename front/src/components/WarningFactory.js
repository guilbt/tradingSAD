import React from 'react';
import { uniqueId } from 'lodash';
import Warning from './Warning';

export default class WarningFactory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  bindEventListeners = () => {
    document.addEventListener('WARN-message', e => this.createNewWarning(e.detail));

    // document.addEventListener('MODAL-removeModalByKey', (e) => this.removeModalByKey(e.detail))
  }

  removeEventListeners = () => {
    document.removeEventListener('WARN-message', this.createNewWarning);

    // document.removeEventListener('MODAL-removeModalByKey', this.removeModalByKey)
  }

  componentDidMount = () => {
    this.bindEventListeners();
  }

  componentWillUnmount = () => {
    this.removeEventListeners();
  }

  closeWarning = id => {
    this.setState({
      [id]: null,
    });
  }

  createNewWarning = ({ id = uniqueId('error-key_'), ...error }) => {
    this.setState({
      [id]: <Warning {...error} key={id} id={id} close={this.closeWarning} />,
    });
  }

  render() {
    if (this.state && Object.keys(this.state).length > 0) {
      return Object.values(this.state);
    }
    return null;
  }
}
