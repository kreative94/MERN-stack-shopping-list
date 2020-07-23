import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup,
    Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem, addItemToList } from '../../actions/ItemActions';
import { getActiveList } from '../../actions/listActions';
import PropTypes from 'prop-types'

class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            listedIn: '',
            owner: ''
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        list: PropTypes.object,
        item: PropTypes.object,
        user: PropTypes.object.isRequired,
        activeList: PropTypes.object.isRequired
    }

    toggle = () => {
        const { activeList } = this.props.list;
        const listOfItem = activeList.map((activeList) => { return activeList._id })
        this.setState({
            modal: !this.state.modal,
            owner: this.props.user,
            listedIn: listOfItem
        });
    }
    
    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name,
            listedIn: this.state.listedIn,
            owner: this.state.owner  
        }

        this.props.addItemToList(this.state.listedIn, newItem);

        this.toggle();
    }

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? 
                <Button id="add-item" color="light" 
                className="btn-outline-primary"
                onClick={this.toggle}><i className="fas fa-plus"></i> Add Item</Button>
                    : <h4 className="mb-3 ml-4"> Please login to manage items</h4> }
                <Modal className="mt-5" isOpen={this.state.modal} toggle={this.toggle}>      
                    <ModalHeader toggle={this.toggle}><p>Add new item to list: {this.state.activeList}</p></ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Name</Label>
                                <Input type="text" name="name" id="item" placeholder="cookies, bottle, go to store, etc." 
                                onChange={this.onChange} />
                                <Button color="primary" 
                                style={{ marginTop: '2rem' }}
                                block>Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    list: state.list,
    user: state.auth.user,
    activeList: state.list.activeList,
    addItemToList: PropTypes.func.isRequired,
    getActiveList: PropTypes.func.isRequired,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem, addItemToList, getActiveList })(ItemModal);