import axios from 'axios';

export default function patchMinions(shortname, id) {
    return axios.patch('http://localhost:3005/' + shortname + '/minions/' + id,
    {type: 'frog'})
    .then(res => {
        return res.status;
    })

}