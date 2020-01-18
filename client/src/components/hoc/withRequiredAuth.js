import React from 'react';
import { Redirect } from 'react-router-dom';


const withRequiredAuth = () => Wrapped => {
    return (props) => {
        return(
            <React.Fragment>
                { props.isAuth ? <Wrapped {...props} /> : <Redirect to="/login" /> }
            </React.Fragment>
        )

    }
}

export default withRequiredAuth;