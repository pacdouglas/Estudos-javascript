import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header store={this.context.store} />
          <Timeline login={this.props.params.login} store={this.context.store} />
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object.isRequired
}

export default App;
