import React from 'react';
import cn from 'classnames';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

// documents
import DocumentListContainer from 'containers/Document/List';
import DocumentAddContainer from 'containers/Document/Add';
import DocumentEditContainer from 'containers/Document/Edit';

// settings
import SettingsContainer from 'containers/Settings';

import styles from './Router.module.scss';

class Router extends React.Component {
  render() {
    let selectedMenuItem = 0;
    if (window.location.pathname.startsWith('/files')) {
      selectedMenuItem = 0;
    }
    return (
      <div className={styles.wrapper}>
        <header>Inaday Admin</header>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Link
              to='/files'
              className={cn(
                styles.menuitem,
                selectedMenuItem === 0 && styles['menuitem-selected']
              )}
            >
              Files
            </Link>
            <Link
              to='/settings'
              className={cn(
                styles.menuitem,
                selectedMenuItem === 0 && styles['menuitem-selected']
              )}
            >
              Settings
            </Link>
          </div>
          <div className={styles.content}>
            <Switch>
              <Route path='/files/add' component={DocumentAddContainer} />
              <Route
                path='/files/edit/:id'
                component={DocumentEditContainer}
              />
              <Route path='/files' component={DocumentListContainer} />
              <Route path='/settings' component={SettingsContainer} />
              <Redirect to='/files' />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Router;
