import axios from 'axios';

async function assignRole(data,setData) {
    axios.post("http://127.0.0.1:5001/assignRole",data)
    .then((response) => {
        console.log(response);
        setData(response.data);
    });
}

export {assignRole};
