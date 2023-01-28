import axios from 'axios';

async function fetchData(setData) {
    axios
        .get("http://127.0.0.1:5001/getAllItems",)
        .then((response) => {
            console.log(response.data);
            setData(response.data)
        });
}

export {fetchData}