import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Gravatar } from 'react-gravatar';
import { connect } from 'react-redux';
import { getItems, addItem, deleteItem } from '../actions/ItemActions';
import { getListsFromUser, addList, deleteList } from '../actions/listActions';
// import { clearErrors, returnErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';
import ListsTabs from '../components/list/ListsTabs';
import AddListModal from '../components/list/AddListModal';

class ListDashboard extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            value: null
        }       
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        getListsFromUser: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        list: PropTypes.object.isRequired,
        error: PropTypes.object,
        clearErrors: PropTypes.func,
        isAuthenticated: PropTypes.bool.isRequired,
        auth: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        activeList: PropTypes.object
    }

    componentDidMount() {
        this.props.getListsFromUser();
        if(this.state.activeList === '') {
            console.log('no list has been selected yet')
        }
        this.setState({ listId: this.state.activeTab });
    }

    render() {
        const { user } = this.props.auth;
        return(
            <div>
                <div className="mt-5" id="dashboard-hero">
                    <Container className="text-center">
                        <Row>
                            <Col sm="9" md="8">
                                <strong className="text-left">
                                    { user ? `Welcome back, ${user.name}` : null }
                                </strong> 
                            </Col>
                            <Col sm="3" md="4">
                                <AddListModal />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <ListsTabs />
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    item: state.item,
    list: state.list,
    auth: state.auth,
    user: state.auth.user,
    error: state.error,
    activeList: state.list.activeList,
    getItems: PropTypes.func.isRequired,
    getListsFromUser: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    addList: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStatetoProps, { getItems, getListsFromUser, addItem, addList, deleteItem, deleteList })(ListDashboard);