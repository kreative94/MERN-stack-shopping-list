import React, { Fragment, Component } from 'react';
import { Container, Row, 
    Nav, NavLink, 
    NavItem, TabContent,
    TabPane, Col, ListGroup, 
    Button, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/ItemActions';
import { getLists, getListsFromUser, deleteList } from '../actions/listActions';
import PropTypes from 'prop-types';
import ListsTabs from '../components/list/ListsTabs';
import ItemModal from '../components/list/ItemModal';
import classnames from 'classnames';

class ShoppingList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            activeTab : '1',
            selectedList: this.activeTab,
            value: null
        }       
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        getLists: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        list: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        auth: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.getItems();
        this.props.getLists();
        this.props.getListsFromUser();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    onDeleteListClick = id => {
        this.props.deleteList(id);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { lists } = this.props.list;
        return(
            <Container className="text-center">
                    <strong className="text-center">
                        { user ? `Welcome back, ${user.name}` : null }
                    </strong> 
                    <ListsTabs />
            </Container>
        );
    }
}

const mapStatetoProps = (state) => ({
    item: state.item,
    list: state.list,
    getItems: PropTypes.func.isRequired,
    getLists: PropTypes.func.isRequired,
    getListsFromUser: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(mapStatetoProps, { getItems, getListsFromUser, getLists, deleteItem, deleteList })(ShoppingList);