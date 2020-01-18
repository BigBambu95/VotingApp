import React from 'react';
import { PollServiceConsumer } from '../poll-service-context';


const withPollService = () => Wrapped => {
    return (props) => {
        return(
            <PollServiceConsumer>
                {pollService => {
                    return <Wrapped {...props} pollService={pollService} />;
                }}
            </PollServiceConsumer>
        )
    }
}

export default withPollService;