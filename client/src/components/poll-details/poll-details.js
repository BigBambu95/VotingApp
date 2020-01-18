import React from 'react';

import { Bar, BarChart, Legend, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


const PollDetails = ({ poll }) => {

    return(
        <div className="poll-details">
            <div className="poll-details__chart">
            <BarChart width={730} height={250} data={poll.options}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="value" />
                <YAxis dataKey="votes" />
                <Tooltip />
                <Legend />
                <Bar fill="#8884d8" dataKey="votes" />
            </BarChart>
            </div>
        </div>
    )
}

export default PollDetails;