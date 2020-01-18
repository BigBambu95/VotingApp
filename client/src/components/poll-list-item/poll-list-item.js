import React from 'react';
import { Link } from 'react-router-dom';

const PollListItem = ({ title, id }) => {
    return(
        <div className="poll-list__item">
            <Link to={`/polls/${id}`}>{title}</Link>
        </div>
    )
};

export default PollListItem;