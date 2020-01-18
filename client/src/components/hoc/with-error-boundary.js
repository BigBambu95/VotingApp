import React from 'react';
import ErrorBoundary from '../error-boundary';


const withErrorBoundary = () => Wrapped => {
    return (props) => {
        return(
            <ErrorBoundary>
                <Wrapped {...props} />
            </ErrorBoundary>
        )
    }
}

export default withErrorBoundary;