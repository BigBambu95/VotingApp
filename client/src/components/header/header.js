import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getIsAuth } from '../../selectors';
import Button from '../button';

class Header extends Component {
    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
    }

    render() {
        const { isAuth } = this.props;

        const loginBtn = !isAuth ? <Link to={'/login'} className="btn contained">Войти</Link> : <Button href="/" variant="contained" onClick={this.logout}>Выйти</Button>;
        const myPolls = isAuth && <div><Link to={'/user-polls'} className="link">Мои опросы</Link></div>;
        const createPoll = isAuth && <div><Link to={'/create-poll'} className="link">Создать опрос</Link></div>;

        return(
            <header className="main-header">
                <div className="container flex justify-between">
                    <span className="main-title">Voting App</span>
                    <div className="main-header__right">
                        {createPoll}
                        {myPolls}
                        <div>
                            <Link to={'/polls'} className="link">Все опросы</Link>
                        </div>
                        <div>
                            {loginBtn}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state)
    }
}


export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(Header);