import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/Edit.png";
import addIcon from "../../assets/plus.png";

const rows = [
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
	{ name: "Frozen yoghurt", mrp: 159, sid: 6.0, supplier: 24 },
];

function Sales() {
	return (
		<>
			<div>
				<div className="container">
					<p className="admin-header">Sales Dashboard</p>
					<p className="admin-header">Warehouse Inventory</p>

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
								{rows.map((row) => (
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
											{row.mrp}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.sid}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.supplier}
										</TableCell>
										<TableCell align="right">
											<img
												src={addIcon}
												alt=""
												className="action-button"
											/>
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
								{rows.map((row) => (
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
											{row.mrp}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.sid}
										</TableCell>
										<TableCell
											align="right"
											className="table-body">
											{row.supplier}
										</TableCell>
										<TableCell align="right">
											<img
												src={addIcon}
												alt=""
												className="action-button"
											/>
											<img
												src={deleteIcon}
												alt=""
												className="action-button"
											/>
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
		</>
	);
}

export default Sales;
