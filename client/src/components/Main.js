require('normalize.css');
require('styles/App.css');
require('bootstrap-loader');

import React from 'react';
import Nav from './Navigation';
import ContactTable from './ContactTable';


class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <ContactTable />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
