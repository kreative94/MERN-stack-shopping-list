import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup,
    Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addList } from '../../actions/listActions';
import PropTypes from 'prop-types'

class AddListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            open: false,
            isAuthenticated: false,
            title: '',
            owner: ''
         }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        list: PropTypes.object.isRequired
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            owner: this.props.user
        });
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const newList = {
            title: this.state.title,
            owner: this.state.owner
        }
        
        this.props.addList(newList);

        this.toggle();
    }

    render() {
        // const { user } = this.props.auth;

        return(
            <div>
                <Button id="add-new" color="primary"
                outline
                onClick={this.toggle}>
                    <i className="fas fa-plus"></i>
                    New List
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>                    
                    <ModalHeader toggle={this.toggle}>Create a new List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                {/* <p>{user.id}</p> */}
                                <Label for="list">List</Label>
                                <Input type="text" name="title" id="list" placeholder="ie: Groceries, Office Supplies, School, etc." 
                                onChange={this.onChange} />
                                <Button color="primary" 
                                style={{marginTop: '2rem'}}
                                block>Create</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.list,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {addList})(AddListModal);