import React, { Fragment } from 'react';
import { Container, ListGroup, 
    Button, ListGroupItem, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../../actions/ItemActions';
import PropTypes from 'prop-types';
import ItemModal from './ItemModal';

class ListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            _id: ''
        }
    }
    
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }

    onDeleteItemClick = id => {
        this.props.deleteItem(id);
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }
    
    onEditItemClick = id => {
        // const foundItem = {
        //     name: this.state.name
        // }
    }

    render() {
        const { items } = this.props.item;
        const itemsOfListView = (
            <Fragment>
                <ListGroup className="text-left">
                    { items.map(({ _id, name }) => (
                    <TransitionGroup>
                        <CSSTransition classNames="fade" timeout={100} >
                        <ListGroupItem
                        key={_id} 
                        style={{ border: "none", 
                        borderBottom: "1px solid rgba(0,0,0,0.125)"}}>
                        <Button className="mr-3"
                        outline color="danger"
                        size="sm" onClick={this.onDeleteItemClick.bind(this, _id)}>
                            &times;
                        </Button>
                        
                        { name }
                        </ListGroupItem>
                        </CSSTransition>
                    </TransitionGroup>
                        ))}
                </ListGroup>
            </Fragment>
        );

        const nullView = (
            <Fragment>
                <div>
                    <h3> No item have been created yet </h3>
                    <ItemModal />
                </div>
            </Fragment>
        );

        return(
            <Container>
                {this.state.msg ? ( <Alert color="danger">
                            {this.state.msg} </Alert> ) : null }
                { items.length !== 0 ? itemsOfListView : nullView }
            </Container>
        )
    }
}

ListGroup.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // boolean to render list group items edge-to-edge in a parent container
    flush: PropTypes.bool,
    // boolean to render list group items horizontal. string for specific breakpoint, or true to be always horizontal
    horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string,
    cssModule: PropTypes.object,
  }

const mapStatetoProps = state => ({
    item: state.item,
    getItems: PropTypes.func.isRequired
});

export default connect(mapStatetoProps, { getItems, deleteItem })(ListItems);