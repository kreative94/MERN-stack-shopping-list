import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, Input, Form, FormGroup,
    ButtonGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateList } from '../../actions/listActions';
import PropTypes from 'prop-types';

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            open: false,
            isAuthenticated: false,
            _id: '',
            title: '',
         }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        list: PropTypes.object.isRequired
    }
    
    toggle = () => {
        const { activeList } = this.props.list;
        const listId = activeList.map((activeList) => { return activeList._id });
        
        const listTitle = activeList.map((activeList) => { 
            return activeList.title });

        this.setState({
            modal: !this.state.modal,
            _id: listId,
            title: listTitle
        });
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onCancel(e) {
        e.preventDefault();
        // this.setState(this.baseState);
        this.toggle();
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ title: this.state.title })
        
        this.props.updateList(this.state._id);

        this.toggle();
    }
    render() {
        return(
            <div>
                <Button color="warning" onClick={this.toggle} href="#">
                    Edit
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup className="text-center">
                                <h3> Change title to:
                                </h3>
                                <br />
                                <Input type="text" name="title" id="list" placeholder="ie: Groceries, Office Supplies, School, etc." 
                                onChange={this.onChange} />
                                <ButtonGroup>
                                <Button color="success" 
                                style={{ marginTop: '2rem' }}
                                block>Update</Button>
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

export default connect(mapStateToProps, { updateList })(EditModal);