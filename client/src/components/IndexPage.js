import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/ItemActions';
import PropTypes from 'prop-types';
import ItemModal from './ItemModal';
import HomePage from './HomePage';
import ShoppingList from './ShoppingList';
//Keeps the endpoint at '/'
//Changes the component if the user is authenticated or not
class IndexPage extends React.Component{

    static propTypes = ({
        isAuthenticated: PropTypes.bool.isRequired
    });

    render() {
        //If the user is logged in, display the shopping list
        return(
           <div>
                {this.props.isAuthenticated ?
                    <ShoppingList />
                :
                    <HomePage  />
                }
           </div>
        );
        //if not, display the splashpage 
    }
}

const mapStatetoProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStatetoProps, null)(IndexPage);