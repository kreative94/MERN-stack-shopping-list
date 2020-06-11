import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { Provider, connect } from 'react-redux';
import store from './store'
import Routes from './components/routes';
import { loadUser } from "./actions/authActions";
import PropTypes from 'prop-types';
import IndexPage from './screens/IndexPage';

class App extends React.Component{

  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
      return (
        <Provider store={store}>
        {/* <Routes /> */}
        <div id="App" className="App">
          <AppNavbar />
            <IndexPage />
        </div>
        </Provider>
      );
    }
}
export default App;
