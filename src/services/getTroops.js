import axios from 'axios';

export default function() {
    return axios.get('http://localhost:3005/defenses').then(res => {
        console.log('res.data', res.data)
        return res.data;
    })
}