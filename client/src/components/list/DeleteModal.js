import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup,
    Label, Input, NavLink, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteList } from '../../actions/listActions';
import PropTypes from 'prop-types';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            msg: null
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    };
    
    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const {name, email, password } = this.state;

        const newUser = {
            name, email, password
        };
        
        this.props.register(newUser);
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger"> {this.state.msg} </Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup id="register-form">
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="ex: Jane Doe"
                                onChange={this.onChange} />

                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="ex: janedoe91@example.com"
                                onChange={this.onChange} />

                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="Password" placeholder="Password"
                                onChange={this.onChange} />

                                <Button color="primary" 
                                style={{marginTop: '2rem'}}
                                block>Register</Button>
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
})

export default connect(mapStateToProps, { deleteList })(DeleteModal);