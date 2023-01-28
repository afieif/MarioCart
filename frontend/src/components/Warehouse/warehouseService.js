import axios from 'axios';

async function fetchStocks(setData) {
    axios.get("http://127.0.0.1:5001/getAllStock",)
    .then((response) => {
        console.log(response.data);
        setData(response.data)
    });
}

async function updateStocks(data,refresh,setRefresh,setOpen) {
    console.log(data);
    axios.post("http://127.0.0.1:5001/updateStock",data)
    .then((response) => {
        console.log(response.data);
        setRefresh(!refresh);
        setOpen(false);
    });
}

async function getShipment(data,refresh,setRefresh,snack){
    setTimeout(()=>{
        axios.post("http://127.0.0.1:5001/updateStock",data)
    .then((response) => {
        console.log(response.data);
        setRefresh(!refresh);
        snack(true)
    });
    },1000)
    
}

export {fetchStocks,updateStocks,getShipment}