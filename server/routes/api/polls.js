const express = require('express');
const router = express.Router();


const Poll = require('../../models/poll');

router.get('/', (req, res) => {

    const data = {}

    Poll.find()
        .then(polls => {
            data.result = polls;
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            data.message = 'Ошибка при получении данных';
            res.json(data);
        });
});

router.get('/:id', (req, res) => {
    const data = {}

    Poll.findById(req.params.id)
        .then(poll => {
            data.result = poll;
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            data.message = 'Ошибка при получении данных';
            res.json(data);
        });
});

router.post('/', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const options = req.body.options;

    const data = {}

    Poll.findOne({ title })
        .then(poll => {
            if(poll) {
                data.message = 'Опрос с таким именем уже существует';
                return res.status(400).json(data);
            } else {
                const newPoll = new Poll({
                    title,
                    author,
                    options
                });

                newPoll
                    .save()
                    .then(result => {
                        data.result = result;
                        res.json(data);
                    })
                    .catch(err => {
                        console.error(err);
                        data.message = 'Не удалось создать опрос';
                        return res.json(data);
                    });
            }
        })
        .catch(err => {
            console.error(err);
            data.message = 'Не удалось создать опрос';
            return res.json(data);
        });
});


router.put('/:id', (req, res) => {
    const username = req.body.username;

    const data = {}

    Poll.findById(req.params.id)
        .then(poll => {
            const user = poll.users.find(item => item === username);
            if(user) {
                data.message = 'Вы уже голосовали в данном опросе';
                return res.status(400).json(data);
            } else {
                poll.users = poll.users.concat(username);
                poll.options = req.body.options;

                poll
                    .save()
                    .then(result => {
                        data.result = result;
                        res.json(data);
                    })
                    .catch(err => {
                        console.error(err);
                        data.message = 'Не удалось проголосовать';
                        return res.json(data);
                    });
            }
        })
        .catch(err => {
            console.error(err);
            data.message = 'Не удалось проголосовать';
            return res.json(data);
        });
});

module.exports = router;