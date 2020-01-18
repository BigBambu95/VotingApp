import axios from 'axios';

export default class PollService {
    constructor() {
       this._apiUri = 'http://localhost:3000';
    }


    async getPolls() {
        try {
            const res = await axios.get(`${this._apiUri}/api/polls/`);
            return res.data.result;
        } catch(err) {
            console.error(err);
        }
    }

    async getPoll(id) {
        try {
            const res = await axios.get(`${this._apiUri}/api/polls/${id}`);
            return res.data.result;
        } catch (err) {
            console.error(err);
        }
    }

    
    async createPoll(data) {
        try {
            const res = await fetch(`${this._apiUri}/api/polls/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            return await res.json();
        } catch(err) {
            console.error(err);
        }
    }

    async vote(data, id) {
        try {
            const res = await fetch(`${this._apiUri}/api/polls/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            return await res.json();
        } catch(err) {
            console.error(err);
        }
    }

    async register(data) {
        try {
            const res = await fetch(`${this._apiUri}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            return await res.json();
        } catch(err) {
            console.error(err);
        }
    }

    async login(data) {
        try {
            const res = await fetch(`${this._apiUri}/api/users/login`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            return await res.json();
        } catch(err) {
            console.error(err);
        }
    }

    async getProfile(token) {
        try {
            const res = await fetch(`${this._apiUri}/api/users/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': token
                }
            });

            return await res.json();
        } catch(err) {
            console.error(err);
        }
    
    }

}