import React, { Fragment } from 'react';
import { Container, Row, 
    Nav, NavLink, 
    NavItem, TabContent,
    TabPane, Col, Alert, Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { getItems } from '../../actions/ItemActions';
import { getListsFromUser, getActiveList, deleteList, addList } from '../../actions/listActions';
import AddListModal from './AddListModal';
import DeleteListModal from './DeleteListModal';
import ListItems from './ListItems';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ItemModal from './ItemModal';
import "./List.css";
import EditModal from './EditModal';

class ListsTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : '',
            listId: ''
        };
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        getLists: PropTypes.func.isRequired,
        getListsFromUser: PropTypes.func.isRequired,
        getActiveList: PropTypes.func.isRequired,
        deleteList: PropTypes.func.isRequired,
        addList: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        list: PropTypes.object.isRequired,
        activeList: PropTypes.object.isRequired
    }

    onTabChangeClick = (tab) => {
        if(this.state.activeTab !== tab) {
            this.setState({ 
                activeTab: tab,
                listId: tab 
            });
            this.props.getItems(tab);
            this.props.getActiveList(tab); 
        } else {
            return null;
        }
    }

    render() {
        const { lists } = this.props.list;
        const authView = (
            <Fragment>
                <div>
                <div className="tab-header">
                    <Nav tabs color="dark">
                        {this.state.msg ? 
                        ( <Alert color="danger"> 
                            {this.state.msg} 
                        </Alert> ) : null }
                        {lists.map(({ _id, title }) => (
                            <NavItem>
                            <NavLink 
                            key={_id} 
                            className={classnames({ active: this.state.activeTab === _id})}
                            onClick={() => {
                                this.onTabChangeClick(_id)
                                }}>
                                {title}
                            </NavLink>
                        </NavItem>
                        ))}
                    </Nav>
                </div>
                <TabContent activeTab={this.state.activeTab}>
                {lists.map(({ _id, title }) => (
                    <TabPane tabId={_id}>
                        <Container key={_id} className="list-header">
                        <Row>
                            <Col sm="4">
                                <ItemModal />
                            </Col>
                            <Col sm="4">
                                <h3 className="text-center mt-4">{title}</h3>
                            </Col>
                            <Col sm="4">   
                                <ButtonGroup >
                                    <EditModal />
                                    <DeleteListModal />
                                </ButtonGroup>
                                
                            </Col>
                        </Row>
                        </Container>
                       <Container>
                            <Row>
                                <Col sm="12">
                                    <ListItems {...this.state} />
                                </Col>
                            </Row>
                       </Container>
                    </TabPane>
                ))}
                </TabContent>
                </div>
            </Fragment>
        )
        const nullView = (
            <Fragment>
                <Row>
                    <Col className="text-center" sm="12" style={{ top: "25vh", height: "50vh" }}>
                        <h3> No lists have been created yet </h3>
                        <AddListModal />
                    </Col>
                </Row>
            </Fragment>
        )

        return(
            <Container>
                { lists.length !== 0 ? authView : nullView }  
            </Container>
        )
    }
}

NavLink.propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    // pass in custom element to use
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // ref will only get you a reference to the NavLink component, use innerRef to get a reference to the DOM element (for things like focus management).
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  }

Nav.propTypes = {
    tabs: PropTypes.bool,
    pills: PropTypes.bool,
    card: PropTypes.bool,
    justified: PropTypes.bool,
    fill: PropTypes.bool,
    vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    horizontal: PropTypes.string,
    navbar: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
// pass in custom element to use
}

Button.propTypes = {
    active: PropTypes.bool,
    'aria-label': PropTypes.string,
    block: PropTypes.bool,
    color: PropTypes.string, // default: 'secondary'
    disabled: PropTypes.bool,
    outline: PropTypes.bool,
  
    // Pass in a Component to override default button element
    // example: react-router Link
    // default: 'button'
    tag: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
      PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
      ]))
    ]),
  
    // ref will only get you a reference to the Button component, use innerRef to get a reference to the DOM element (for things like focus management).
    innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  
    onClick: PropTypes.func,
    size: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    cssModule: PropTypes.object,
  
    // use close prop for BS4 close icon utility
    close: PropTypes.bool,
  }
  
//Will be used in the near future. Do not delete
// const Styles = {
//     tabs:{
//         borderColor: "var(--primary)",
//         color: "white",
//         backgroundColor: "var(--primary)",
//         borderBottomLeftRadius: 0,
//         borderBottomRightRadius: 0
//     }
// };

const mapStatetoProps = state => ({
    list: state.list,
    activeList: state.list.activeList,
    item: state.item,
    email: PropTypes.string,
    getActiveList: PropTypes.func.isRequired,
    getListsFromUser: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    addList: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
});

export default connect(mapStatetoProps, { getItems, getListsFromUser, getActiveList, deleteList, addList })(ListsTabs);