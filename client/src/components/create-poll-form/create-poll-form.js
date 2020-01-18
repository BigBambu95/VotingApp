import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withPollService, withRequiredAuth, withErrorBoundary } from '../hoc';
import { polls } from '../../actions';
import { getUsername, getIsAuth } from '../../selectors';

import Button from '../button';
import TextField from '../text-field';
import Loader from '../loader';

class CreatePollForm extends Component {

        state = {
            question: '',
            options: [
                {
                    value: '',
                    votes: 0
                },
                {
                    value: '',
                    votes: 0
                }
            ]
        }



    handleSubmit = (e) => {
        e.preventDefault();
        const { question, options } = this.state;
        const { createPoll, username } = this.props;

        const data = {
            title: question,
            author: username,
            options
        }

        createPoll(data);
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    addOption = () => {
        const { options } = this.state;
        const newOptions = [
            ...options,
            { 
                value: '',
                votes: 0
            }
        ];

        this.setState({
            options: newOptions
        });
    }

    removeOption = () => {
        const { options } = this.state;
        const newOptions = options.filter((item, idx) => idx !== options.length - 1);
        
        this.setState({
            options: newOptions
        })
    }

    updateOption = (e, id) => {
        const { options } = this.state;
        const { value } = e.target;

        const newOptions = options.map((item, index) => {
            if(index !== id) {
                return item;
            }

            return {
                ...item,
                value
            }
        });

        this.setState({
            options: newOptions
        });
    }

    render() {
        const { question, options } = this.state;
        const { loading, error } = this.props;

        const addOptionBtn = options.length <= 5 && <Button type="button" variant="contained" onClick={this.addOption}><span className="plus"></span> Ответ</Button>;
        const closeIcon = options.length > 2 && <span className="close-icon" onClick={this.removeOption}></span>;

        return(
            <div className="create-poll-form">
                <h1 className="text-center">Создание опроса</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <TextField type="text" id="question" name="question" label="Вопрос" onChange={(e) => this.handleChange(e)} value={question} required />
                    </div>
                    <h3>Ответы</h3>
                    {
                        options.map((item, idx) => {
                            return(
                                <div className="form-group" key={idx}>
                                    <TextField type="text" label={`Вариант ответа ${idx + 1}`} onChange={(e) => this.updateOption(e, idx)} required />
                                    {closeIcon}
                                </div>
                            )
                        })
                    }
                    <div className="form-group flex justify-between align-center">
                        {addOptionBtn}
                        <Button type="submit" variant="contained" loading={loading}>Создать</Button>
                    </div>
                </form>
                <p className="error text-center">{error}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: getUsername(state),
        isAuth: getIsAuth(state),
        loading: state.createPollReducer.loading,
        error: state.createPollReducer.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { createPollRequest, createPollLoaded, createPollError } = polls;
    const { pollService, history } = ownProps;

    return {
        createPoll: (poll) => {
            dispatch(createPollRequest());
            pollService
                .createPoll(poll)
                .then(data => {
                    if(data.message) {
                        return dispatch(createPollError(data.message));
                    } else {
                        return dispatch(createPollLoaded(data.result));
                    }
                })
                //.then(() => history.push('/user-polls'))    
                .catch(err => console.log(err))
        }
    }
}

export default compose(
    withErrorBoundary(),
    withPollService(),
    connect(mapStateToProps, mapDispatchToProps),
)(CreatePollForm);