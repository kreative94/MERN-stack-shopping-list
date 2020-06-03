import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

import { Provider } from 'react-redux';
import store from './components/store'
class App extends React.Component{
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
      </Provider>
    );
  }
}

export default App;
