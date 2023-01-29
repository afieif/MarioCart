import axios from 'axios';

async function fetchData(setData) {
    axios.get("http://127.0.0.1:5001/getAllItems",)
    .then((response) => {
        console.log(response.data);
        setData(response.data)
    });
}

async function completeTransaction(data,clear){
    axios.post("http://127.0.0.1:5001/createInvoice",data)
    .then((response) => {
        console.log(response.data);
        if(response.data.code === "FAIL")
        {
            alert(JSON.stringify(response.data));
        }
        clear()
    });
}

async function getStock(data,setMax){
    axios.get("http://127.0.0.1:5001/getStock",{ params: data }).then((res)=>{
        return res.data.stock;
    })
}


export {fetchData,completeTransaction,getStock};