import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withPollService, withRequiredAuth } from '../../components/hoc';

import ItemList from '../../components/item-list';

import { polls } from '../../actions';
import { getUserPolls, getIsAuth } from '../../selectors';
import Loader from '../../components/loader';


class UserPollListContainer extends Component {

    componentDidMount() {
        if(!this.props.polls.length) {
            this.props.fetchPolls();
        }
    }


    render() {

        const { loading, error, polls } = this.props;

        if(loading) return <Loader />;

        if(error) return <p>Error!!!</p>;

        if(!polls.length) return <p>На данный момент вы не создали ни одного опроса</p>
  
        return <ItemList data={polls} />;
        
    }
}


const mapStateToProps = (state) => {
    return {
        polls: getUserPolls(state, state.user.username),
        isAuth: getIsAuth(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { pollsRequest, pollsLoaded, pollsError } = polls;
    const { pollService } = ownProps;

    return {
        fetchPolls: () => {
            dispatch(pollsRequest());
            pollService
                .getPolls()
                .then(data => dispatch(pollsLoaded(data)))
                .catch(err => dispatch(pollsError(err)));
        }
    }
} 


export default compose(
    withPollService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRequiredAuth()
)(UserPollListContainer);