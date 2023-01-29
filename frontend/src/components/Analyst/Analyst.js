import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import React, { useState, useEffect } from "react";
import axios from "axios";

const data = [
  {
    product_id: "001",
    qty: 50,
    total_price: 100,
  },
  {
    product_id: "002",
    qty: 40,
    total_price: 300,
  },
  {
    product_id: "003",
    qty: 10,
    total_price: 200,
  },
];

const Analyst = () => {
  const [dataStore, setDataStore] = useState([]);
  useEffect(() => {
    async function fetchGraphData() {
      axios.get("http://localhost:5001/getGraphdeets").then((response) => {
        console.log(response);
        setDataStore(response);
      });
    }
    fetchGraphData();
  }, []);

  return (
    <>
      <p className="admin-header">Welcome To The Analyst Dashboard</p>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="qty" fill="#8884d8" />
        <Bar dataKey="total_price" fill="#82ca9d" />
      </BarChart>
    </>
  );
};

export default Analyst;
