import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomePage from './HomePage';
import ListDashboard from './ListDashboard';
//Keeps the endpoint at '/'
//Changes the component if the user is authenticated or not
class IndexPage extends React.Component{

    state = {
        isAuthenticated: false
    }
    
    static propTypes = ({
        item: PropTypes.object,
        list: PropTypes.object,
        isAuthenticated: PropTypes.bool
    });

    render() {
        //If the user is logged in, display the shopping list
        return(
           <div>
                {this.props.isAuthenticated ?
                    <ListDashboard />
                :
                    <HomePage  />
                }
           </div>
        );
        //if not, display the splashpage 
    }
}

const mapStatetoProps = (state) => ({
    // item: state.item,
    // list: state.list,
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStatetoProps, null)(IndexPage);