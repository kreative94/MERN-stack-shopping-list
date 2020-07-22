import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup,
    ButtonGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteList } from '../../actions/listActions';
import PropTypes from 'prop-types';

class DeleteListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            msg: null,
            _id: ''
        }
        this.baseState = this.state;
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        list: PropTypes.object.isRequired,
        activeList: PropTypes.object.isRequired,
        deleteList: PropTypes.func.isRequired
    }
    
    toggle = () => {
        const { activeList } = this.props.list;
        const listId = activeList.map((activeList) => { 
            return activeList._id });

        this.setState({
            modal: !this.state.modal,
            _id: listId

        });
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = () => {
        this.props.deleteList(this.state._id);

        this.toggle();
        this.setState(this.baseState);
    }

    onCancel(e) {
        e.preventDefault();
        // this.setState(this.baseState);
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button color="danger" onClick={this.toggle} href="#">
                    Delete
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Delete</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup className="text-center">
                                <h3> Are you sure you want to delete 
                                    this list?
                                </h3>
                                <small style={{color: "red"}}>This cannot be undone</small>
                                <br />
                                <ButtonGroup>
                                <Button color="danger" 
                                style={{marginTop: '2rem'}}
                                block>Delete</Button>

                                <Button color="light" 
                                onClick={this.onCancel.bind(this)}
                                style={{marginTop: '2rem'}}
                                block>Nevermind</Button>
                                </ButtonGroup>
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
    activeList: state.list.activeList,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { deleteList })(DeleteListModal);