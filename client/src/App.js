import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Provider } from 'react-redux';
import store from './store'
import Routes from './components/routes';
import { Container } from 'reactstrap';

class App extends React.Component{
  render() {
    return (
      <Provider store={store}>
      {/* <Routes> */}
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
      {/* </Routes> */}
      </Provider>
    );
  }
}

export default App;
