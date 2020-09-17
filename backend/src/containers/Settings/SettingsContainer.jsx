import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'components';
import styles from './SettingsContainer.module.scss';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  async componentDidMount() {
    this.context.showLoading();

    this.context.hideLoading();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1> Settings </h1>
        <div className={styles.container}>

        </div>
        
      </div>
    );
  }
}

SettingsContainer.contextType = AppContext;

SettingsContainer.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default SettingsContainer;
