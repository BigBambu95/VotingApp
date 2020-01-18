import React, { useState } from 'react';

import Button from '../button';
import Select from '../select';
import SelectItem from '../select-item';
import Loader from '../loader';



const VoteForm = ({ user, poll, vote, voteForm }) => {

    const [option, setOption] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newOptions = poll.options.map(item => {
            if(item.value === option) {
                return {
                    ...item,
                    votes: item.votes + 1
                }
            }

            return item;
        });

        const data = {
            title: poll.title,
            author: poll.author,
            username: user.username,
            options: newOptions
        }

        return vote(data, poll._id);
    }

    if(!user.isAuth) return <p>Авторизуйтесь чтобы проголосовать</p>;

    return(
        <div className="vote-form__wrapper">
            <h1>{poll.title}</h1>
            <form className="vote-form" onSubmit={handleSubmit}>
                <p>Я хочу проголосовать за:</p>
                <div className="form-group">
                    <Select setValue={setOption}>
                        {
                            poll.options.map((item, idx) => {
                                return(
                                    <SelectItem key={idx}>{item.value}</SelectItem>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className="form-group">
                    <Button variant="contained" loading={voteForm.loading}>Проголосовать</Button>
                </div>
            </form>
            <p className="error text-center">{voteForm.error}</p>
        </div>
    );
}



export default VoteForm;