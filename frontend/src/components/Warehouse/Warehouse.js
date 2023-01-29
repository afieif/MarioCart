import React, {useState, useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import editIcon from "../../assets/Edit.png";
import Button from '@mui/material/Button'
import { fetchStocks, updateStocks, getShipment } from "./warehouseService";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

// TODO Add search

function Warehouse() {
	const [rows,setRows] = useState([]);
	// const [reorder,setReorder] = useState([])
	
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
	
	const [open, setOpen] = useState(false);
	const [openSnack, setOpenSnack] = useState(false);
	const [edit,setEdit] = useState({});
	const [refresh,setRefresh] = useState(true);
	function handleOpen(obj){
		setEdit(obj);
		setOpen(true);
	}
	const handleClose = () => setOpen(false);
	const handleCloseSnack = () => setOpenSnack(false);
	useEffect(() => {
		fetchStocks(setRows);
	}, [refresh])
	
  return (
    <>
			<div>
				<div className="container">
					<p className="admin-header">Warehouse Dashboard</p>
					<div className="card-container">
						 {/* here the searchbars will go  */}
					</div>
          {/* <p className="admin-header">Warehouse Inventory</p> */}
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }}  aria-label="simple table" >
							<TableHead >
								<TableRow >
									<TableCell className="table-header">Product ID</TableCell>
									<TableCell align="right" className="table-header">Stock</TableCell>
									<TableCell align="right" className="table-header">
										Reorder Threshold
									</TableCell>
									<TableCell align="right" className="table-header">
										Supplier ID
									</TableCell>
									<TableCell align="right" className="table-header">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.product_id}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}
										>
										<TableCell component="th" scope="row" className="table-body">
											{row.product_id}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.stock}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.reorder}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.supplier_id}
										</TableCell>
										<TableCell align="right" className="action-buttons">
										<Button onClick={()=>handleOpen(row)}>
                    					<img src={editIcon} alt="" className="action-button"/>
										</Button>
										<button className="reorder-button" onClick={()=>getShipment({...row,"stock":row.stock+row.reorder_qty},refresh,setRefresh,setOpenSnack)}>Reorder</button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
          {/* <p className="admin-header">Incoming Shipments</p>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }}  aria-label="simple table" >
							<TableHead >
								<TableRow >
									<TableCell className="table-header">Product Name</TableCell>
									<TableCell align="right" className="table-header">Qty</TableCell>
									<TableCell align="right" className="table-header">
										Supplier
									</TableCell>
									<TableCell align="right" className="table-header">
										Total
									</TableCell>
									<TableCell align="right" className="table-header">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>	
								{reorder.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}
										
										>
										<TableCell component="th" scope="row" className="table-body">
											{row.name}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.qty}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.supplier}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.total}
										</TableCell>
										<TableCell align="right" className="action-buttons">
										<button className="recieve-button">Reorder</button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer> */}
				</div>
			</div>
			<Snackbar
        	open={openSnack}
        	autoHideDuration={1000}
        	onClose={handleCloseSnack}
        	message="Shipment Received"
      		/>
			<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-title">
		  Edit 
          </div>
		  <div className="flex-row">
			<div>
		    <TextField label="Reorder Threshold" value={edit.reorder} onChange={(e)=>setEdit({...edit,"reorder":e.target.value})}></TextField>
			</div>
			<div>
		    <TextField label="Reorder Quantity" value={edit.reorder_qty} onChange={(e)=>setEdit({...edit,"reorder_qty":e.target.value})}></TextField>
			</div>
		  </div>
		  <div className="flex-row">
		    <Button onClick={()=>updateStocks(edit,refresh,setRefresh,setOpen)} variant="contained">Update</Button>
		  </div>
        </Box>
      </Modal>
		</>
  )
}

export default Warehouse;