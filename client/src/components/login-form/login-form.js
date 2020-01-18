import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withPollService } from '../hoc';
import { userActions } from '../../actions';
import Button from '../button';
import TextField from '../text-field';

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { pollService, login } = this.props;
        const { username, password } = this.state;

        const data = {
            username,
            password
        }

        pollService
            .login(data)
            .then(data => {
                if(data.message) {
                    console.log(data.message);
                } else {
                    localStorage.setItem("token", data.jwt);
                    login(data.user.username);
                }
            })
            .then(() => this.props.history.push('/polls'))
            .catch(err => console.error(err));
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }


    render() {
        const { username, password } = this.state;

        return(
            <div className="login-form">
                <h2 className="text-center">Вход</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <TextField 
                            type="text" id="username" 
                            name="username" label="Имя" 
                            onChange={(e) => this.handleChange(e)} 
                            value={username} required tabIndex="0" 
                        />
                    </div>
                    <div className="form-group">
                        <TextField 
                            type="password" id="password" 
                            name="password" label="Пароль" 
                            onChange={(e) => this.handleChange(e)} 
                            value={password} tabIndex="0" required 
                        />
                    </div>
                    <div className="form-group flex justify-between align-center">
                        <Link to={'/registration'}>Создать аккаунт</Link>
                        <Button variant="contained">Отправить</Button>
                    </div>
                </form>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (name) => dispatch(userActions.login(name))
    }
}

export default compose(
    withPollService(),
    connect(null, mapDispatchToProps)
)(LoginForm);
