import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import editIcon from "../../assets/Edit.png";

const rows = [
	{ name: "Frozen yoghurt", stock: 159,status:"In Stock", supplier: "Fr. CRCE"},
	{ name: "Frozen yoghurt", stock: 12,status:"In Stock", supplier: "Fr. CRCE"},
	{ name: "Frozen yoghurt", stock: 159,status:"In Stock", supplier: "Fr. CRCE"},
  { name: "Frozen yoghurt", stock: 159,status:"In Stock", supplier: "Fr. CRCE"},
];
const rows2 = [
	{ name: "Frozen yoghurt", qty: 159, supplier: "Fr. CRCE", total: 100 },
	{ name: "Frozen yoghurt", qty: 12, supplier: "Fr. CRCE", total: 100 },
	{ name: "Frozen yoghurt", qty: 159, supplier: "Fr. CRCE", total: 100 },
  { name: "Frozen yoghurt", qty: 159, supplier: "Fr. CRCE", total: 100 },
];

function Warehouse() {
  return (
    <>
			<div>
				<div className="container">
					<p className="admin-header">Warehouse Dashboard</p>
					<div className="card-container">
						 {/* here the searchbars will go  */}
					</div>
          <p className="admin-header">Warehouse Inventory</p>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }}  aria-label="simple table" >
							<TableHead >
								<TableRow >
									<TableCell className="table-header">Product Name</TableCell>
									<TableCell align="right" className="table-header">Stock</TableCell>
									<TableCell align="right" className="table-header">
										Status
									</TableCell>
									<TableCell align="right" className="table-header">
										Supplier
									</TableCell>
									<TableCell align="right" className="table-header">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
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
											{row.stock}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.status}
										</TableCell>
										<TableCell align="right" className="table-body">
											{row.supplier}
										</TableCell>
										<TableCell align="right" className="action-buttons">
                    <img src={editIcon} alt="" className="action-button"/>
										<button className="reorder-button">Reorder</button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
          <p className="admin-header">Incoming Shipments</p>
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
								{rows2.map((row) => (
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
					</TableContainer>
				</div>
			</div>
		</>
  )
}

export default Warehouse;