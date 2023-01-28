import React, {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import deleteIcon from "../../assets/delete.png";
import addIcon from "../../assets/plus.png";
import { fetchData, completeTransaction } from "./salesService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'



function Sales() {
	const [rows,setRows] = useState([]);
	const [cart,setCart] = useState([]);
	const [searchedRows,setSearchedRows] = useState([]);

	function searchData(str){
		  setSearchedRows(rows.filter((data)=>{
		  return Object.values(data).join('').toLowerCase().includes(str.toLowerCase())}));
	  }

	function clearCart()
	{
		setCart([]);
	}

	function addToCart(item){
		for (let i of cart){
			if(i.product_id === item.product_id )
			{
				setCart(cart.map((c)=>{
					if(c.product_id === item.product_id)
					{
						return {...c,qty:c.qty+1};
					}
					return c;
				}));
				return;
			}
		}
		setCart(cart.concat({...item,qty:1}));
	}

	function addQuantity(item){
		setCart(cart.map((c)=>{
			if(c.product_id === item.product_id)
			{
				return {...c,qty:c.qty+1};
			}
			else
			{
				return c;
			}
		}))
	}

	function deleteFromCart(item){
		setCart(cart.filter((c)=>c.product_id!==item.product_id));
	}

	useEffect(() => {
		fetchData(setRows);
	}, [])
	
	return (
		<>
			<div>
				<div className="container">
					<p className="admin-header">Sales Dashboard</p>
					<TextField onChange={(e)=>searchData(e.target.value)}></TextField>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Product Name</TableCell>
									<TableCell align="right">MRP</TableCell>
									<TableCell align="right">
										Product ID
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Supplier
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{searchedRows.slice(0,3).map((row) => (
									<TableRow
										key={row.name}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.price}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.product_id}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.supplier_id}
										</TableCell>
										<TableCell align="right">
										<Button onClick={()=>addToCart(row)}>
											<img
												src={addIcon}
												alt=""
												className="action-button"
											/>
										</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<p className="admin-header">Current Order</p>

					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Product Name</TableCell>
									<TableCell align="right">MRP</TableCell>
									<TableCell align="right">
										Product ID
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Quantity
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cart.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.price}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.product_id}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.qty}
										</TableCell>
										<TableCell align="right">
											<Button onClick={()=>addQuantity(row)}>	
												<img
													src={addIcon}
													alt=""
													className="action-button"
												/>
											</Button>
											<Button onClick={()=>deleteFromCart(row)}>
											<img
												src={deleteIcon}
												alt=""
												className="action-button"
											/>
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<div className="flex">
					<h3>Total</h3>
					<p>
					{cart.reduce((accumulator, currentValue) => 
					accumulator + (currentValue.qty*currentValue.price),0)}</p>
				</div>
				<div className="flex margin-top-bottom">
				{/* TODO add invoice id generator */}
				<button className="logout-button" onClick={()=>completeTransaction(
					{"total_price":cart.reduce((accumulator, currentValue) => accumulator + (currentValue.qty*currentValue.price),0),
					"invoice_id":Math.random(),
					"date":Date()},clearCart)}>Complete Transaction</button>
				</div>
			</div>
		</>
	);
}

export default Sales;
