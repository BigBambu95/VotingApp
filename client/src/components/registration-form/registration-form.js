import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withPollService } from '../hoc';
import ModalWindow from '../modal-window';
import { userActions } from '../../actions';
import Button from '../button';
import TextField from '../text-field';

class RegistrationForm extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            modalMessage: '',
            modalIsShow: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
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
            .register(data)
            .then(data => {
                if(data.message) {
                    console.log(data.message);
                } else {
                    localStorage.setItem("token", data.jwt);
                    login(data.user.username);
                }
            })
            .catch(err => console.error(err));
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    toggleModal() {
        this.setState(state => {
            return { modalIsShow: !state.modalIsShow }
        });
    }


    render() {
        const { username, password, modalMessage, modalIsShow } = this.state;

        return(
            <div className="registration-form">
                <h2 className="text-center">Регистрация</h2>
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
                    <div className="form-group">
                        <Button variant="contained">Отправить</Button>
                    </div>
                </form>

                <ModalWindow isShow={modalIsShow} toggleModal={this.toggleModal}>{modalMessage}</ModalWindow>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        login: (name) => dispatch(userActions.login(name))
    }
}

export default compose(
    withPollService(),
    connect(null, mapDispatchToProps)
)(RegistrationForm);