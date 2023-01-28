import {React, useState, useEffect} from "react";
import coin from "../../assets/coin.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/Edit.png";
import { fetchData, fetchSupplier, deleteItem, updateItem, createItem } from "./adminService";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
/* import { TablePagination } from '@mui/material'; */

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	borderRadius : '10px',
	boxShadow: 24,
	p: 4,
  };


function Admin() {
	/* 	const pages = [5,10,15]
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
	const TblPagination = () => (<TablePagination
		component="div"
		page={page}
		rowsPerPageOptions={pages}
		rowsPerPage={rowsPerPage}
		onPageChange
		/>) */
	const [refresh,setRefresh] = useState(true);
	const [suppliers,setSupplier] = useState([]);
	const [edit,setEdit] = useState({});
	const [open, setOpen] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	function handleOpen(obj){
		setEdit(obj);
		setOpen(true);
	}
	const handleClose = () => setOpen(false);
	const handleCloseCreate = () => setOpenCreate(false);
	const [rows,setRows] = useState([]);
	useEffect(() => {
		fetchData(setRows);
		fetchSupplier(setSupplier);
	}, [refresh])
	
	return (
		<>
			<div>
				<div className="container">
					<p className="admin-header">Welcome Back Admin</p>
					<div className="card-container">
						<div className="vellumptuous">
							<div className="card">
								<h1 className="card-header">Total Items</h1>
								<div className="flex">
									<img src={coin} alt="" />
									<p className="card-stats">{rows.length}</p>
								</div>
							</div>
						</div>
						<div className="card">
							<h1 className="card-header">Suppliers</h1>
							<div className="flex">
								<img src={coin} alt="" />
								<p className="card-stats">{suppliers.length}</p>
							</div>
						</div>
						<Button onClick={()=>setOpenCreate(true)}>
							<div className="card">
								<div className="flex-col">
								<div>
								<h1>Create Item</h1>
								</div>
								</div>
							</div>
						</Button>
					</div>
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
										Supplier ID
									</TableCell>
									<TableCell
										align="right"
										className="table-header">
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row._id}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">
											{row.price}
										</TableCell>
										<TableCell align="right">
											{row.product_id}
										</TableCell>
										<TableCell align="right">
											{row.supplier_id}
										</TableCell>
										<TableCell align="right">
											<Button onClick={()=>handleOpen(row)}>
												<img src={editIcon} alt="" className="action-button"/>
											</Button>
											<Button onClick={()=>deleteItem(row,refresh,setRefresh)}>
												<img src={deleteIcon} alt="" className="action-button"/>
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
			{/* 			<TablePagination
	component="div"
	page={page}
	rowsPerPageOptions={pages}
	rowsPerPage={rowsPerPage}
	/> */}
	<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-title">
            Edit Item
          </div>
		  <div className="flex-row">
			<div>
				<TextField id="outlined-basic" label="Item Name" variant="outlined" value={edit.name} fullWidth onChange={(e)=>setEdit({...edit,"name":e.target.value})}/>
			</div>
			<div>
				<TextField id="outlined-basic" label="Price" variant="outlined" value={edit.price} fullWidth onChange={(e)=>setEdit({...edit,"price":e.target.value})}/>
			</div>
		  	<div>
			  <Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={edit.supplier_id}
				label="Supplier"
				onChange={(e)=>setEdit({...edit,"supplier_id":e.target.value})}>
				{suppliers.map((s)=>{
					return (<MenuItem value={s.supplier_id}>{s.name}</MenuItem>);
				}
				)}
			   </Select>
			</div>
		  </div>
		  <div className="flex-row">
			<div>
				<Button onClick={()=>updateItem(edit,refresh,setRefresh)} variant="contained">Update</Button>
			</div>
		  </div>
        </Box>
      </Modal>
	  <Modal
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-title">
            Create Item
          </div>
		  <div className="flex-row">
			<div>
				<TextField id="outlined-basic" label="Item Name" variant="outlined" value={edit.name} fullWidth onChange={(e)=>setEdit({...edit,"name":e.target.value})}/>
			</div>
			<div>
				<TextField id="outlined-basic" label="Price" variant="outlined" value={edit.price} fullWidth onChange={(e)=>setEdit({...edit,"price":e.target.value})}/>
			</div>
		  </div>
		  <div className="flex-row">
		  	<div>
			  <Select
			    fullWidth
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={edit.supplier_id}
				label="Supplier"
				onChange={(e)=>setEdit({...edit,"supplier_id":e.target.value})}>
				{suppliers.map((s)=>{
					return (<MenuItem value={s.supplier_id}>{s.name}</MenuItem>);
				}
				)}
			   </Select>
			</div>
			<div>
			<TextField id="outlined-basic" label="Product Id" variant="outlined" value={edit.product_id} fullWidth onChange={(e)=>setEdit({...edit,"product_id":e.target.value})}/>
			</div>
		  </div>
		  <div className="flex-row">
			<div>
				<Button onClick={()=>createItem(edit,refresh,setRefresh,setOpenCreate)} variant="contained">Add</Button>
			</div>
		  </div>
        </Box>
      </Modal>
		</>
	);
}

export default Admin;
