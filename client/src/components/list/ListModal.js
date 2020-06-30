import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup,
    Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addList } from '../../actions/listActions';
import PropTypes from 'prop-types'
class ListModal extends Component {
    state = {
        modal: false,
        open: false,
        isAuthenticated: false
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        list: PropTypes.object
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        
        const newList = {
            title: this.state.title
        }
        this.props.addItem(newList);

        this.toggle();
    }

    
    render() {
        return(
            <div>
                { this.props.isAuthenticated ? 
                <Button id="add-item" color="light" className="mt-4 btn-outline-primary"
                onClick={this.toggle}><i className="fas fa-plus"></i> New List</Button>
                    : <h4 className="mb-3 ml-4"> Please login to manage items</h4> }
                <Modal isOpen={this.state.modal} toggle={this.toggle}>                    
                    <ModalHeader toggle={this.toggle}>Create a new List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">List</Label>
                                <Input type="text" name="name" id="item" placeholder="ie: Groceries, Office Supplies, School, etc." 
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
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addList})(ListModal);