import React, { Fragment } from 'react';
import { Container, Row, 
    Nav, NavLink, 
    NavItem, TabContent,
    TabPane, Col, ListGroup, 
    Button, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems } from '../../actions/ItemActions';
import { getListsFromUser, deleteList } from '../../actions/listActions';
import ListModal from './ListModal';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class ListsTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            auth: false
        }
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        getLists: PropTypes.func.isRequired,
        getListsFromUser: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        list: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        auth: PropTypes.object.isRequired
    }

    toggle(tab) {
        if(this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
            getItems(tab);
        } 
    }

    getItemsFromList(selectedId) {

    }

    render() {
        const { lists } = this.props.list;
        const { items } = this.props.item;
        const authView = (
            <Fragment>
                <div>
                <div className="tab-header">
                    <Nav tabs>
                        {lists.map(({ _id, title }) => (
                            <NavItem color="primary" key={_id}>
                            <NavLink className={classnames({ active: this.state.activeTab === _id})}
                            onClick={() => {this.toggle(_id); }}>
                                {title}
                            </NavLink>
                        </NavItem>
                        ))}
                    </Nav>
                </div>
                <TabContent activeTab={this.state.activeTab}>
                {lists.map(({ _id, title }) => (
                    <TabPane tabId={_id} key={_id}>
                        <Row>
                            <Col sm="12">
                                <h3 className="text-center mt-4">{title}</h3>
                                <ListGroup>
                                    { items.map(({_id, name}) => (
                                    <TransitionGroup onLoad={() => {this.toggle(this.state.activeTab)}}>
                                        <CSSTransition key={_id} classNames="fade" timeout={100} >
                                        <ListGroupItem style={{ border: "none", 
                                        borderBottom: "1px solid rgba(0,0,0,0.125)"}}>
                                        <Button className="btn-light btn-outline-danger"
                                        color="danger"
                                        size="sm">
                                            &times;
                                        </Button>
                                        { name }
                                        </ListGroupItem>
                                        </CSSTransition>
                                    </TransitionGroup>
                                     ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </TabPane>
                ))}
                </TabContent>
                </div>
            </Fragment>
        )

        const nullView = (
            <Fragment>
                <h3> No lists have been created yet </h3>
                <ListModal />
            </Fragment>
        )
        return(
            <Container>
                { lists.length !== 0 ? authView : nullView }  
            </Container>
        )
    }
}

const mapStatetoProps = state => ({
    list: state.list,
    item: state.item,
    getListsFromUser: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(mapStatetoProps, { getItems, getListsFromUser })(ListsTabs);