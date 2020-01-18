import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withPollService, withErrorBoundary } from '../../components/hoc';
import PollDetails from '../../components/poll-details';
import { pollActions, voteActions } from '../../actions';
import Loader from '../../components/loader';
import VoteForm from '../../components/vote-form';

class PollDetailsContainer extends Component {

    componentDidMount() {
        this.props.fetchPoll(this.props.match.params.id);
    }

    render() {

        const { poll: { data, loading, error }, user, vote, voteForm } = this.props;

        if(loading) return <Loader />;

        if(error) return <p>Что-то пошло не так</p>;

        return (
            <Fragment>
                <VoteForm user={user} poll={data} vote={vote} voteForm={voteForm} />
                <PollDetails poll={data} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        poll: state.poll,
        user: state.user,
        voteForm: state.voteReducer
    }
} 

const mapDispatchToProps = (dispatch, ownProps) => {
    const { pollRequest, pollLoaded, pollError } = pollActions;
    const { voteRequest, voteSuccess, voteError } = voteActions;
    const { pollService } = ownProps;

    return {
        fetchPoll: (id) => {
            dispatch(pollRequest());
            pollService
                .getPoll(id)
                .then(data => dispatch(pollLoaded(data)))
                .catch(err => dispatch(pollError(err)));
        },

        vote: (data, id) => {
            dispatch(voteRequest());
            pollService
                .vote(data, id)
                .then(data => {
                    if(data.message) {
                        return dispatch(voteError(data.message));
                    } else {
                        return dispatch(voteSuccess(data.result));
                    }
                })
                .catch(err => console.error(err));
        }
    }
}


export default compose(
    withErrorBoundary(),
    withPollService(),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(PollDetailsContainer);