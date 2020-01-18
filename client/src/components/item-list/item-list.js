import React from 'react';

import PollListItem from '../poll-list-item';

const ItemList = ({ data = [] }) => {

    const itemList = data.map(({title, _id}) => <PollListItem key={_id} title={title} id={_id} />);

    return(
        <div className="poll-list">
            {itemList}
        </div>
    )
};

export default ItemList;