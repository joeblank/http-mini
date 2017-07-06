import axios from 'axios';

export default function(shortname, id) {

    return axios.delete(`http://localhost:3005/${shortname}/${id}`).then(res => {
        return res.data;
    })
}