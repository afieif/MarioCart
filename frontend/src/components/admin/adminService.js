import axios from "axios";

async function fetchData(setData) {
  axios.get("http://127.0.0.1:5001/getAllItems").then((response) => {
    console.log(response.data);
    setData(response.data);
  });
}

async function fetchSupplier(setData) {
  axios.get("http://127.0.0.1:5001/getAllSuppliers").then((response) => {
    console.log(response.data);
    setData(response.data);
  });
}

async function createSupplier(data, refresh, setRefresh, setOpen) {
  axios.post("http://127.0.0.1:5001/createSupplier", data).then((response) => {
    console.log(response);
    setRefresh(!refresh);
    setOpen(false);
  });
}

async function deleteItem(item, refresh, setRefresh) {
  axios.post("http://127.0.0.1:5001/deleteItem", item).then((res) => {
    console.log(res);
    setRefresh(!refresh);
  });
}

async function updateItem(item, refresh, setRefresh) {
  axios.post("http://127.0.0.1:5001/updateItem", item).then((res) => {
    console.log(res);
    setRefresh(!refresh);
  });
}

async function createItem(item, refresh, setRefresh, closeModal) {
  axios.post("http://127.0.0.1:5001/createItem", item).then((res) => {
    console.log(res);
    setRefresh(!refresh);
    closeModal(!true);
  });
}

export {
  fetchData,
  fetchSupplier,
  deleteItem,
  updateItem,
  createItem,
  createSupplier,
};
