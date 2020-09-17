import React from 'react';
import AppContext from '../AppContext';

import styles from './LoadingView.module.scss';

export default class LoadingView extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ loading }) =>
          loading && (
            <div className={styles.wrapper}>
              <div className={styles.loader} />
            </div>
          )
        }
      </AppContext.Consumer>
    );
  }
}
